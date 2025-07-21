'use client';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface CurrentPackageProps {
  packageName: string;
  activeDate: string;
  remainingDays: string;
  expireDate: string;
}

export default function CurrentPackage({
  packageName,
  activeDate,
  remainingDays,
  expireDate
}: CurrentPackageProps) {
  return (
    <Box sx={{
      bgcolor: 'black',
      borderRadius: 2,
      p: 3,
      color: 'white',
      width: '100%'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 500 }}>
          Current package
        </Typography>
        <AddIcon />
      </Box>

      {/* Package Details */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        mb: 3
      }}>
        <Box>
          <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem', mb: 1 }}>
            Package
          </Typography>
          <Typography>
            {packageName}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem', mb: 1 }}>
            Active date
          </Typography>
          <Typography>
            {activeDate}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem', mb: 1 }}>
            Remaining days
          </Typography>
          <Typography>
            {remainingDays}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem', mb: 1 }}>
            Expire date
          </Typography>
          <Typography>
            {expireDate}
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            color: '#EF4444',
            borderColor: '#EF4444',
            '&:hover': {
              borderColor: '#DC2626',
              bgcolor: 'rgba(239, 68, 68, 0.04)'
            },
            textTransform: 'none',
            borderRadius: '100px'
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#4285f4',
            '&:hover': { bgcolor: '#3b77db' },
            textTransform: 'none',
            borderRadius: '100px'
          }}
        >
          Upgrade
        </Button>
      </Box>
    </Box>
  );
}