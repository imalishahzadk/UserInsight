'use client';
import { useState } from 'react';
import { Box, Typography, Switch, IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';

interface AgentCardProps {
  title: string;
  initialActive?: boolean;
}

export default function AgentCard({ title, initialActive = false }: AgentCardProps) {
  const router = useRouter();
  const [isOn, setIsOn] = useState(initialActive);
  const [localLoading, setLocalLoading] = useState(false);

  const handleCardClick = () => {
    setLocalLoading(true);
    router.push(`/admin/agents/1`); // Replace with actual agent ID
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsOn(e.target.checked);
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add settings action here
  };

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        bgcolor: 'white',
        borderRadius: 3,
        p: 3,
        height: '100%',
        boxShadow: '0px 4px 35px 0px #0D0A2C0F',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        opacity: localLoading ? 0.7 : 1,
        pointerEvents: localLoading ? 'none' : 'auto',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 8px 40px 0px #0D0A2C1A'
        }
      }}
    >
      {/* Profile Image & Settings */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ 
          width: 48,
          height: 48,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Image
            src="/images/profile-placeholder.png"
            alt="Agent Avatar"
            fill
            sizes="48px"
          />
        </Box>
        <Box 
          onClick={handleSettingsClick}
          sx={{ 
            p: 0.5,
            borderRadius: 1,
            '&:hover': {
              bgcolor: '#f5f5f5'
            }
          }}
        >
          <SettingsIcon sx={{ 
            color: '#666',
            cursor: 'pointer',
            '&:hover': { color: '#4285f4' }
          }} />
        </Box>
      </Box>

      {/* Title */}
      <Typography 
        sx={{ 
          fontSize: '1.125rem',
          fontWeight: 500,
          mb: 2 
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography 
        sx={{ 
          color: '#666',
          fontSize: '0.875rem',
          mb: 3
        }}
      >
        Ask me everything
      </Typography>

      {/* Stats */}
      <Box sx={{ 
        display: 'flex',
        gap: 3,
        mb: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonOutlineIcon sx={{ color: '#666', fontSize: 20 }} />
          <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
            2.4K Users
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon sx={{ color: '#666', fontSize: 20 }} />
          <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
            2 days ago
          </Typography>
        </Box>
      </Box>

      {/* Switch */}
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography sx={{ 
          fontSize: '0.875rem',
          color: '#666'
        }}>
          {isOn ? 'On' : 'Off'}
        </Typography>
        <Switch
          checked={isOn}
          onChange={handleSwitchChange}
          onClick={e => e.stopPropagation()}
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: '#e0e0e0'
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: isOn ? '#4285f4' : '#fff'
            },
            '& .Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#90caf9 !important'
            }
          }}
        />
      </Box>
    </Box>
  );
}