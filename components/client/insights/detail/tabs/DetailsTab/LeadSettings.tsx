"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import agentService from "@/services/api/client/agent-service";
import PageSpinner from "@/components/shared/PageSpinner"; // Make sure this path is correct

interface LeadSettingsProps {
  agentId: string;
}

export default function LeadSettings({ agentId }: LeadSettingsProps) {
  const {
    data,
    isFetching,
    error: queryError,
  } = useQuery({
    queryKey: ["lead-settings", agentId],
    queryFn: async () => {
      const response = await agentService.getLeadsSetting(agentId);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  const [leadEnabled, setLeadEnabled] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [fields, setFields] = useState({
    name: true,
    email: true,
    phone: true,
  });

  // Populate state when data is loaded
  useEffect(() => {
    if (data?.data) {
      const d = data.data;
      setLeadEnabled(d.leadEnabled ?? true);
      setTitle(d.title ?? "");
      setSubtitle(d.subtitle ?? "");
      setFields({
        name: d.fields?.name ?? true,
        email: d.fields?.email ?? true,
        phone: d.fields?.phone ?? true,
      });
    }
  }, [data]);

  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: async () => {
      const payload = {
        agentId,
        leadEnabled,
        title,
        subtitle,
        fields,
      };
      return await agentService.updateLeadsSetting(payload);
    },
    onSuccess: () => {
      alert("Lead settings updated successfully");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  if (isFetching) return <PageSpinner />;
  if (!data || queryError) return <></>;

  return (
    <Box sx={{ p: 3, color: "#fff" }}>
      <FormControlLabel
        control={
          <Switch
            checked={leadEnabled}
            onChange={(e) => setLeadEnabled(e.target.checked)}
          />
        }
        label="Enable Leads"
        sx={{ mb: 3 }}
      />

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 3, input: { color: "#fff" }, label: { color: "#ccc" } }}
      />

      <TextField
        label="Subtitle"
        variant="outlined"
        fullWidth
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        sx={{ mb: 3, input: { color: "#fff" }, label: { color: "#ccc" } }}
      />

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.name}
              onChange={(e) => setFields({ ...fields, name: e.target.checked })}
            />
          }
          label="Enable Name Field"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.email}
              onChange={(e) =>
                setFields({ ...fields, email: e.target.checked })
              }
            />
          }
          label="Enable Email Field"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.phone}
              onChange={(e) =>
                setFields({ ...fields, phone: e.target.checked })
              }
            />
          }
          label="Enable Phone Field"
        />
      </FormGroup>

      <Button
        variant="contained"
        sx={{ mt: 3, bgcolor: "#7367f0" }}
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Settings"}
      </Button>

      {mutationError && (
        <Typography sx={{ mt: 2, color: "red" }}>
          Something went wrong. Try again.
        </Typography>
      )}
    </Box>
  );
}
