'use client';
import { Box, Typography, IconButton, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

interface AgentCardProps {
  title: string;
  description: string;
  stats: {
    users: string;
    messages: string;
    accuracy: string;
  };
  createdDate: string;
  status: string;
  onViewDetail?: () => void;
}

export default function AgentCard({
  title,
  description,
  stats,
  createdDate,
  status,
  onViewDetail
}: AgentCardProps) {
  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 2,
      p: 3,
      width: '100%'
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            component="img"
            src="/images/table-profile.png"
            sx={{ width: 48, height: 48, borderRadius: '8px' }}
          />
          <Box>
            <Typography sx={{ fontWeight: 500, mb: 0.5 }}>{title}</Typography>
            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
              {description}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton>
            <ContentCopyIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 2,
        mb: 3
      }}>
        {[
          { label: 'Users', value: stats.users },
          { label: 'Messages', value: stats.messages },
          { label: 'Accuracy', value: stats.accuracy }
        ].map((stat, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <PersonIcon sx={{ color: '#4285f4', mb: 1 }} />
            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 0.5 }}>
              {stat.label}
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box>
          <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 0.5 }}>
            Created {createdDate}
          </Typography>
          <Typography sx={{ 
            display: 'inline-block',
            color: '#10B981',
            bgcolor: '#ECFDF5',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.875rem'
          }}>
            {status}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={onViewDetail}
          sx={{
            bgcolor: '#4285f4',
            '&:hover': { bgcolor: '#3b77db' },
            textTransform: 'none',
            borderRadius: '100px'
          }}
        >
          View Detail
        </Button>
      </Box>
    </Box>
  );
}