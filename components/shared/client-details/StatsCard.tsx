import { Box, Typography } from '@mui/material';

interface StatsCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

export default function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
      p: 2,
      minWidth: '100px'
    }}>
      {icon}
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
}