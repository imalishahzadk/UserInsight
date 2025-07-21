'use client';
import { Box, Typography, Avatar, Button, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';

interface ChatViewProps {
  data: any;
  isModal?: boolean;
}

export default function ChatView({ data, isModal = false }: ChatViewProps) {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ 
      ...(isModal ? {
        p: 0,
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
      } : {
        p: 3,
        maxWidth: 800,
        mx: 'auto'
      })
    }}>
      {/* Header Actions */}
      {!isModal && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: 2,
          mb: 3
        }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '100px',
              textTransform: 'none',
              borderColor: '#E5E7EB',
              color: '#111827'
            }}
          >
            Review
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            sx={{
              borderRadius: '100px',
              textTransform: 'none',
              borderColor: '#E5E7EB',
              color: '#111827'
            }}
          >
            Share
          </Button>
        </Box>
      )}

      {/* Chat Header */}
      <Box sx={{ 
        textAlign: 'center',
        mb: 4 
      }}>
        <Avatar
          sx={{ 
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2
          }}
        >
          AI
        </Avatar>
        <Typography variant="h5" fontWeight={500} sx={{ mb: 0.5 }}>
          Family RV AI Agent
        </Typography>
        <Typography color="text.secondary">
          Ask me everything
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, mt: 1 }}>
          Dec 15, 2024, 2:47:27 PM (Message:5)
        </Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3,
        flex: 1,
        overflow: 'auto',
        px: 3,
        ...(isModal ? {
          bgcolor: '#F9FAFB',
          py: 3
        } : {})
      }}>
        <Box sx={{ display: 'flex', gap: 2, maxWidth: '80%' }}>
          <Avatar sx={{ width: 40, height: 40 }}>AI</Avatar>
          <Box>
            <Box sx={{ 
              bgcolor: 'white',
              p: 2,
              borderRadius: '12px',
              mb: 1
            }}>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                startIcon={<ContentCopyIcon fontSize="small" />}
                onClick={() => copyText("Lorem Ipsum...")}
                sx={{ 
                  color: '#6B7280',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#1A83FF'
                  }
                }}
              >
                Text copy
              </Button>
              <IconButton size="small" sx={{ color: '#6B7280' }}>
                <ThumbUpIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: '#6B7280' }}>
                <ThumbDownIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box 
          sx={{ 
            alignSelf: 'flex-end',
            maxWidth: '80%',
            display: 'flex',
            gap: 2
          }}
        >
          <Box sx={{ 
            bgcolor: '#1A83FF',
            color: 'white',
            p: 2,
            borderRadius: '12px'
          }}>
            <Typography>Give me 10 natural color plates</Typography>
          </Box>
          <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
        </Box>
      </Box>
    </Box>
  );
}