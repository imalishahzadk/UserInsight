import { Box, Typography } from "@mui/material";
import ClientForm from "./client-form";

const AddClient = () => {
 return (
   <Box
     sx={{
       p: { xs: 2, md: 4 },
       bgcolor: "#070b15",
       minHeight: "100vh",
     }}
   >
     <Box sx={{ maxWidth: "700px" }}>
       <Typography 
         sx={{ 
           fontSize: "1.25rem",
           fontWeight: 600,
           color: "#fff",
           mb: 3,
         }}
       >
         Add New Client
       </Typography>
       <ClientForm />
     </Box>
   </Box>
 );
};

export default AddClient;