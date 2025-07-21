"use client";
import { Box, Typography, Button, Avatar, Chip } from "@mui/material";
import { format, parseISO } from "date-fns";

interface IHeaderProps {
  imageUrl: string | undefined;
  name: string;
  role: string;
  createdAt: string;
  handlePreviewTypeChange: (state: "full" | "mini" | "button") => void;
}

export default function Header({
  imageUrl,
  name,
  role,
  createdAt,
  handlePreviewTypeChange,
}: IHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-between",
        gap: 3,
        mb: 4,
      }}
    >
      <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
        <Avatar
          src={imageUrl}
          sx={{
            width: 64,
            height: 64,
            bgcolor: "#ffffff",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
        />
        <Box>
          <Typography
            sx={{ fontSize: 20, fontWeight: 600, mb: 0.5, color: "#000" }}
          >
            {name}
          </Typography>
          <Typography
            sx={{ color: "#000000", opacity: 0.7, fontSize: "0.875rem" }}
          >
            {role}
          </Typography>
        </Box>
      </Box>

      {/* Stats Boxes */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            p: 2,
            color: "#000000",
            borderRadius: "12px",
            minWidth: "120px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              opacity: 0.7,
              fontSize: "0.75rem",
              mb: 0.5,
            }}
          >
            Active since
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {createdAt ? format(parseISO(createdAt), "dd/MM/yyyy") : "-"}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            color: "#000",
            p: 2,
            borderRadius: "12px",
            minWidth: "120px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            sx={{ color: "#000", opacity: 0.7, fontSize: "0.75rem", mb: 0.5 }}
          >
            Subscription
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>Premium</Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            color: "#000",
            p: 2,
            borderRadius: "12px",
            minWidth: "120px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            sx={{ color: "#000", opacity: 0.7, fontSize: "0.75rem", mb: 0.5 }}
          >
            Status
          </Typography>
          <Chip
            label="Active"
            size="small"
            sx={{
              bgcolor: "rgba(0, 255, 47, 0.1)",
              color: "#029a26",
              height: "24px",
              fontWeight: 500,
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={() => handlePreviewTypeChange("full")}
          sx={{
            bgcolor: "#000000",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            "&:hover": {
              bgcolor: "rgba(108, 108, 108, 0.8)",
            },
          }}
        >
          Preview Bot
        </Button>
      </Box>
    </Box>
  );
}
