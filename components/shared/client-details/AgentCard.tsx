import { Box, Button, Paper, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import StatsCard from './StatsCard';

interface AgentCardProps {
  name: string;
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
  name,
  description,
  stats,
  createdDate,
  status,
  onViewDetail
}: AgentCardProps) {
  return (
    <Paper sx={{
      p: 3,
      borderRadius: 2,
      bgcolor: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            component="img"
            src="/api/placeholder/48/48"
            sx={{ width: 48, height: 48, borderRadius: '8px' }}
          />
          <Box>
            <Typography variant="h6" fontWeight={500}>{name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => console.log('Copy')}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton onClick={() => console.log('Settings')}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
        py: 2
      }}>
        <StatsCard icon={<PersonIcon />} label="Users" value={stats.users} />
        <StatsCard icon={<MessageIcon />} label="Messages" value={stats.messages} />
        <StatsCard icon={<PrecisionManufacturingIcon />} label="Accuracy" value={stats.accuracy} />
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Created {createdDate}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#10B981',
              bgcolor: '#ECFDF5',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              display: 'inline-block',
              mt: 0.5
            }}
          >
            {status}
          </Typography>
        </Box>
        <Button 
          variant="contained"
          onClick={onViewDetail}
          sx={{
            textTransform: 'none',
            borderRadius: '30px',
            bgcolor: '#4285f4',
            '&:hover': {
              bgcolor: '#3b77db'
            }
          }}
        >
          View Detail
        </Button>
      </Box>
    </Paper>
  );
}