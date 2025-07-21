'use client';
import { Box, Typography, Modal, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  lead: any;
}

export default function LeadModal({ open, onClose, lead }: LeadModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="lead-modal"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
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
          <Typography variant="h6">Lead Details</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              src={lead.avatar}
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography variant="h6">{lead.name}</Typography>
              <Typography sx={{ color: '#6B7280' }}>{lead.email}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography sx={{ color: '#6B7280', fontSize: 14, mb: 0.5 }}>
                Phone Number
              </Typography>
              <Typography>{lead.phone}</Typography>
            </Box>

            <Box>
              <Typography sx={{ color: '#6B7280', fontSize: 14, mb: 0.5 }}>
                Date
              </Typography>
              <Typography>{lead.date}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}