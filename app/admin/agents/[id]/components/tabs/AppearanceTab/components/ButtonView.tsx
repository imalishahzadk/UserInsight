'use client';
import { IconButton, Avatar } from '@mui/material';

interface ButtonViewProps {
  settings: {
    theme: string;
    primaryColor: string;
  };
  conversationId:string;
  projectId:string;
  image?: string | null;
  onStateChange?: (state: 'full' | 'mini' | 'button') => void;
}

export default function ButtonView({ settings, image, onStateChange,conversationId,projectId }: ButtonViewProps) {
  return (
    <IconButton
      onClick={() => onStateChange?.('full')}
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        bgcolor: settings.primaryColor,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        '&:hover': {
          bgcolor: settings.primaryColor,
        },
      }}
    >
      <Avatar
        src={image || undefined}
        sx={{ 
          width: 40, 
          height: 40,
          bgcolor: 'transparent'
        }}
      />
    </IconButton>
  );
}