'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function PreviewBot() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReset = () => {
    setMessages([]);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const botMessage: Message = {
      id: messages.length + 2,
      type: 'bot',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={handleBack}
            sx={{ color: '#6B7280' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={600}>
            Preview bot
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleReset}
          sx={{
            bgcolor: '#1A83FF',
            borderRadius: '100px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#1666CC'
            }
          }}
        >
          Reset Chat
        </Button>
      </Box>

      <Box sx={{ 
        maxWidth: '1000px',
        mx: 'auto',
        bgcolor: '#070b15',
        borderRadius: '16px',
        height: 'calc(100vh - 180px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Chat Header */}
        <Box sx={{ 
          p: 2,
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ width: 48, height: 48 }}
            >
              AI
            </Avatar>
            <Box>
              <Typography fontWeight={500}>Family RV AI Agent</Typography>
              <Typography variant="body2" color="text.secondary">
                Ask me everything
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ 
              display: 'flex',
              alignItems: 'center',
              color: '#6B7280',
              fontSize: '14px',
              gap: 0.5 
            }}>
              Dec 15, 2024, 2:47:27 PM (Message:5)
            </Typography>
            <Chip 
              label="Positive" 
              color="success"
              size="small"
              sx={{ bgcolor: '#ECFDF5', color: '#10B981' }}
            />
          </Box>
        </Box>

        {/* Chat Messages */}
        <Box 
          ref={chatContainerRef}
          sx={{ 
            flex: 1,
            p: 3,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            bgcolor: '#F9FAFB',
          }}
        >
          {messages.map((message) => (
            message.type === 'bot' ? (
              <Box key={message.id} sx={{ display: 'flex', gap: 2, maxWidth: '70%' }}>
                <Avatar sx={{ width: 32, height: 32 }}>AI</Avatar>
                <Box>
                  <Box sx={{ 
                    bgcolor: 'white',
                    p: 2,
                    borderRadius: '12px 12px 12px 0',
                    mb: 0.5,
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}>
                    <Typography sx={{ color: '#111827' }}>{message.text}</Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    ml: 0.5
                  }}>
                    <Typography sx={{ color: '#6B7280', fontSize: '12px' }}>
                      {message.timestamp}
                    </Typography>
                    <Button
                      startIcon={<ContentCopyIcon sx={{ fontSize: 16 }} />}
                      onClick={() => copyText(message.text)}
                      sx={{ 
                        color: '#6B7280',
                        textTransform: 'none',
                        fontSize: '12px',
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
                      <ThumbUpIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ color: '#6B7280' }}
                    >
                      <ThumbDownIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box 
                key={message.id} 
                sx={{ 
                  alignSelf: 'flex-end',
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ 
                    bgcolor: '#1A83FF',
                    color: 'white',
                    p: 2,
                    borderRadius: '12px 12px 0 12px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}>
                    <Typography>{message.text}</Typography>
                  </Box>
                  <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                </Box>
                <Typography sx={{ 
                  color: '#6B7280', 
                  fontSize: '12px',
                  mt: 0.5,
                  mr: '48px' // Avatar width + gap
                }}>
                  {message.timestamp}
                </Typography>
              </Box>
            )
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', gap: 2, maxWidth: '70%' }}>
              <Avatar sx={{ width: 32, height: 32 }}>AI</Avatar>
              <Box sx={{ 
                bgcolor: 'white',
                p: 2,
                borderRadius: '12px 12px 12px 0',
                display: 'flex',
                gap: 1,
                alignItems: 'center'
              }}>
                <Box className="typing-dot" sx={{ 
                  width: 6, 
                  height: 6, 
                  bgcolor: '#6B7280',
                  borderRadius: '50%',
                  animation: 'typing 1s infinite',
                  '&:nth-of-type(2)': {
                    animationDelay: '0.2s'
                  },
                  '&:nth-of-type(3)': {
                    animationDelay: '0.4s'
                  },
                  '@keyframes typing': {
                    '0%, 100%': {
                      transform: 'translateY(0)'
                    },
                    '50%': {
                      transform: 'translateY(-4px)'
                    }
                  }
                }} />
                <Box className="typing-dot" sx={{ 
                  width: 6, 
                  height: 6, 
                  bgcolor: '#6B7280',
                  borderRadius: '50%',
                  animation: 'typing 1s infinite',
                  animationDelay: '0.2s'
                }} />
                <Box className="typing-dot" sx={{ 
                  width: 6, 
                  height: 6, 
                  bgcolor: '#6B7280',
                  borderRadius: '50%',
                  animation: 'typing 1s infinite',
                  animationDelay: '0.4s'
                }} />
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box sx={{ 
          p: 2,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          bgcolor: '#070b15'
        }}>
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            mb: 2
          }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                borderColor: '#E5E7EB',
                color: '#111827',
                '&:hover': {
                  borderColor: '#1A83FF',
                  bgcolor: 'transparent'
                }
              }}
            >
              Sales
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                borderColor: '#E5E7EB',
                color: '#111827',
                '&:hover': {
                  borderColor: '#1A83FF',
                  bgcolor: 'transparent'
                }
              }}
            >
              Services
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                borderColor: '#E5E7EB',
                color: '#111827',
                '&:hover': {
                  borderColor: '#1A83FF',
                  bgcolor: 'transparent'
                }
              }}
            >
              More
            </Button>
          </Box>

          <Box sx={{ 
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            bgcolor: '#0a0f1e',
            borderRadius: '100px',
            p: '8px 16px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="standard"
              multiline
              maxRows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ 
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                  color: '#ffffff',
                  padding: '4px 0',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.8)',
                  opacity: 1
                }
              }}
            />
            <IconButton 
              size="small"
              sx={{ 
                color: '#6B7280',
                '&:hover': {
                  color: '#1A83FF'
                }
              }}
            >
              <MicIcon />
            </IconButton>
            <IconButton 
              size="small"
              onClick={handleSend}
              sx={{ 
                bgcolor: '#1A83FF',
                color: 'white',
                '&:hover': {
                  bgcolor: '#1666CC'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}