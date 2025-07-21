"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { replaceUrlVariables } from "../../../../../utils";
import {
  ALL_CLIENTS_ROUTE,
  UPDATE_CLIENTS_ROUTE,
} from "../../../../../core/routes";
import Swal from "sweetalert2";
import clientService from "@/services/api/user/client-service";
import { useRouter } from "next/navigation";

interface ClientHeaderProps {
  clientDetails: any;
  stats: {
    totalBots: number;
    activeBots: number;
    lastLogin: string;
  };
}

export default function ClientHeader({
  clientDetails,
  stats,
}: ClientHeaderProps) {
  const router = useRouter();

  const handleDeleteClient = () => {
    if (!clientDetails && !clientDetails._id) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00e5ff",
      cancelButtonColor: "#f8021c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await clientService.deleteClient(clientDetails._id);

        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
          });
          router.push(ALL_CLIENTS_ROUTE);
        } else {
          Swal.fire({
            title: "Error!",
            text: res.message,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "rgba(30, 30, 50, 0.4)",
        borderRadius: "16px",
        border: "1px solid rgba(115, 103, 240, 0.2)",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 15px 40px, rgba(115, 103, 240, 0.2) 0px 0px 20px",
        p: 3,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 0 },
        }}
      >
        {/* Left Section: Client Info */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <img
              src={clientDetails.photoUrl}
              alt="photo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 500 }}>
              {clientDetails?.company?.name || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Right Section: Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: { xs: "center", md: "flex-end" },
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Typography
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: "8px",
              fontSize: 14,
              bgcolor: clientDetails.isActive
                ? "rgba(0, 255, 17, 0.1)"
                : "rgba(248, 2, 28, 0.1)",
              color: clientDetails.isActive ? "#00ff66" : "#f8021c",
            }}
          >
            {clientDetails.isActive ? "Active" : "Disabled"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            <Link
              href={replaceUrlVariables(UPDATE_CLIENTS_ROUTE, {
                id: clientDetails?._id,
              })}
            >
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#7367f0",
                  color: "#7367f0",
                  minWidth: "120px",
                  "&:hover": {
                    borderColor: "rgba(115, 103, 240, 0.03)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "rgba(115, 103, 240, 0.3)",
                    color: "rgba(115, 103, 240, 0.3)",
                  },
                }}
              >
                Edit Client
              </Button>
            </Link>

            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClient}
              sx={{
                textTransform: "none",
                borderColor: "#f06767",
                color: "#f06767",
                minWidth: "120px",
                "&:hover": {
                  borderColor: "rgba(240, 103, 103, 0.03)",
                },
                "&.Mui-disabled": {
                  borderColor: "rgba(240, 103, 103, 0.3)",
                  color: "rgba(240, 103, 103, 0.3)",
                },
              }}
            >
              Delete Client
            </Button>

            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderColor: "#7367f0",
                color: "#7367f0",
                minWidth: "120px",
                "&:hover": {
                  borderColor: "rgba(115, 103, 240, 0.03)",
                },
                "&.Mui-disabled": {
                  borderColor: "rgba(115, 103, 240, 0.3)",
                  color: "rgba(115, 103, 240, 0.3)",
                },
              }}
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(115, 103, 240, 0.2)",
            borderRadius: "12px",
            p: 2,
          }}
        >
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 0.5 }}
          >
            Total Bots
          </Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {stats.totalBots}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "rgba(115, 103, 240, 0.2)",
            borderRadius: "12px",
            p: 2,
          }}
        >
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 0.5 }}
          >
            Active Bots
          </Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {stats.activeBots}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "rgba(115, 103, 240, 0.2)",
            borderRadius: "12px",
            p: 2,
          }}
        >
          <Typography
            sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 0.5 }}
          >
            Last Login
          </Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {stats.lastLogin}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
