'use client';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  timeFilter?: boolean;
  options?: boolean;
  className?: string;
}

export default function ChartCard({ 
  title, 
  subtitle, 
  children,
  timeFilter = false,
  options = false,
  className
}: ChartCardProps) {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: '16px',
        p: 3,
        height: '100%',
        minHeight: 480,
        display: 'flex',
        flexDirection: 'column'
      }}
      className={className}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Box>
          <Typography sx={{ 
            fontSize: 15,
            fontWeight: 500,
            mb: 0.5
          }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ 
              color: '#666',
              fontSize: 13
            }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          {timeFilter && (
            <Select
              size="small"
              defaultValue="This month"
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                minWidth: 120,
                fontSize: 14
              }}
            >
              <MenuItem value="This month">This month</MenuItem>
              <MenuItem value="Last month">Last month</MenuItem>
              <MenuItem value="This year">This year</MenuItem>
            </Select>
          )}
          
          {options && (
            <MoreHorizIcon 
              sx={{ 
                color: '#666',
                cursor: 'pointer'
              }} 
            />
          )}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ 
        flex: 1,
        position: 'relative',
        minHeight: 0 // This is important for the chart to fit
      }}>
        {children}
      </Box>
    </Box>
  );
}