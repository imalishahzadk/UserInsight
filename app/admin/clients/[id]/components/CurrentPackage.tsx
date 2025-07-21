"use client";
import { Box, Typography, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { format, parseISO } from "date-fns";

interface PackageOffer {
  _id: string;
  name: string;
  price: number;
  duration: string;
  offers: string[];
  totalSubscriptions: string[];
  __v: number;
}

interface PlanData {
  _id: string;
  clientId: string;
  packageId: PackageOffer;
  endDate: string;
  isActive: boolean;
  price: number;
  packageName: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CurrentPackageProps {
  planData: PlanData | null;
}

export default function CurrentPackage({ planData }: CurrentPackageProps) {
  if (!planData) {
    return (
      <Box
        sx={{
          bgcolor: "#0a0f1e",
          borderRadius: "16px",
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <StarIcon sx={{ color: "#7367f0", fontSize: 48, mb: 2 }} />
        <Typography
          sx={{ fontSize: 20, fontWeight: 600, color: "#fff", mb: 1 }}
        >
          No Active Package
        </Typography>
        <Typography sx={{ color: "#fff", opacity: 0.7, mb: 3 }}>
          This client doesn't have any active package at the moment
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#7367f0",
            color: "#0a0f1e",
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#7267f0bace",
            },
          }}
        >
          Assign Package
        </Button>
      </Box>
    );
  }

  const startDate = format(parseISO(planData.startDate), "dd, MMM, yyyy");
  const endDate = format(parseISO(planData.endDate), "dd, MMM, yyyy");
  const remainingDays = Math.ceil(
    (new Date(planData.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Box
      sx={{
        bgcolor: "rgba(30, 30, 50, 0.4)",
        borderRadius: "16px",
        border: "1px solid rgba(115, 103, 240, 0.2)",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 15px 40px, rgba(115, 103, 240, 0.2) 0px 0px 20px",
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Package Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
          Current package
        </Typography>
        <StarIcon sx={{ color: "#ce9ffc" }} />
      </Box>

      {/* Package Details */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          mb: 3,
        }}
      >
        <Box>
          <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 1 }}>
            Package
          </Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {planData.packageName}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 1 }}>
            Active date
          </Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {startDate}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 1 }}>
            Remaining days
          </Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {remainingDays} days
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 14, mb: 1 }}>
            Expire date
          </Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {endDate}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 3 }} />

      {/* Package Offers */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 600, color: "#fff", mb: 2 }}
        >
          Package Offers
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {planData.packageId.offers.map((offer, index) => (
            <Typography
              key={index}
              sx={{ color: "#fff", opacity: 0.7, fontSize: 14 }}
            >
              • {offer}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#f06767",
            color: "#f06767",

            "&:hover": {
              borderColor: "rgba(240, 103, 103, 0.03)",
            },
            "&.Mui-disabled": {
              borderColor: "rgba(240, 103, 103, 0.3)",
              color: "rgba(240, 103, 103, 0.3)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#7367f0",
            color: "#7367f0",

            "&:hover": {
              borderColor: "rgba(115, 103, 240, 0.03)",
            },
            "&.Mui-disabled": {
              borderColor: "rgba(115, 103, 240, 0.3)",
              color: "rgba(115, 103, 240, 0.3)",
            },
          }}
        >
          Upgrade
        </Button>
      </Box>
    </Box>
  );
}
