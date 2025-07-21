"use client";
import { Box, Typography } from "@mui/material";

interface StatsCardsProps {
  totalClients?: number;
  recentClients?: number;
  totalUsers?: number;
  recentUsers?: number;
  totalConversations?: number;
  recentConversations?: number;
  maintStatColor?: string;
  className?: string;
}

export default function StatsCard({
  totalClients,
  recentClients,
  totalUsers,
  recentUsers,
  totalConversations,
  recentConversations,
  className,
}: StatsCardsProps) {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        p: 3,
        height: "100%",
        boxShadow: "0px 4px 35px 0px #0D0A2C0F",
      }}
      className="box-style"
      // className={className}
    >
      {/* <Typography 
        sx={{ 
          fontSize: 16,
          fontWeight: 600,
          color: '#1A1A1A',
          mb: 2
        }}
      >
        {title}
      </Typography>

      <Typography 
        sx={{ 
          fontSize: 48,
          fontWeight: 700,
          color: mainStatColor,
          mb: 1,
          lineHeight: 1
        }}
      >
        {mainStat}
      </Typography>

      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography sx={{ 
          color: '#666',
          fontSize: 14
        }}>
          {subStat}
        </Typography>
        {subStatValue && (
          <Typography sx={{ 
            color: subStatColor || '#666',
            fontSize: 14
          }}>
            {subStatValue}
          </Typography>
        )}
      </Box> */}
    </Box>
  );
}
