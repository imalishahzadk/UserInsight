'use client';
import { Box } from '@mui/material';

export default function AgentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ 
      bgcolor: '#F8F9FA',
      minHeight: '100vh'
    }}>
      {children}
    </Box>
  );
}