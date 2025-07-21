"use client";
import { Box, Typography, Grid } from "@mui/material";

interface StatsCardProps {
 title: string;
 mainStat: string;
 mainStatColor: string;
 subStat: string;
 subStatValue: string;
}

const StatsCard = ({ title, mainStat, mainStatColor, subStat, subStatValue }: StatsCardProps) => (
 <Box
   sx={{
     bgcolor: "#0a0f1e",
     borderRadius: "16px",
     p: 3,
     border: "1px solid rgba(0, 229, 255, 0.2)",
     transition: "all 0.2s ease-in-out",
     "&:hover": {
       borderColor: "rgba(0, 229, 255, 0.4)",
       transform: "translateY(-5px)",
       boxShadow: "0 10px 30px rgba(0,229,255,0.1)",
     },
   }}
 >
   <Typography sx={{ color: "#fff", fontSize: "1rem", mb: 2 }}>{title}</Typography>
   <Typography sx={{ color: "#00e5ff", fontSize: "2rem", fontWeight: 600, mb: 1 }}>
     {mainStat}
   </Typography>
   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
     <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
       {subStat}
     </Typography>
     <Typography sx={{ color: "#00e5ff", fontSize: "0.875rem" }}>{subStatValue}</Typography>
   </Box>
 </Box>
);

export default function FinancialDetails() {
 const defaultStats = [
   {
     title: "Client",
     mainStat: "0",
     mainStatColor: "#00e5ff",
     subStat: "+0%",
     subStatValue: "New: 0",
   },
   {
     title: "Total amount",
     mainStat: "$0",
     mainStatColor: "#00e5ff",
     subStat: "+0%", 
     subStatValue: "Outstanding: $0",
   },
   {
     title: "Pending amount",
     mainStat: "$0",
     mainStatColor: "#00e5ff",
     subStat: "+0%",
     subStatValue: "Due: $0",
   },
   {
     title: "Monthly growth",
     mainStat: "$0",
     mainStatColor: "#00e5ff",
     subStat: "+0%",
     subStatValue: "Projected: 0%",
   },
 ];

 const stats = defaultStats;

 return (
   <Box sx={{ mt: 4 }}>
     <Box sx={{ mb: 3 }}>
       <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", mb: 1 }}>
         Track your monthly consumption
       </Typography>
       <Typography sx={{ fontSize: "1.25rem", fontWeight: 500, color: "#fff" }}>
         Financial details
       </Typography>
     </Box>

     <Grid container spacing={3}>
       {stats.map((stat, index) => (
         <Grid item xs={12} sm={6} md={3} key={index}>
           <StatsCard {...stat} />
         </Grid>
       ))}
     </Grid>
   </Box>
 );
}