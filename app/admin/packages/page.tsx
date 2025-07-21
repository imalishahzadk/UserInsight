"use client";

import { useEffect, useState } from "react";
import { Box, Snackbar, Alert, CircularProgress, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DataTable, { Column } from "@/components/shared/table/DataTable";
import PackageDetailsModal from "@/components/shared/packages/PackageDetailsModal";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import AddIcon from "@mui/icons-material/Add";
import { A_CREATE_PACKAGE_ROUTE } from "@/core/routes";
import packageService from "@/services/api/admin/package-services";
interface Package {
  _id: string;
  id: string;
  name: string;
  price: number;
  duration: string;
  subscriptions: number;
  offers?: string[];
}

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
    id: "name",
    label: "Package name",
    minWidth: 200,
    format: (value) => (
      <span style={{ color: "#fff", fontWeight: 500 }}>{value}</span>
    ),
  },
  {
    id: "price",
    label: "Price",
    minWidth: 150,
    format: (value) => (
      <span style={{ color: "rgba(255,255,255,0.8)" }}>
        ${value.toFixed(2)}
      </span>
    ),
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 150,
    format: (value) => (
      <span style={{ color: "rgba(255,255,255,0.8)" }}>{value}</span>
    ),
  },
];

const tableActions = [
  {
    label: "View",
    icon: VisibilityOutlinedIcon,
    type: "button",
    buttonStyle: {
      minWidth: 0,
      bgcolor: "transparent",
      color: "#7367f0",
      p: 1,
      "&:hover": {
        bgcolor: "rgba(0, 229, 255, 0.1)",
      },
    },
  },
  {
    label: "Edit",
    icon: EditIcon,
    type: "button",
    buttonStyle: {
      minWidth: 0,
      bgcolor: "transparent",
      color: "#7367f0",
      p: 1,
      "&:hover": {
        bgcolor: "rgba(0, 229, 255, 0.1)",
      },
    },
  },
  {
    label: "Delete",
    icon: DeleteOutlineIcon,
    type: "button",
    buttonStyle: {
      minWidth: 0,
      bgcolor: "transparent",
      color: "#FF4D4F",
      p: 1,
      "&:hover": {
        bgcolor: "rgba(255, 77, 79, 0.1)",
      },
    },
  },
];

export default function PackagesPage() {
  const router = useRouter();

  const { permissions } = useSelector((state: IRootState) => state.auth.user);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setIsSnackbarOpen(false);
  };

  const handleViewDetails = (row: Package) => {
    setSelectedPackage(row);
    setDetailsModalOpen(true);
  };

  const handleEdit = (pkg: Package) => {
    router.push(`/admin/packages/edit/${pkg._id}`);
  };

  const handleDelete = async (pkg: Package) => {
    setLoading(true);
    try {
      const response = await packageService.deletePackage(pkg._id);

      if (response.success) {
        setMessage(response.message);
        setSeverity("success");
        getpackages(); // Refresh the list
      } else {
        setMessage(response.message || "Failed to delete package");
        setSeverity("error");
      }
    } catch (error) {
      setMessage("Failed to delete package");
      setSeverity("error");
    }
  };

  const handleActionClick = (action: string, pkg: Package) => {
    if (action === "View") {
      handleViewDetails(pkg);
    } else if (action === "Edit") {
      handleEdit(pkg);
    } else if (action === "Delete") {
      handleDelete(pkg);
    }
  };

  const getpackages = async () => {
    setLoading(true);
    const response = await packageService.getPackages();
    setLoading(false);

    if (response.success) {
      setPackages(response.allPackages);
    } else {
      setIsSnackbarOpen(true);
      setMessage(response.message || "Something went wrong");
      setSeverity("error");
    }
  };
  useEffect(() => {
    getpackages();
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#0A0F1E",
        minHeight: "100vh",
      }}
    >
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
              bgcolor: "#7367f0",
              borderRadius: 1,
            },
          }}
        >
          Packages
        </Box>
      </Box>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => router.push(A_CREATE_PACKAGE_ROUTE)}
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={packages.length >= 4}
          sx={{
            borderColor: packages.length >= 4 ? "#7367f0" : "#7367f0",
            color: packages.length >= 4 ? "#7367f0" : "#7367f0",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            py: 1,
            "&.Mui-disabled": {
              borderColor: "#c4c4c4",
              color: "#c4c4c4",
            },
            "&:hover": {
              borderColor:
                packages.length >= 4
                  ? "rgba(115, 103, 240, 0.3)"
                  : "rgba(115, 103, 240, 0.03)",
            },
          }}
        >
          {packages.length >= 4 ? "(Max Limit Reached)" : "Create Package"}
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: "#1e1e3266",
          borderRadius: "16px",
          border: "none",
          transition: "all 0.2s ease-in-out",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 10px 30px rgba(132, 0, 255, 0.1)",
          },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress sx={{ color: "#7367f0" }} />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={packages || []}
            actions={tableActions.map((action) => ({
              ...action,
              onClick: (row: Package) => handleActionClick(action.label, row),
            }))}
          />
        )}
      </Box>

      {selectedPackage && (
        <PackageDetailsModal
          open={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          packageDetails={selectedPackage}
        />
      )}

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: "100%",
            bgcolor: "#0a0f1e",
            color: "#fff",
            "& .MuiAlert-icon": {
              color: severity === "error" ? "#ff4d4f" : "#7367f0",
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
