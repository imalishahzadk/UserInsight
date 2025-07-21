'use client';
import { Box, Typography } from '@mui/material';

interface ThemeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Dark Theme Option */}
      <Box 
        onClick={() => onChange('dark')}
        sx={{
          width: '150px',
          height: '100px',
          bgcolor: '#1F2937',
          borderRadius: '12px',
          p: 2,
          cursor: 'pointer',
          border: 2,
          borderColor: value === 'dark' ? '#1A83FF' : 'transparent',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '&:hover': {
            borderColor: value === 'dark' ? '#1A83FF' : '#E5E7EB'
          }
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              bgcolor: value === 'dark' ? '#1A83FF' : '#4B5563'
            }} 
          />
          <Typography sx={{ color: '#FFFFFF', fontSize: '14px' }}>Dark</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ height: 4, width: '60%', bgcolor: '#4B5563', borderRadius: 1 }} />
          <Box sx={{ height: 4, width: '40%', bgcolor: '#4B5563', borderRadius: 1 }} />
        </Box>
      </Box>

      {/* Light Theme Option */}
      <Box 
        onClick={() => onChange('light')}
        sx={{
          width: '150px',
          height: '100px',
          bgcolor: '#FFFFFF',
          borderRadius: '12px',
          p: 2,
          cursor: 'pointer',
          border: 2,
          borderColor: value === 'light' ? '#1A83FF' : '#E5E7EB',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '&:hover': {
            borderColor: '#1A83FF'
          }
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              bgcolor: value === 'light' ? '#1A83FF' : '#E5E7EB'
            }} 
          />
          <Typography sx={{ color: '#111827', fontSize: '14px' }}>Light</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ height: 4, width: '60%', bgcolor: '#E5E7EB', borderRadius: 1 }} />
          <Box sx={{ height: 4, width: '40%', bgcolor: '#E5E7EB', borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}