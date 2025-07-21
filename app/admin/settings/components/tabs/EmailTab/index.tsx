"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailPreview from "./EmailPreview";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    fontSize: 14,
    bgcolor: "#0a0f1e",
    color: "#fff",
    borderRadius: "16px",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "rgba(0, 229, 255, 0.4)",
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused": {
      borderColor: "#00e5ff",
    },
  },
};

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  isDefault: boolean;
  lastModified: string;
}

const initialTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to {COMPANY_NAME}",
    content: `Dear {USER_NAME},

Welcome to {COMPANY_NAME}! We're thrilled to have you on board.

Your account has been successfully created and you're now ready to get started with our services.

If you have any questions, feel free to reach out to our support team.

Best regards,
The {COMPANY_NAME} Team`,
    isDefault: true,
    lastModified: "2024-01-12",
  },
  {
    id: 2,
    name: "Password Reset",
    subject: "Password Reset Request",
    content: `Hi {USER_NAME},

We received a request to reset your password for your {COMPANY_NAME} account.

Click the link below to reset your password:
{RESET_LINK}

If you didn't request this, please ignore this email.

Best regards,
The {COMPANY_NAME} Team`,
    isDefault: true,
    lastModified: "2024-01-12",
  },
];

export default function EmailTab() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorView, setEditorView] = useState(0);
  const [editedTemplate, setEditedTemplate] = useState({
    name: "",
    subject: "",
    content: "",
  });

  const handleInsertVariable = (variable: string) => {
    setEditedTemplate((prev) => ({
      ...prev,
      content: prev.content + " " + variable,
    }));
  };

  const handlePreview = () => {
    return editedTemplate.content
      .replace(/{USER_NAME}/g, "John Doe")
      .replace(/{COMPANY_NAME}/g, "Acme Corp")
      .replace(/{BOT_NAME}/g, "Assistant Bot")
      .replace(/{DATE}/g, new Date().toLocaleDateString())
      .replace(/{RESET_LINK}/g, "https://example.com/reset");
  };

  return (
    <Box>
      <Box sx={{ 
        bgcolor: "#0a0f1e",
        borderRadius: "16px",
        p: 3,
        border: "1px solid rgba(0, 229, 255, 0.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "rgba(0, 229, 255, 0.4)",
          transform: "translateY(-5px)",
          boxShadow: "0 10px 30px rgba(0,229,255,0.1)"
        }
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
            Email Templates
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedTemplate(null);
              setEditedTemplate({ name: "", subject: "", content: "" });
              setEditorView(0);
              setIsEditorOpen(true);
            }}
            sx={{
              bgcolor: "#00e5ff",
              textTransform: "none",
              borderRadius: "100px",
              px: 3,
              "&:hover": {
                bgcolor: "#00e5ff",
                opacity: 0.9,
              },
            }}
          >
            Add Template
          </Button>
        </Box>

        <TableContainer sx={{
          bgcolor: "#070b15",
          borderRadius: "16px",
          border: "1px solid rgba(0, 229, 255, 0.2)",
          "& .MuiTableCell-root": {
            borderColor: "rgba(0, 229, 255, 0.1)",
            color: "#fff",
          },
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Template Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>{template.lastModified}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setSelectedTemplate(template);
                        setEditedTemplate({
                          name: template.name,
                          subject: template.subject,
                          content: template.content,
                        });
                        setEditorView(0);
                        setIsEditorOpen(true);
                      }}
                      sx={{ 
                        color: "rgba(255,255,255,0.5)",
                        "&:hover": { color: "#00e5ff" }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedTemplate(template);
                        setEditedTemplate({
                          name: template.name,
                          subject: template.subject,
                          content: template.content,
                        });
                        setEditorView(1);
                        setIsEditorOpen(true);
                      }}
                      sx={{ 
                        color: "rgba(255,255,255,0.5)",
                        "&:hover": { color: "#00e5ff" }
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    {!template.isDefault && (
                      <IconButton
                        sx={{ 
                          color: "rgba(255,255,255,0.5)",
                          "&:hover": { color: "#00e5ff" }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: "#0a0f1e",
              color: "#fff",
              borderRadius: "16px",
            }
          }}
        >
          <DialogTitle sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 229, 255, 0.2)",
          }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              {selectedTemplate ? "Edit Template" : "New Template"}
            </Typography>
            <IconButton 
              onClick={() => setIsEditorOpen(false)}
              sx={{ color: "rgba(255,255,255,0.5)" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <Tabs
            value={editorView}
            onChange={(e, value) => setEditorView(value)}
            sx={{
              px: 3,
              borderBottom: "1px solid rgba(0, 229, 255, 0.2)",
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                "&.Mui-selected": {
                  color: "#00e5ff",
                },
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#00e5ff",
              },
            }}
          >
            <Tab label="Edit" />
            <Tab label="Preview" />
          </Tabs>

          <DialogContent sx={{ p: 3 }}>
            {editorView === 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography sx={{ mb: 1, fontSize: 14 }}>
                    Template Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={editedTemplate.name}
                    onChange={(e) => setEditedTemplate(prev => ({
                      ...prev,
                      name: e.target.value,
                    }))}
                    placeholder="Enter template name"
                    sx={inputStyles}
                  />
                </Box>

                <Box>
                  <Typography sx={{ mb: 1, fontSize: 14 }}>
                    Subject
                  </Typography>
                  <TextField
                    fullWidth
                    value={editedTemplate.subject}
                    onChange={(e) => setEditedTemplate(prev => ({
                      ...prev,
                      subject: e.target.value,
                    }))}
                    placeholder="Enter email subject"
                    sx={inputStyles}
                  />
                </Box>

                <Box>
                  <Typography sx={{ mb: 1, fontSize: 14 }}>
                    Content
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    value={editedTemplate.content}
                    onChange={(e) => setEditedTemplate(prev => ({
                      ...prev,
                      content: e.target.value,
                    }))}
                    placeholder="Enter email content"
                    sx={inputStyles}
                  />
                </Box>

                <Box sx={{
                  bgcolor: "#070b15",
                  p: 2,
                  borderRadius: "16px",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                }}>
                  <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.5)", mb: 1 }}>
                    Available Variables:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {["{USER_NAME}", "{COMPANY_NAME}", "{BOT_NAME}", "{DATE}", "{RESET_LINK}"].map((variable) => (
                      <Box
                        key={variable}
                        onClick={() => handleInsertVariable(variable)}
                        sx={{
                          px: 2,
                          py: 0.5,
                          bgcolor: "#0a0f1e",
                          borderRadius: "16px",
                          fontSize: 14,
                          color: "#00e5ff",
                          border: "1px solid rgba(0, 229, 255, 0.2)",
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            borderColor: "rgba(0, 229, 255, 0.4)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        {variable}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <EmailPreview
                  subject={editedTemplate.subject}
                  content={handlePreview()}
                  companyName="Your Company"
                />
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(0, 229, 255, 0.2)" }}>
            <Button
              variant="outlined"
              onClick={() => setIsEditorOpen(false)}
              sx={{
                textTransform: "none",
                borderRadius: "100px",
                borderColor: "rgba(0, 229, 255, 0.2)",
                color: "rgba(255,255,255,0.7)",
                "&:hover": {
                  borderColor: "rgba(0, 229, 255, 0.4)",
                  bgcolor: "transparent",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#00e5ff",
                textTransform: "none",
                borderRadius: "100px",
                "&:hover": {
                  bgcolor: "#00e5ff",
                  opacity: 0.9,
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}