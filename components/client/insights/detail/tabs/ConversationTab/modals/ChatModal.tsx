'use client';
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  chatData: any;
}

export default function ChatModal({ open, onClose, chatData }: ChatModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chat-modal"
      aria-describedby="chat-conversation-view"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          bgcolor: '#1A83FF',
          color: 'white'
        }}>
          <Typography variant="h6">Chat Details</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Chat Content */}
        <Box sx={{ height: '400px', overflow: 'auto', p: 2, bgcolor: '#F9FAFB' }}>
          {/* Sample Messages */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Bot Message */}
            <Box sx={{ display: 'flex', gap: 1, maxWidth: '80%' }}>
              <Box sx={{ 
                bgcolor: 'white', 
                p: 2, 
                borderRadius: '12px 12px 12px 0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <Typography>Hello! How can I help you today?</Typography>
              </Box>
            </Box>

            {/* User Message */}
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              maxWidth: '80%', 
              marginLeft: 'auto',
              justifyContent: 'flex-end'
            }}>
              <Box sx={{ 
                bgcolor: '#1A83FF', 
                color: 'white',
                p: 2, 
                borderRadius: '12px 12px 0 12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <Typography>{chatData?.conversation || 'I need a travel...'}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB' }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            alignItems: 'center'
          }}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '100px',
                  bgcolor: '#F3F4F6'
                }
              }}
            />
            <IconButton 
              sx={{ 
                bgcolor: '#1A83FF', 
                color: 'white',
                '&:hover': { bgcolor: '#1666CC' }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}