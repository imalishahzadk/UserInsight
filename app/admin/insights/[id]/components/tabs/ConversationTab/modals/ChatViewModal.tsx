'use client';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatView from '@/components/shared/chat-view/ChatView';

interface ChatViewModalProps {
  open: boolean;
  onClose: () => void;
  chatData: any;
}

export default function ChatViewModal({ open, onClose, chatData }: ChatViewModalProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '90vh',
          margin: '16px'
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
        Chat Details
        <IconButton
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <ChatView data={chatData} isModal />
      </DialogContent>
    </Dialog>
  );
}