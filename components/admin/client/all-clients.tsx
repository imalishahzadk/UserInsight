"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClientsDataTable from "./client-data-table";
import Link from "next/link";
import { ADD_CLIENTS_ROUTE } from "@/core/routes";
import PageSpinner from "@/components/shared/PageSpinner";
import clientService from "@/services/api/user/client-service";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { IUserPermissions } from "@/core/types/user";

const ClientsPage = () => {
  const { permissions } = useSelector(
    (state: IRootState) => state.auth.user
  ) as { permissions: IUserPermissions };

  const canAdd = !!permissions?.clients?.add;

  const { data, isFetching, error } = useQuery({
    queryKey: ["all-clients"],
    queryFn: () => clientService.getAllClients(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <PageSpinner />;
  if (error || !data?.data) return <></>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0A0F1E",
        p: { xs: 2, sm: 4 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          mb: 4,
          borderRadius: 2,
          p: 2,
          background: "#1e1e3266",
          overflow: "hidden",
          border: "1px solid #7367f033",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #7367f0, #ce9ffc)",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#ffffff",
            mb: 2,
          }}
        >
          Client Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search by client name, ID, or email..."
            fullWidth
            size="medium"
            sx={{
              flex: 1,
              "& .MuiInputBase-root": {
                height: "48px",

                borderRadius: "12px",
                border: "1px solid #7367f033",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  borderColor: "#7367f033",
                },
                "&:focus-within": {
                  borderColor: "#7367f033",
                  boxShadow:
                    "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
                },
              },
              "& fieldset": { border: "none" },
              "& input": {
                color: "#fff",
                "&::placeholder": {
                  color: "rgba(196, 196, 196, 0.664)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Add Client Button */}
        </Box>
      </Box>

      {/* Data Table */}
      <Box
        sx={{
          bgcolor: "none",
          borderRadius: "16px",
          p: 3,
          "& .MuiPaper-root": {
            bgcolor: "transparent",
            backgroundImage: "none",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #7367f033",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
            "& .MuiTableHead-root": {
              "& .MuiTableCell-root": {
                bgcolor: "#1e1e3266",

                color: "rgba(255, 255, 255, 0.7)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                fontWeight: 600,
              },
            },
            "& .MuiTableBody-root": {
              "& .MuiTableCell-root": {
                color: "#fff",
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
              "& .MuiTableRow-root:hover": {
                bgcolor: "rgba(149, 0, 255, 0.05)",
                cursor: "pointer",
                transition: "all 0.2s",
              },
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
              "& .MuiTablePagination-select": {
                color: "#fff",
              },
              "& .MuiTablePagination-selectIcon": {
                color: "#ce9ffc",
              },
              "& .MuiTablePagination-actions button": {
                color: "#ce9ffc",
                "&:disabled": {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              },
            },
          },
        }}
      >
        <ClientsDataTable data={data.data} />
      </Box>
    </Box>
  );
};

export default ClientsPage;
