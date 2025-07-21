import { Box, Paper, Typography, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface InfoCardProps {
  title: string;
  fields: {
    label: string;
    value: string;
    copyable?: boolean;
  }[];
}

export default function InfoCard({ title, fields }: InfoCardProps) {
  return (
    <Paper sx={{
      p: 3,
      borderRadius: 2,
      bgcolor: 'white'
    }}>
      <Typography variant="h6" fontWeight={500} mb={3}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map((field, index) => (
          <Box key={index}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              {field.label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography>{field.value}</Typography>
              {field.copyable && (
                <Button
                  startIcon={<ContentCopyIcon />}
                  onClick={() => navigator.clipboard.writeText(field.value)}
                  sx={{
                    textTransform: 'none',
                    color: '#4285f4',
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: '#3b77db'
                    }
                  }}
                >
                  Copy Link
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}