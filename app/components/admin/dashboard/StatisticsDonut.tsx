'use client';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import type { PieProps } from 'recharts';

const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false })
const Pie = dynamic(() => import('recharts').then((mod) => mod.Pie as any), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

const data = [
  { name: 'Users', value: 25, amount: 123000, color: '#4285f4' },
  { name: 'Active projects', value: 25, amount: 123000, color: '#9c27b0' },
  { name: 'Accounts', value: 25, amount: 123000, color: '#ea4335' },
  { name: 'Active projects', value: 25, amount: 123000, color: '#fbbc04' }
];

export default function StatisticsDonut() {
  return (
    <>
      <Box sx={{ 
        height: 280,
        position: 'relative',
        mb: 2
      }}>
        {/* Center Text */}
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1
        }}>
          <Typography sx={{ 
            fontSize: { xs: 24, md: 28 },
            fontWeight: 600,
            color: '#000'
          }}>
            $ 234,000
          </Typography>
          <Typography sx={{ 
            fontSize: 14,
            color: '#666'
          }}>
            Total Income
          </Typography>
        </Box>

        {/* Donut Chart */}
        <ResponsiveContainer>
          <PieChart>
            {/* <Pie
              data={data}
              innerRadius="75%"
              outerRadius="100%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie> */}
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Box sx={{ px: 2 }}>
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.5
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Box sx={{ 
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: item.color
              }} />
              <Typography sx={{ fontSize: 14 }}>
                {item.name}
              </Typography>
            </Box>
            <Typography sx={{ 
              fontSize: 14,
              color: '#666'
            }}>
              $ {(item.amount / 1000).toFixed(3)}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}