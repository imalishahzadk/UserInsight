'use client';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line as unknown  as React.ComponentType<any>), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis as unknown as React.ComponentType<any>), {
  ssr: false,
});
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis as unknown as React.ComponentType<any>), {
  ssr: false,
});
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip as unknown as React.ComponentType<any>), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

const data = [
  { name: 'Jan', totalAgents: 45, activeAgents: 30, clients: 20 },
  { name: 'Feb', totalAgents: 55, activeAgents: 35, clients: 25 },
  { name: 'Mar', totalAgents: 48, activeAgents: 32, clients: 28 },
  { name: 'Apr', totalAgents: 42, activeAgents: 28, clients: 22 },
  { name: 'May', totalAgents: 50, activeAgents: 35, clients: 30 },
  { name: 'Jun', totalAgents: 58, activeAgents: 40, clients: 35 },
  { name: 'Jul', totalAgents: 63, activeAgents: 45, clients: 38 },
  { name: 'Aug', totalAgents: 65, activeAgents: 48, clients: 40 },
  { name: 'Sep', totalAgents: 63, activeAgents: 46, clients: 42 },
  { name: 'Oct', totalAgents: 60, activeAgents: 44, clients: 40 },
  { name: 'Nov', totalAgents: 58, activeAgents: 42, clients: 38 },
  { name: 'Dec', totalAgents: 55, activeAgents: 40, clients: 35 }
];

const metrics = [
  { key: 'totalAgents', label: 'Total Agents', color: '#4285f4' },
  { key: 'activeAgents', label: 'Active Agents', color: '#34a853' },
  { key: 'clients', label: 'Clients', color: '#fbbc04' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        bgcolor: 'white',
        p: 1.5,
        borderRadius: 1,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>{label}</Typography>
        {payload.map((item: any) => (
          <Box key={item.dataKey} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
            <Typography sx={{ fontSize: 13 }}>
              {item.name}: {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

export default function StatisticsChart() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Legend */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 1,
        mb: 3,
        alignItems: 'center'
      }}>
        {metrics.map(metric => (
          <Box
            key={metric.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.5,
              borderRadius: 50,
              border: '1px solid #e0e0e0',
              fontSize: 14,
              color: 'text.secondary'
            }}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: metric.color 
            }} />
            {metric.label}
          </Box>
        ))}

        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 50,
            bgcolor: '#4285f4',
            color: 'white',
            fontSize: 14
          }}
        >
          Total agents: 232
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
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
              stroke="#f0f0f0" 
            />
        
<XAxis
  dataKey="name"
  axisLine={false}
  tickLine={false}
  tick={{ fill: '#666', fontSize: 12 }}
/>

<YAxis
  axisLine={false}
  tickLine={false}
  tick={{ fill: '#666', fontSize: 12 }}
/>

            <Tooltip content={<CustomTooltip />} />
            
            {metrics.map(metric => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                stroke={metric.color}
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}