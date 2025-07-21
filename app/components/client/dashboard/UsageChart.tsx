'use client';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data
const data = [
  { month: 'Jan', activeBots: 500, totalUsers: 300, thisMonthUsers: 200 },
  { month: 'Feb', activeBots: 50, totalUsers: 60, thisMonthUsers: 40 },
  { month: 'Mar', activeBots: 100, totalUsers: 80, thisMonthUsers: 60 },
  { month: 'Apr', activeBots: 50, totalUsers: 40, thisMonthUsers: 30 },
  { month: 'May', activeBots: 60, totalUsers: 50, thisMonthUsers: 40 },
  { month: 'Jun', activeBots: 70, totalUsers: 60, thisMonthUsers: 50 },
  { month: 'Jul', activeBots: 80, totalUsers: 70, thisMonthUsers: 60 },
  { month: 'Aug', activeBots: 90, totalUsers: 80, thisMonthUsers: 70 },
  { month: 'Sep', activeBots: 100, totalUsers: 90, thisMonthUsers: 80 },
  { month: 'Oct', activeBots: 110, totalUsers: 100, thisMonthUsers: 90 },
  { month: 'Nov', activeBots: 120, totalUsers: 110, thisMonthUsers: 100 },
  { month: 'Dec', activeBots: 130, totalUsers: 120, thisMonthUsers: 110 }
];

const metrics = [
  { key: 'activeBots', label: 'Active bots', color: '#00e5ff' },
  { key: 'totalUsers', label: 'Total users', color: '#3b82f6' },
  { key: 'thisMonthUsers', label: 'This month users', color: '#6366f1' }
];

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        bgcolor: '#141c31',
        p: 1.5,
        borderRadius: 1,
        boxShadow: '0 2px 10px rgba(0,229,255,0.1)',
        border: '1px solid rgba(0,229,255,0.2)'
      }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#fff' }}>{label}</Typography>
        {payload.map((item: any) => (
          <Box key={item.dataKey} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
            <Typography sx={{ fontSize: 13, color: '#fff' }}>
              {item.name}: {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const UsageChartComponent = () => {
  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: '#0a0f1e', 
      borderRadius: 2,
      border: '1px solid rgba(0, 229, 255, 0.2)',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: 'rgba(0, 229, 255, 0.4)',
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0,229,255,0.1)',
      },
    }}>
      <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 2, color: '#fff' }}>
        Agents usage, in simple way
      </Typography>

      {/* Legend */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 2,
        mb: 3
      }}>
        {metrics.map(metric => (
          <Box
            key={metric.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer'
            }}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: metric.color 
            }} />
            <Typography sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
              {metric.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Chart */}
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="rgba(255, 255, 255, 0.1)" 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {metrics.map(metric => (
              <Bar
                key={metric.key}
                dataKey={metric.key}
                fill={metric.color}
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

// Wrap the component with dynamic import and disable SSR
const UsageChart = dynamic(() => Promise.resolve(UsageChartComponent), {
  ssr: false
});

export default UsageChart;
