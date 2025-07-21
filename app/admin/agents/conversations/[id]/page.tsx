'use client';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Mock conversation data
const mockConversation = {
  id: 1,
  agent: {
    name: 'Family RV AI Agent',
    subtitle: 'Ask me everything',
    avatar: '/path/to/avatar.jpg'
  },
  messages: [
    {
      id: 1,
      type: 'bot',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      timestamp: new Date().toLocaleString()
    },
    {
      id: 2,
      type: 'user',
      text: 'Give me 10 natural color plates',
      timestamp: new Date().toLocaleString(),
      userAvatar: '/path/to/user.jpg'
    }
  ],
  status: 'Positive',
  timestamp: 'Dec 15, 2024, 2:47:27 PM',
  messageCount: 5
};

export default function ConversationDetailPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ 
      bgcolor: '#F9FAFB', 
      minHeight: '100vh',
    }}>
      {/* Header */}
      <Box sx={{ 
        px: 3, 
        py: 2,
        bgcolor: 'white',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              color: 'white',
              bgcolor: '#1A83FF',
              borderRadius: '100px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#1666CC'
              }
            }}
          >
            Back
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
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
      </Box>

      {/* Chat Header */}
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Box sx={{ 
          textAlign: 'center',
          mb: 4 
        }}>
          <Avatar
            src={mockConversation.agent.avatar}
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
            {mockConversation.agent.name}
          </Typography>
          <Typography color="text.secondary">
            {mockConversation.agent.subtitle}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14, mt: 1 }}>
            {mockConversation.timestamp} (Message:{mockConversation.messageCount})
          </Typography>
        </Box>

        {/* Chat Messages */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mockConversation.messages.map((message) => (
            message.type === 'bot' ? (
              <Box key={message.id} sx={{ display: 'flex', gap: 2, maxWidth: '80%' }}>
                <Avatar sx={{ width: 40, height: 40 }}>AI</Avatar>
                <Box>
                  <Box sx={{ 
                    bgcolor: 'white',
                    p: 2,
                    borderRadius: '12px',
                    mb: 1
                  }}>
                    <Typography>{message.text}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                      startIcon={<ContentCopyIcon fontSize="small" />}
                      onClick={() => copyText(message.text)}
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
                    <IconButton 
                      size="small"
                      sx={{ color: '#6B7280' }}
                    >
                      <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ color: '#6B7280' }}
                    >
                      <ThumbDownIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box 
                key={message.id} 
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
                  <Typography>{message.text}</Typography>
                </Box>
                <Avatar 
                  src={message.userAvatar}
                  sx={{ width: 40, height: 40 }}
                >
                  U
                </Avatar>
              </Box>
            )
          ))}
        </Box>
      </Box>
    </Box>
  );
}