'use client';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Box, 
  Typography,
  Avatar,
  InputBase,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  chat: {
    id: number;
    conversation: string;
    dateTime: string;
    totalMessages: number;
  };
}

export default function ChatModal({ open, onClose, chat }: ChatModalProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        bgcolor: '#1A83FF',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>Chat #{chat.id}</Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
          {/* Chat messages area */}
          <Box sx={{ 
            flex: 1, 
            p: 3,
            overflowY: 'auto',
            bgcolor: '#F9FAFB'
          }}>
            {/* Example messages */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Bot message */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Avatar sx={{ bgcolor: '#1A83FF', width: 32, height: 32 }} />
                <Box sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: '12px 12px 12px 0',
                  maxWidth: '75%',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  <Typography>
                    Hello! How can I assist you today?
                  </Typography>
                </Box>
              </Box>

              {/* User message */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                alignItems: 'flex-start',
                alignSelf: 'flex-end'
              }}>
                <Box sx={{
                  bgcolor: '#1A83FF',
                  p: 2,
                  borderRadius: '12px 12px 0 12px',
                  maxWidth: '75%',
                  color: 'white',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  <Typography>
                    {chat.conversation}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#E5E7EB', width: 32, height: 32 }} />
              </Box>
            </Box>
          </Box>

          {/* Input area */}
          <Box sx={{ 
            p: 2, 
            borderTop: '1px solid #E5E7EB',
            bgcolor: 'white'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#F3F4F6',
              borderRadius: '100px',
              p: '8px 16px',
            }}>
              <InputBase
                placeholder="Type your message..."
                fullWidth
                sx={{
                  fontSize: '14px',
                  '& input::placeholder': {
                    color: '#6B7280',
                    opacity: 1
                  }
                }}
              />
              <IconButton 
                size="small" 
                sx={{ 
                  bgcolor: '#1A83FF',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#1666CC'
                  }
                }}
              >
                <SendIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}