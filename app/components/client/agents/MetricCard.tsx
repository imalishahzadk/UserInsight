'use client';
import { Box, Typography } from '@mui/material';

interface MetricCardProps {
  title: string;
  value: string;
  percentage: string;
  subtitle: string;
  valueColor?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  percentage, 
  subtitle,
  valueColor = '#4285f4'
}: MetricCardProps) {
  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 3,
      p: 3,
      height: '100%',
      boxShadow: '0px 4px 35px 0px #0D0A2C0F'
    }}>
      <Typography sx={{ 
        color: '#666',
        fontSize: '0.875rem',
        mb: 2
      }}>
        {title}
      </Typography>

      <Box sx={{ 
        display: 'flex',
        alignItems: 'baseline',
        gap: 1,
        mb: 1
      }}>
        <Typography sx={{
          fontSize: '2rem',
          fontWeight: 700,
          color: valueColor
        }}>
          {value}
        </Typography>
        <Typography sx={{
          color: '#10b981',
          fontSize: '0.875rem'
        }}>
          {percentage}
        </Typography>
      </Box>

      <Typography sx={{ 
        color: '#666',
        fontSize: '0.875rem'
      }}>
        {subtitle}
      </Typography>
    </Box>
  );
}