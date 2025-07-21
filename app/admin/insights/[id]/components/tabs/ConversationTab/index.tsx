'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DataTable, { Column } from '@/components/shared/table/DataTable';
import ChatModal from './modals/ChatModal';

interface ConversationData {
  id: number;
  dateTime: string;
  conversation: string;
  totalMessages: number;
}

const mockData: ConversationData[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  dateTime: '05/01/2025 14:30',
  conversation: 'I need a travel...',
  totalMessages: 468
}));

const columns: Column[] = [
  { id: 'id', label: '#', minWidth: 50 },
  { id: 'dateTime', label: 'Date Time', minWidth: 180 },
  { id: 'conversation', label: 'Conversations', minWidth: 200 },
  { id: 'totalMessages', label: 'Total messages', minWidth: 120 }
];

const ConversationTab = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<ConversationData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleQuickView = (chat: ConversationData) => {
    setSelectedChat(chat);
    setModalOpen(true);
  };

  const handleView = (chatId: number) => {
    router.push(`/admin/conversations/${chatId}`);
  };

  const actions = [
    {
      label: 'Quick View',
      type: 'button' as const,
      buttonStyle: {
        variant: 'contained',
        size: 'small',
        children: 'Quick View',
        sx: {
          bgcolor: '#1A83FF',
          borderRadius: '100px',
          textTransform: 'none',
          minWidth: '100px',
          height: '36px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            bgcolor: '#1666CC',
          },
        }
      }
    },
    {
      label: 'View',
      type: 'button' as const,
      buttonStyle: {
        variant: 'outlined',
        size: 'small',
        children: 'View',
        sx: {
          borderRadius: '100px',
          textTransform: 'none',
          borderColor: '#E5E7EB',
          color: '#1A83FF',
          minWidth: '80px',
          height: '36px',
          fontSize: '14px',
          fontWeight: 500,
          '&:hover': {
            borderColor: '#1A83FF',
            bgcolor: 'transparent',
          },
        }
      }
    }
  ] as const;

  const handleActionClick = (action: string, row: ConversationData) => {
    if (action === 'Quick View') {
      handleQuickView(row);
    } else if (action === 'View') {
      handleView(row.id);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        {/* Total Conversations */}
        <Box sx={{ 
          flex: 1, 
          bgcolor: 'white',
          p: 3,
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Typography sx={{ color: '#6B7280', fontSize: 14 }}>
            total conversations
          </Typography>
          <Typography sx={{ 
            color: '#1A83FF', 
            fontSize: 32,
            fontWeight: 600,
            my: 1
          }}>
            635
          </Typography>
          <Typography sx={{ 
            color: '#22C55E', 
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            +21.01%
            <TrendingUpIcon sx={{ fontSize: 16 }} />
          </Typography>
        </Box>
        
        {/* Last 30 Days */}
        <Box sx={{ 
          flex: 1, 
          bgcolor: 'white',
          p: 3,
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Typography sx={{ color: '#6B7280', fontSize: 14 }}>
            Last 30 days
          </Typography>
          <Typography sx={{ 
            color: '#FFB020', 
            fontSize: 32,
            fontWeight: 600,
            my: 1
          }}>
            635
          </Typography>
          <Typography sx={{ 
            color: '#22C55E', 
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            +21.01%
            <TrendingUpIcon sx={{ fontSize: 16 }} />
          </Typography>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        gap: 2
      }}>
        <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
          <TextField
            placeholder="Search client"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '100px',
                bgcolor: 'white',
                height: '45px',
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6B7280' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="05 Jan, 2025"
            sx={{ 
              width: '200px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '100px',
                bgcolor: 'white',
                height: '45px',
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon sx={{ color: '#6B7280' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#1A83FF',
            borderRadius: '100px',
            textTransform: 'none',
            height: '45px',
            px: 3,
            '&:hover': {
              bgcolor: '#1666CC',
            },
          }}
        >
          Export Chat
        </Button>
      </Box>

      {/* Table */}
      <DataTable 
        columns={columns}
        rows={mockData}
        // actions={actions}
        // onActionClick={handleActionClick}
      />

      {/* Chat Modal */}
      {selectedChat && (
        <ChatModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          chatData={selectedChat}
        />
      )}
    </Box>
  );
};

export default ConversationTab;