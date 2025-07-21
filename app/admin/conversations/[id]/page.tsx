'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';

const mockData = {
  bot: {
    name: "Family RV AI Agent",
    subtitle: "Ask me everything",
    image: "/path-to-image.jpg"
  },
  messages: [
    {
      id: 1,
      type: 'bot',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      timestamp: 'Dec 15, 2024, 2:47:27 PM'
    },
    {
      id: 2,
      type: 'user',
      text: 'Give me 10 natural color plates',
      timestamp: 'Dec 15, 2024, 2:47:27 PM'
    }
  ],
  stats: {
    totalMessages: 468,
    botMessages: 234,
    userMessages: 234,
    positiveReviews: 45,
    negativeReviews: 5
  }
};

export default function ConversationView() {
  const router = useRouter();
  const [messages] = useState(mockData.messages);

  const handleBack = () => {
    router.back();
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh' }}>
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '100px',
              textTransform: 'none',
              borderColor: '#E5E7EB',
              color: '#111827',
              '&:hover': {
                borderColor: '#1A83FF',
                color: '#1A83FF',
              }
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
              color: '#111827',
              '&:hover': {
                borderColor: '#1A83FF',
                color: '#1A83FF',
              }
            }}
          >
            Share
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: 'Total Messages', value: mockData.stats.totalMessages },
            { label: 'Bot Messages', value: mockData.stats.botMessages },
            { label: 'User Messages', value: mockData.stats.userMessages },
            { label: 'Positive Reviews', value: mockData.stats.positiveReviews },
            { label: 'Negative Reviews', value: mockData.stats.negativeReviews }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Box sx={{ 
                bgcolor: 'white', 
                p: 2, 
                borderRadius: '16px',
                boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
              }}>
                <Typography color="text.secondary" fontSize={14}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  {stat.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Chat Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}>AI</Avatar>
          <Typography variant="h5" fontWeight={500}>
            {mockData.bot.name}
          </Typography>
          <Typography color="text.secondary">
            {mockData.bot.subtitle}
          </Typography>
          <Typography color="text.secondary" fontSize={14} mt={1}>
            Dec 15, 2024, 2:47:27 PM (Message:5)
          </Typography>
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 0.5, 
            px: 2, 
            py: 0.5, 
            bgcolor: '#ECFDF5', 
            color: '#10B981',
            borderRadius: '100px',
            mt: 1
          }}>
            <Box sx={{ 
              width: 6, 
              height: 6, 
              borderRadius: '50%', 
              bgcolor: 'currentColor',
              mr: 0.5 
            }} />
            Positive
          </Box>
        </Box>

        {/* Messages */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {messages.map((message) => (
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
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button
                      size="small"
                      variant="text"
                      startIcon={<ContentCopyIcon sx={{ fontSize: 16 }} />}
                      onClick={() => copyText(message.text)}
                      sx={{ 
                        color: '#6B7280',
                        textTransform: 'none',
                        fontSize: 14,
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
                      sx={{ 
                        color: '#6B7280',
                        '&:hover': { color: '#1A83FF' }
                      }}
                    >
                      <ThumbUpIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: '#6B7280',
                        '&:hover': { color: '#1A83FF' }
                      }}
                    >
                      <ThumbDownIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box key={message.id} sx={{ 
                alignSelf: 'flex-end',
                maxWidth: '80%',
                display: 'flex',
                gap: 2
              }}>
                <Box sx={{ 
                  bgcolor: '#1A83FF',
                  color: 'white',
                  p: 2,
                  borderRadius: '12px'
                }}>
                  <Typography>{message.text}</Typography>
                </Box>
                <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
              </Box>
            )
          ))}
        </Box>
      </Box>
    </Box>
  );
}