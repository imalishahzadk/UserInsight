'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import DataTable, { Column } from '@/components/shared/table/DataTable';
import LeadModal from './modals/LeadModal';

const columns: Column[] = [
  { 
    id: 'id', 
    label: '#', 
    minWidth: 50 
  },
  { 
    id: 'name', 
    label: 'Name', 
    minWidth: 200,
    format: (value: string, row: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src={row.avatar} sx={{ width: 32, height: 32 }} />
        <Typography sx={{ color: '#111827', fontWeight: 500 }}>{value}</Typography>
      </Box>
    )
  },
  { 
    id: 'email', 
    label: 'Email', 
    minWidth: 200 
  },
  { 
    id: 'date', 
    label: 'Date', 
    minWidth: 150 
  },
  { 
    id: 'phone', 
    label: 'Phone number', 
    minWidth: 150 
  }
];

// Mock data
const mockLeads = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: 'Adam Smith',
  avatar: '/path/to/avatar.jpg',
  email: 'adam12@gmail.com',
  date: '05 Jan, 2025',
  phone: '+1 (555) 867-5309'
}));

const LeadsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleView = (lead: any) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleMenuOption = (action: string) => {
    if (action === 'edit') {
      // Handle edit
    } else if (action === 'delete') {
      // Handle delete
    } else if (action === 'view') {
      handleView(selectedRow);
    }
    handleMenuClose();
  };

  const actions = [
    {
      label: 'View',
      type: 'button',
      buttonStyle: {
        variant: 'contained',
        children: 'View',
        sx: {
          bgcolor: '#1A83FF',
          borderRadius: '100px',
          textTransform: 'none',
          minWidth: '80px',
          height: '36px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            bgcolor: '#1666CC',
            boxShadow: 'none',
          },
        }
      }
    },
    {
      label: 'Menu',
      type: 'button',
      buttonStyle: {
        variant: 'text',
        children: <MoreVertIcon />,
        sx: {
          minWidth: 'auto',
          px: 1,
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.04)',
          },
        }
      }
    }
  ];

  const handleActionClick = (action: string, row: any) => {
    if (action === 'View') {
      handleView(row);
    } else if (action === 'Menu') {
      handleMenuClick(event as any, row);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Leads
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ color: '#6B7280' }}>Total leads</Typography>
          <Typography sx={{ fontWeight: 500 }}>1,000</Typography>
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
      </Box>

      {/* Table */}
      <DataTable 
        columns={columns}
        rows={mockLeads}
        // actions={actions}
        // onActionClick={handleActionClick}
      />

      {/* Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleMenuOption('edit')}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuOption('delete')}>Delete</MenuItem>
        <MenuItem onClick={() => handleMenuOption('view')}>View</MenuItem>
      </Menu>

      {/* Lead Modal */}
      {selectedLead && (
        <LeadModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          lead={selectedLead}
        />
      )}
    </Box>
  );
};

export default LeadsTab;