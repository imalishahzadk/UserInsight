'use client';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

interface MiniChatViewProps {
  settings: {
    theme: string;
    agentName: string;
    subtitle: string;
    primaryColor: string;
  };
  conversationId:string;
  projectId:string;
  image?: string | null;
  onStateChange?: (state: 'full' | 'mini' | 'button') => void;
}

export default function MiniChatView({ settings, image, onStateChange,conversationId,projectId }: MiniChatViewProps) {
  const isDark = settings.theme === 'dark';
  
  return (
    <Box sx={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      bgcolor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    }}>
      <Box sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: settings.primaryColor,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar src={image || undefined} sx={{ width: 28, height: 28 }} />
          <Box>
            <Typography sx={{ 
              color: '#FFFFFF', 
              fontSize: '14px',
              fontWeight: 500
            }}>
              {settings.agentName}
            </Typography>
            <Typography sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '12px',
            }}>
              {settings.subtitle}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" onClick={() => onStateChange?.('full')}>
            <OpenInFullIcon sx={{ color: '#FFFFFF', fontSize: '18px' }} />
          </IconButton>
          <IconButton size="small" onClick={() => onStateChange?.('button')}>
            <CloseIcon sx={{ color: '#FFFFFF', fontSize: '18px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}