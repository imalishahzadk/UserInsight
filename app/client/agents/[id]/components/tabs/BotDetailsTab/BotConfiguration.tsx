'use client';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function BotConfiguration() {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: '15px',
        p: 3,
        display: 'flex',
        gap: 4,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Left Side - Bot Configuration */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Bot Configuration
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 0.5 }}
          >
            Bot name
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>TechBot</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 0.5 }}
          >
            Training Status
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>
            Trained (Last updated: 2 days ago)
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 0.5 }}
          >
            Welcome Message
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>
            Hi! How can I help you today?
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Integration Details */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Integration Details
        </Typography>

        <Typography
          sx={{
            color: '#6B7280',
            fontSize: '0.875rem',
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          To integrate this agent into your website or application, use
          either the API key for backend integration or the widget code
          for frontend implementation. Make sure to keep your API key
          secure and never expose it in client-side code.
        </Typography>

        {/* API Key */}
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 1 }}
          >
            API Key
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#F9FAFB',
              p: 2,
              borderRadius: '8px',
            }}
          >
            <Typography sx={{ color: '#6B7280' }}>
              sk_live_xxxxxxxxxxxxx
            </Typography>
            <Button
              variant="contained"
              startIcon={<ContentCopyIcon />}
              size="small"
              sx={{
                bgcolor: '#4285f4',
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': { bgcolor: '#3b77db' },
              }}
            >
              Copy Link
            </Button>
          </Box>
        </Box>

        {/* Widget Code */}
        <Box>
          <Typography
            sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 1 }}
          >
            Widget Code
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#F9FAFB',
              p: 2,
              borderRadius: '8px',
            }}
          >
            <Typography sx={{ color: '#6B7280' }}>
              {'<script src="widget.js"></script>'}
            </Typography>
            <Button
              variant="contained"
              startIcon={<ContentCopyIcon />}
              size="small"
              sx={{
                bgcolor: '#4285f4',
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': { bgcolor: '#3b77db' },
              }}
            >
              Copy Link
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}