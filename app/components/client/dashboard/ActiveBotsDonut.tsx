'use client';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Active bots', value: 65, color: '#00e5ff' },
  { name: 'Total users', value: 35, color: '#3b82f6' }
];

export default function ActiveBotsDonut() {
  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: '#0a0f1e', 
      borderRadius: 2,
      height: '100%',
      border: '1px solid rgba(0, 229, 255, 0.2)',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: 'rgba(0, 229, 255, 0.4)',
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0,229,255,0.1)',
      },
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>
          Statistics
        </Typography>
      </Box>

      <Box sx={{ 
        height: 250, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Center Text */}
        <Box sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
          <Typography sx={{ 
            fontSize: 32, 
            fontWeight: 600,
            color: '#00e5ff',
            lineHeight: 1
          }}>
            54,000
          </Typography>
          <Typography sx={{ 
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            Active bots
          </Typography>
        </Box>

        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        mt: 2
      }}>
        {data.map((item, index) => (
          <Box 
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: item.color 
            }} />
            <Typography sx={{ 
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              {item.name} {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}