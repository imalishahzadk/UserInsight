"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { IClient, IClientPermissions } from "@/core/types/client";
import useUserForm, { formFields } from "@/hooks/client/user/use-user-form";
import { renderConditionalImage } from "@/utils";

type Permission = {
  view: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
};

type PermissionsState = Record<string, Permission>;

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    color: "#fff",
    bgcolor: "#0a0f1e",
    height: "48px",
    "& input": {
      height: "48px",
      padding: "0 20px",
      boxSizing: "border-box",
    },
    border: "1px solid rgba(0, 229, 255, 0.2)",
    "&:hover": {
      borderColor: "rgba(0, 229, 255, 0.4)",
    },
    "&.Mui-focused": {
      borderColor: "#00e5ff",
      boxShadow: "0 0 0 2px rgba(0, 229, 255, 0.2)",
    },
    "& fieldset": {
      border: "none",
    },
  },
};

interface IUserFormProps {
  updateAction?: boolean;
  defaultValues?: IClient;
}

const UserForm = ({ updateAction = false, defaultValues }: IUserFormProps) => {
  const router = useRouter();

  const {
    formGroup,
    handleImageChange,
    handleInputChange,
    handleSubmitForm,
    handleToggleSelectPermission,
    isLoading,
    toggleAllPermissions,
    permissionModules,
  } = useUserForm({ updateAction, defaultValues });
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#070b15",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "#0a0f1e",
              borderRadius: "16px",
              p: 3,
              border: "1px solid rgba(0, 229, 255, 0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
                boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
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
              Add new user
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {formFields.map((field) => (
                <Box key={field.name}>
                  <Typography
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: "#fff",
                    }}
                  >
                    {field.label}
                  </Typography>
                  <TextField
                    fullWidth
                    type={field.type || "text"}
                    name={field.name}
                    defaultValue={formGroup[field.name]}
                    onBlur={handleInputChange}
                    placeholder={
                      updateAction && field.name === "password"
                        ? "(Unchanged)"
                        : "Write here"
                    }
                    sx={inputStyle}
                  />
                </Box>
              ))}

              <input
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />

              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: "#fff",
                  }}
                >
                  Upload image
                </Typography>
                <Box
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  sx={{
                    border: "1px solid rgba(0, 229, 255, 0.2)",
                    borderRadius: "8px",
                    p: 3,
                    textAlign: "center",
                    bgcolor: "#0a0f1e",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      borderColor: "rgba(0, 229, 255, 0.4)",
                      boxShadow: "0 0 0 2px rgba(0, 229, 255, 0.1)",
                    },
                  }}
                >
                  {formGroup.image ? (
                    <img
                      src={renderConditionalImage(formGroup.image)}
                      alt="Preview"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <Box sx={{ color: "rgba(255,255,255,0.6)" }}>
                      <UploadIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography>Click to upload an image</Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.back()}
                  sx={{
                    height: "48px",
                    minWidth: "120px",
                    textTransform: "none",
                    borderRadius: "8px",
                    borderColor: "rgba(0, 229, 255, 0.2)",
                    color: "#fff",
                    "&:hover": {
                      borderColor: "rgba(0, 229, 255, 0.4)",
                      bgcolor: "transparent",
                    },
                  }}
                  startIcon={<ArrowBackIcon />}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmitForm}
                  disabled={isLoading}
                  sx={{
                    height: "48px",
                    textTransform: "none",
                    borderRadius: "8px",
                    bgcolor: "#00e5ff",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "rgba(0, 229, 255, 0.8)",
                    },
                    "&:disabled": {
                      bgcolor: "rgba(0, 229, 255, 0.4)",
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "#7367f0" }} />
                  ) : updateAction ? (
                    "Save Changes"
                  ) : (
                    "Add User"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "#0a0f1e",
              borderRadius: "16px",
              p: 3,
              border: "1px solid rgba(0, 229, 255, 0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "rgba(0, 229, 255, 0.4)",
                boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
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
              Roles and permissions
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Grid container>
                <Grid item xs={4}></Grid>
                <Grid container item xs={8} spacing={1}>
                  {["View", "Edit", "Add", "Delete"].map((header) => (
                    <Grid item xs={3} key={header}>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {header}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                {permissionModules.map((module: keyof IClientPermissions) => (
                  <Grid
                    container
                    item
                    xs={12}
                    key={module}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Grid item xs={4}>
                      <Typography sx={{ fontWeight: 500, color: "#fff" }}>
                        {module}
                      </Typography>
                    </Grid>
                    <Grid container item xs={8} spacing={1}>
                      {(["view", "edit", "add", "delete"] as const).map(
                        (permission) => (
                          <Grid item xs={3} key={permission}>
                            <Checkbox
                              size="small"
                              checked={
                                formGroup.permissions[module][permission]
                              }
                              onChange={() =>
                                handleToggleSelectPermission(module, permission)
                              }
                              sx={{
                                color: "rgba(0, 229, 255, 0.4)",
                                "&.Mui-checked": {
                                  color: "#00e5ff",
                                },
                              }}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Button
                onClick={toggleAllPermissions}
                variant="contained"
                sx={{
                  mt: 3,
                  textTransform: "none",
                  borderRadius: "8px",
                  height: "48px",
                  minWidth: "120px",
                  bgcolor: "#00e5ff",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "rgba(0, 229, 255, 0.8)",
                  },
                }}
              >
                {permissionModules.every((module) =>
                  Object.values(formGroup.permissions[module]).every(
                    (value) => value
                  )
                )
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
