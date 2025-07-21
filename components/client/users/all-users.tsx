"use client";

import {
  Box,
  TextField,
  Button,
  Switch,
  Avatar,
  debounce,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "@/components/shared/table/DataTable";
import type { Column } from "@/components/shared/table/DataTable";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/api/client/user-service";
import { IClient } from "@/core/types/client";
import PageSpinner from "@/components/shared/PageSpinner";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import { handleConfirm, replaceUrlVariables } from "@/utils";
import { C_ADD_USER_ROUTE, C_UPDATE_USER_ROUTE } from "@/core/routes";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";

// interface Action {
//   label: string;
//   icon: any;
//   type: "button";
//   buttonStyle: {
//     [key: string]: any;
//   };
// }

// const tableActions: Action[] = [
//   {
//     label: "Edit",
//     icon: EditIcon,
//     type: "button",
//     buttonStyle: {
//       minWidth: 0,
//       bgcolor: "transparent",
//       color: "#00e5ff",
//       p: 1,
//       "&:hover": {
//         bgcolor: "rgba(0, 229, 255, 0.1)",
//       },
//     },
//   },
//   {
//     label: "Delete",
//     icon: DeleteIcon,
//     type: "button",
//     buttonStyle: {
//       minWidth: 0,
//       bgcolor: "transparent",
//       color: "#ff4d4f",
//       p: 1,
//       "&:hover": {
//         bgcolor: "rgba(255, 77, 79, 0.1)",
//       },
//     },
//   },
// ];

const getAllUsers = async () => {
  const res = await userService.getAllUsers();
  if (res.success) {
    return res.data;
  }

  return [];
};

interface UsersTableProps {
  searchQuery: string;
}

const UsersTable = ({ searchQuery }: UsersTableProps) => {
  const [users, setAllUsers] = useState<IClient[]>([]);

  const { permissions } = useSelector((state: IRootState) => state.auth.user);

  const canEdit = !!permissions?.users?.edit;
  const canDelete = !!permissions?.users?.delete;

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });

  //   const handleActionClick = (action: string, user: IClient) => {
  //     if (action === "Edit") {
  //       console.log("Edit user:", user._id);
  //     } else if (action === "Delete") {
  //       console.log("Delete user:", user._id);
  //     }
  //   };

  const handleSearch = useCallback(
    (query: string) => {
      if (!data) return;
      const filteredUsers = data.filter(
        (user: IClient) =>
          user.name.trim().toLowerCase().includes(query.trim().toLowerCase()) ||
          user.email
            .trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase()) ||
          user.company?.name
            ?.trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase()) ||
          user.phoneNumber?.trim().includes(query.trim())
      );
      setAllUsers(filteredUsers);
    },
    [data]
  );

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  const handleDelete = async (userId: string) => {
    if (!canDelete) return { success: false, message: "Not allowed!" };

    const res = await userService.deleteUser(userId);
    if (res.success) {
      refetch();
    }
    return res;
  };

  const columns: Column[] = [
    {
      id: "number",
      label: "#",
      minWidth: 50,
      format: (_, __, index) => (
        <span style={{ color: "rgba(255,255,255,0.8)" }}>{index + 1}</span>
      ),
    },
    {
      id: "user",
      label: "User name",
      minWidth: 250,
      format: (value, row: IClient) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={row.photoUrl}
            alt={row.name[0]}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "rgba(0, 229, 255, 0.2)",
              color: "#00e5ff",
            }}
          />
          <Box>
            <div
              style={{ fontWeight: 500, fontSize: "0.95rem", color: "#fff" }}
            >
              {row.name}
            </div>
            <div
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
            >
              {row.email}
            </div>
          </Box>
        </Box>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      minWidth: 150,
      format: (value, row: IClient) => (
        <span style={{ color: "rgba(255,255,255,0.8)" }}>
          {row.phoneNumber || "N/A"}
        </span>
      ),
    },
    {
      id: "company",
      label: "Company",
      minWidth: 150,
      format: (value, row: IClient) => (
        <span style={{ color: "rgba(255,255,255,0.8)" }}>
          {row.company?.name || "N/A"}
        </span>
      ),
    },
    {
      id: "isActive",
      label: "Status",
      minWidth: 100,
      align: "center",
      format: (value, row: IClient) => {
        const onStatusChange = debounce(
          async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!canEdit) return;

            await userService.toggleStatus(row._id, e.target.checked);
          },
          1000
        );

        return (
          <Switch
            defaultChecked={value}
            onChange={onStatusChange}
            disabled={!canEdit}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#00e5ff",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "rgba(0, 229, 255, 0.6)",
              },
            }}
          />
        );
      },
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
      align: "center",
      format: (value, row: IClient) => {
        return (
          <div className="flex justify-center items-center gap-2">
            {canEdit && (
              <Link
                href={replaceUrlVariables(C_UPDATE_USER_ROUTE, {
                  userId: row._id,
                })}
              >
                <MdEdit className="font-bold text-xl text-[#00e5ff]" />
              </Link>
            )}
            {canDelete && (
              <button
                onClick={() => handleConfirm(() => handleDelete(row._id))}
                className="cursor-pointer"
              >
                <MdDelete className="font-bold text-xl text-red-600" />
              </button>
            )}

            {!canEdit && !canDelete && (
              <span style={{ color: "rgba(255,255,255,0.6)" }}>No actions</span>
            )}
          </div>
        );
      },
    },
  ];

  if (isFetching) {
    return <PageSpinner />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <Box
      sx={{
        bgcolor: "#0a0f1e",
        borderRadius: "16px",
        border: "1px solid rgba(0, 229, 255, 0.2)",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        "&:hover": {
          borderColor: "rgba(0, 229, 255, 0.4)",
          boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
        },
      }}
    >
      <DataTable
        columns={columns}
        rows={users}
        // actions={tableActions.map((action) => ({
        //   ...action,
        //   onClick: (row: IClient) => handleActionClick(action.label, row),
        // }))}
      />
    </Box>
  );
};

export default function AllUsers() {
  const { permissions } = useSelector((state: IRootState) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#070b15", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#fff",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 40,
              height: 2,
              bgcolor: "#00e5ff",
              borderRadius: 1,
            },
          }}
        >
          Users
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            placeholder="Search users..."
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: 200, sm: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#0a0f1e",
                color: "#fff",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                },
                "&.Mui-focused": {
                  borderColor: "#00e5ff",
                  boxShadow: "0 0 0 2px rgba(0, 229, 255, 0.2)",
                },
                "& fieldset": { border: "none" },
              },
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "rgba(255,255,255,0.6)", mr: 1 }} />
              ),
            }}
          />
          {permissions?.users?.add && (
            <Button
              variant="contained"
              LinkComponent={Link}
              href={C_ADD_USER_ROUTE}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: 600,
                bgcolor: "#00e5ff",
                "&:hover": {
                  bgcolor: "rgba(0, 229, 255, 0.8)",
                },
              }}
            >
              Add User
            </Button>
          )}
        </Box>
      </Box>
      <UsersTable searchQuery={searchQuery} />
    </Box>
  );
}
