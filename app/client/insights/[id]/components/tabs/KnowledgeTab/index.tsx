'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function KnowledgeTab() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addKnowledgeAnchor, setAddKnowledgeAnchor] = useState<null | HTMLElement>(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);

  const handleAddKnowledgeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddKnowledgeAnchor(event.currentTarget);
  };

  const handleAddKnowledgeClose = () => {
    setAddKnowledgeAnchor(null);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreMenuAnchor(null);
  };

  const addKnowledgeOptions = [
    'Add file',
    'Add text',
    'Add Q&A',
    'Add website',
    'Add table',
    'Import table',
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Section with white background */}
      <Box sx={{ 
        bgcolor: 'white',
        borderRadius: '20px',
        p: 3,
        mb: 3,
      }}>
        {/* Header with search and add button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2,
          mb: 3,
        }}>
          <Typography variant="h6" fontWeight="normal" color="#111827" flex={1}>
            Enter knowledge for "Family RV Customer Support"
          </Typography>
          <Button
            onClick={handleAddKnowledgeClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              bgcolor: '#EEF2FF',
              color: '#1A83FF',
              borderRadius: '100px',
              textTransform: 'none',
              px: 3,
              py: 1.5,
              height: '48px',
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: '#E5E7EB',
              },
            }}
          >
            Add knowledge
          </Button>
        </Box>

        {/* Files List */}
        <Box>
          {/* File List Item 1 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid #F3F4F6'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TableChartOutlinedIcon sx={{ color: '#6B7280' }} />
              <Typography sx={{ color: '#6B7280' }}>
                Family inventory - Hoot 15144 Default 1734296285.csv
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#ECFDF5',
                  color: '#10B981',
                  px: 2,
                  py: 0.5,
                  borderRadius: '16px',
                  fontSize: '0.875rem',
                }}
              >
                Ready
              </Box>
              <IconButton size="small">
                <EditIcon sx={{ color: '#1A83FF', fontSize: 20 }} />
              </IconButton>
              <IconButton size="small">
                <MoreVertIcon sx={{ color: '#6B7280' }} />
              </IconButton>
            </Box>
          </Box>

          {/* File List Item 2 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FolderOutlinedIcon sx={{ color: '#6B7280' }} />
              <Typography sx={{ color: '#6B7280' }}>
                Family inventory - Hoot 15144 Default 1734296285.csv
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreVertIcon sx={{ color: '#6B7280' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Inventory feed URL Section */}
      <Box sx={{ 
        bgcolor: 'black',
        borderRadius: '15px',
        p: 3,
        mb: 3,
      }}>
        <Typography sx={{ color: 'white', mb: 2, fontSize: '1.1rem' }}>
          Inventory feed URL
        </Typography>
        <Typography sx={{ color: '#9CA3AF', mb: 1.5, fontSize: '0.875rem' }}>
          Enter URL
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Inventory feed URL"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#111827',
                borderRadius: '8px',
                color: 'white',
                '& fieldset': {
                  borderColor: '#374151',
                },
                '&:hover fieldset': {
                  borderColor: '#4B5563',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1A83FF',
                },
              },
              '& input::placeholder': {
                color: '#6B7280',
                opacity: 1,
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: '#1A83FF',
              borderRadius: '100px',
              textTransform: 'none',
              px: 4,
              '&:hover': {
                bgcolor: '#1666CC',
              },
            }}
          >
            Feed
          </Button>
        </Box>

        {/* Feed Items */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
          }}>
            <Typography>Family inventory - Hoot 15144 Default 1734296285.csv</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#065F46',
                  color: '#34D399',
                  px: 2,
                  py: 0.5,
                  borderRadius: '16px',
                  fontSize: '0.875rem',
                }}
              >
                Ready
              </Box>
              <Button
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: '#374151',
                  textTransform: 'none',
                  borderRadius: '100px',
                  '&:hover': {
                    bgcolor: '#4B5563',
                  },
                }}
              >
                View
              </Button>
              <IconButton size="small">
                <EditIcon sx={{ color: '#1A83FF', fontSize: 20 }} />
              </IconButton>
              <IconButton size="small" onClick={handleMoreClick}>
                <MoreVertIcon sx={{ color: '#6B7280' }} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#6B7280',
          }}>
            <Typography>Family inventory - Hoot 15144 Default 1734296285.csv</Typography>
            <IconButton size="small" onClick={handleMoreClick}>
              <MoreVertIcon sx={{ color: '#6B7280' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* File Upload Section */}
      <Box
        sx={{
          bgcolor: 'white',
          border: '2px dashed #1A83FF',
          borderRadius: '20px',
          p: 6,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: '#EEF2FF',
            borderRadius: '100%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1,
          }}
        >
          <FileUploadOutlinedIcon sx={{ color: '#1A83FF', fontSize: 32 }} />
        </Box>
        <Typography sx={{ color: '#6B7280' }}>
          Drag your file(s) to start uploading
        </Typography>
        <Typography sx={{ color: '#6B7280' }}>
          OR
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: '#1A83FF',
            borderColor: '#1A83FF',
            borderRadius: '100px',
            textTransform: 'none',
            px: 3,
            '&:hover': {
              borderColor: '#1666CC',
              bgcolor: 'transparent',
            },
          }}
        >
          Browse files
        </Button>
      </Box>

      {/* Knowledge Options Menu */}
      <Menu
        anchorEl={addKnowledgeAnchor}
        open={Boolean(addKnowledgeAnchor)}
        onClose={handleAddKnowledgeClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
            minWidth: '200px',
            mt: 1,
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {addKnowledgeOptions.map((option) => (
          <MenuItem 
            key={option}
            onClick={handleAddKnowledgeClose}
            sx={{
              py: 1.5,
              color: '#6B7280',
              '&:hover': {
                bgcolor: '#F9FAFB',
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* More Options Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
            minWidth: '160px',
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem onClick={handleMoreClose}>Edit</MenuItem>
        <MenuItem onClick={handleMoreClose}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}