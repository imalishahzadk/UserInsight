import React from "react";
import useClientForm from "@/hooks/admin/clients/use-client-form";
import { Controller } from "react-hook-form";
import {
 Box,
 Button,
 TextField,
 Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Spinner from "@/components/shared/ui/Spinner";

interface IClientForm {
 updateAction?: boolean;
 defaultValues?: any;
}

const inputSx = {
 "& .MuiOutlinedInput-root": {
   height: "48px",
   borderRadius: "8px",
   bgcolor: "#0a0f1e",
   border: "1px solid rgba(0, 229, 255, 0.2)",
   "& fieldset": { border: "none" },
   "&:hover": {
     borderColor: "rgba(0, 229, 255, 0.4)",
   },
   "&.Mui-focused": {
     borderColor: "#00e5ff",
   },
 },
 "& .MuiOutlinedInput-input": {
   color: "#fff",
   "&::placeholder": {
     color: "rgba(255, 255, 255, 0.5)",
     opacity: 1,
   },
 },
 "& .MuiInputLabel-root": {
   color: "rgba(255, 255, 255, 0.7)",
 },
 "& .MuiFormHelperText-root": {
   color: "#ef4444",
 },
};

const ClientForm = ({ updateAction = false, defaultValues }: IClientForm) => {
 const {
   formInstance: {
     control,
     handleSubmit,
     formState: { isSubmitting },
   },
   handleGoBack,
   handleSubmitForm,
   onChangeImage,
   previewImage,
 } = useClientForm({ updateAction, defaultValues });

 return (
   <Box
     component="form"
     onSubmit={handleSubmit(handleSubmitForm)}
     sx={{
       bgcolor: "#0a0f1e",
       borderRadius: "16px",
       p: 3,
       display: "flex", 
       flexDirection: "column",
       gap: 3,
       border: "1px solid rgba(0, 229, 255, 0.2)",
     }}
   >
     {[
       { name: "name", label: "Enter name" },
       { name: "email", label: "Enter email" },
       { name: "password", label: "Enter password", type: "password" },
       { name: "leadEmailAddress", label: "Lead email" },
       { name: "phoneNumber", label: "Phone number" },
       { name: "companyName", label: "Company name" },
     ].map((field) => (
       <Controller
         key={field.name}
         name={field.name}
         control={control}
         defaultValue={defaultValues?.[field.name] || ""}
         render={({ field: { ref, ...fieldProps }, fieldState: { error } }) => (
           <TextField
             {...fieldProps}
             fullWidth
             label={field.label}
             type={field.type || "text"}
             placeholder={field.type === "password" && updateAction ? "(unchanged)" : "Write here"}
             sx={inputSx}
             error={!!error}
             helperText={error?.message}
           />
         )}
       />
     ))}

     <Box>
       <Typography sx={{ mb: 1, color: "#fff", fontSize: "0.875rem" }}>
         Upload image
       </Typography>

       <Box
         component="label"
         htmlFor="imageInput"
         sx={{
           border: "1px dashed rgba(0, 229, 255, 0.2)",
           borderRadius: "8px",
           p: 3,
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           gap: 2,
           cursor: "pointer",
           height: "160px",
           justifyContent: "center",
           bgcolor: "#070b15",
           "&:hover": {
             borderColor: "#00e5ff",
           },
         }}
       >
         {previewImage ? (
           <img
             src={previewImage}
             alt="Uploaded"
             style={{ maxWidth: "100%", maxHeight: "100%" }}
           />
         ) : (
           <>
             <ImageIcon sx={{ fontSize: 40, color: "rgba(255, 255, 255, 0.5)" }} />
             <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem" }}>
               Click to upload
             </Typography>
           </>
         )}
         <input
           id="imageInput"
           type="file"
           hidden
           accept="image/*"
           onChange={onChangeImage}
         />
       </Box>
     </Box>

     <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
       <Button
         variant="outlined"
         startIcon={<ArrowBackIcon />}
         onClick={handleGoBack}
         sx={{
           color: "#00e5ff",
           borderColor: "rgba(0, 229, 255, 0.2)",
           borderRadius: "8px",
           textTransform: "none",
           px: 3,
           "&:hover": {
             bgcolor: "rgba(0, 229, 255, 0.1)",
             borderColor: "rgba(0, 229, 255, 0.4)",
           },
         }}
       >
         Back
       </Button>
       <Button
         disabled={isSubmitting}
         variant="contained"
         type="submit"
         sx={{
           bgcolor: "#00e5ff",
           color: "#0a0f1e",
           borderRadius: "8px",
           textTransform: "none",
           px: 3,
           fontWeight: 500,
           "&:hover": {
             bgcolor: "rgba(0, 229, 255, 0.8)",
           },
         }}
       >
         {isSubmitting ? (
           <Spinner size={20} />
         ) : updateAction ? (
           "Save Changes"
         ) : (
           "Add Client"
         )}
       </Button>
     </Box>
   </Box>
 );
};

export default ClientForm;