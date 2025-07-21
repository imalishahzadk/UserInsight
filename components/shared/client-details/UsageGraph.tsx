import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface UsageGraphProps {
  data: {
    day: string;
    hours: number;
    selected?: boolean;
  }[];
  totalTime: string;
}

export default function UsageGraph({ data, totalTime }: UsageGraphProps) {
  return (
    <Paper sx={{
      p: 3,
      borderRadius: 2,
      bgcolor: 'white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Typography variant="h6" fontWeight={500}>
          Usage Statistics
        </Typography>
        <Typography
          sx={{
            bgcolor: '#ECFDF5',
            color: '#10B981',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.875rem'
          }}
        >
          {totalTime}
        </Typography>
      </Box>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              ticks={[0, 2, 4, 6, 8]}
            />
            <Tooltip />
            <Bar 
              dataKey="hours" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.selected ? '#4285f4' : '#E5E7EB'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
