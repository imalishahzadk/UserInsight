'use client';
import { Box, Typography } from '@mui/material';

interface StatsCardProps {
  title: string;
  mainStat: string | number;
  subStat: string;
  mainStatColor?: string;
  subStatValue?: string | number;
  subStatColor?: string;
  className?: string;
}

export default function StatsCard({
  title,
  mainStat,
  subStat,
  mainStatColor = '#4285f4',
  subStatValue,
  subStatColor,
  className
}: StatsCardProps) {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: '16px',
        p: 3,
        height: '100%',
        boxShadow: '0px 4px 35px 0px #0D0A2C0F',
      }}
      className={className}
    >
      <Typography 
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
      </Box>
    </Box>
  );
}