import { Box, Paper, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface PackageInfoProps {
  packageName: string;
  activeDate: string;
  remainingDays: string;
  expireDate: string;
  onCancel?: () => void;
  onUpgrade?: () => void;
}

export default function PackageInfo({
  packageName,
  activeDate,
  remainingDays,
  expireDate,
  onCancel,
  onUpgrade
}: PackageInfoProps) {
  return (
    <Paper sx={{
      p: 3,
      borderRadius: 2,
      bgcolor: 'black',
      color: 'white'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h6" fontWeight={500}>
          Current package
        </Typography>
        <AddIcon />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography color="grey.400" variant="body2">
            Package
          </Typography>
          <Typography variant="body1">
            {packageName}
          </Typography>
        </Box>
        <Box>
          <Typography color="grey.400" variant="body2">
            Active date
          </Typography>
          <Typography variant="body1">
            {activeDate}
          </Typography>
        </Box>
        <Box>
          <Typography color="grey.400" variant="body2">
            Remaining days
          </Typography>
          <Typography variant="body1">
            {remainingDays}
          </Typography>
        </Box>
        <Box>
          <Typography color="grey.400" variant="body2">
            Expire date
          </Typography>
          <Typography variant="body1">
            {expireDate}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            color: '#EF4444',
            borderColor: '#EF4444',
            '&:hover': {
              borderColor: '#DC2626',
              bgcolor: 'rgba(239, 68, 68, 0.04)'
            },
            textTransform: 'none',
            borderRadius: '30px',
            px: 4
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onUpgrade}
          sx={{
            bgcolor: '#4285f4',
            '&:hover': {
              bgcolor: '#3b77db'
            },
            textTransform: 'none',
            borderRadius: '30px',
            px: 4
          }}
        >
          Upgrade
        </Button>
      </Box>
    </Paper>
  );
}