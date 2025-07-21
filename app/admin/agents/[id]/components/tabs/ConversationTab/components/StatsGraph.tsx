'use client';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StatsGraphProps {
  color: string;
  data: { value: number }[];
}

export default function StatsGraph({ color, data }: StatsGraphProps) {
  return (
    <ResponsiveContainer width="100%" height={24}>
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}