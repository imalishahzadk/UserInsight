import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PackageDetails {
  name: string;
  price: number;
  duration: string;
  offers?: string[];
  subscriptions: number;
}

interface PackageDetailsModalProps {
  open: boolean;
  onClose: () => void;
  packageDetails: PackageDetails;
}

export default function PackageDetailsModal({
  open,
  onClose,
  packageDetails,
}: PackageDetailsModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 2,
          bgcolor: "#0a0f1e",
          border: "1px solid #7367f033",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          color: "#fff",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 24,
            width: 40,
            height: 2,
            bgcolor: "#7367f0",
            borderRadius: 1,
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Package Details
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.875rem",
                }}
              >
                Package name
              </Typography>
              <Typography fontWeight={500} sx={{ color: "#fff" }}>
                {packageDetails.name}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.875rem",
                }}
              >
                Price
              </Typography>
              <Typography fontWeight={500} sx={{ color: "#7367f0" }}>
                ${packageDetails.price.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box>
            <Typography
              sx={{
                mb: 1,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.875rem",
              }}
            >
              Duration
            </Typography>
            <Typography fontWeight={500} sx={{ color: "#fff" }}>
              {packageDetails.duration}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box>
            <Typography
              sx={{
                mb: 1,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.875rem",
              }}
            >
              Subscribers
            </Typography>
            <Typography fontWeight={500} sx={{ color: "#fff" }}>
              {packageDetails.subscriptions}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{ mb: 2, color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
          >
            Package features
          </Typography>
          {packageDetails.offers ? (
            packageDetails.offers.map((offer, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "#7367f0",
                    mr: 2,
                  }}
                />
                <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                  {offer}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
              No features listed
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
              bgcolor: "#7367f033",
              color: "#7367f0",
              px: 3,
              py: 1,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#7367f033",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
