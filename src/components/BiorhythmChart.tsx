import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { format } from 'date-fns';
import { useTheme } from '../hooks/useTheme';
import type { BiorhythmData } from '../types';

interface BiorhythmChartProps {
  data: BiorhythmData[];
}

export function BiorhythmChart({ data }: BiorhythmChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipBackground = isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255,255,255,0.95)';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
            stroke={textColor}
            tick={{ fill: textColor }}
            tickLine={{ stroke: textColor }}
          />
          <YAxis
            stroke={textColor}
            tick={{ fill: textColor }}
            tickLine={{ stroke: textColor }}
          />
          <Tooltip
            contentStyle={{
              background: tooltipBackground,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '8px',
              color: isDark ? '#fff' : '#000',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              fontSize: '14px',
              padding: '8px 12px',
            }}
            labelFormatter={(date) => format(new Date(date), 'MMMM d, yyyy')}
            itemStyle={{
              color: isDark ? '#fff' : '#000',
              fontSize: '12px',
              padding: '2px 0',
            }}
            labelStyle={{
              color: isDark ? '#fff' : '#000',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          />
          <ReferenceLine y={0} stroke={gridColor} strokeWidth={2} />
          <Line
            type="monotone"
            dataKey="physical"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Physical"
          />
          <Line
            type="monotone"
            dataKey="emotional"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Emotional"
          />
          <Line
            type="monotone"
            dataKey="intellectual"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Intellectual"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}