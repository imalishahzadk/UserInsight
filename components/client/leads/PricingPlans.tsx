"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/client/agent-service";
import PageSpinner from "@/components/shared/PageSpinner";

interface Props {
  agentId: string;
}

export default function LeadPopupPage({ agentId }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: leadSettings,
    isFetching,
    error: queryError,
  } = useQuery({
    queryKey: ["lead-settings", agentId],
    queryFn: async () => {
      const response = await agentService.getLeadsSetting(agentId);
      return response; // already returns `data.data`
    },
    refetchOnWindowFocus: false,
    enabled: !!agentId,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    window.parent.postMessage(
      {
        type: "lead_submitted",
        payload: { ...form, agentId },
      },
      "*"
    );

    localStorage.setItem("leadSubmitted", "true");
    setSubmitted(true);
  };

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isFetching) return <PageSpinner />;
  if (!leadSettings?.data.leadEnabled || queryError) return <></>;

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: isMobile ? "100%" : 400,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {submitted
            ? "Thank You!"
            : leadSettings?.data?.title || "Get in Touch"}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {!submitted && leadSettings?.data?.subtitle}
        </Typography>

        {!submitted && (
          <form onSubmit={handleSubmit}>
            {leadSettings?.data?.fields?.name && (
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
                required
              />
            )}
            {leadSettings?.data?.fields?.email && (
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                required
                type="email"
              />
            )}
            {leadSettings?.data?.fields?.phone && (
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                margin="normal"
                required
              />
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        )}

        {submitted && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            We’ve received your info and will get back to you soon.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
