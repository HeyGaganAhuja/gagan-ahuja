
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

interface ScoreData {
  ui_ux: number;
  speed: number;
  seo: number;
  total: number;
}

interface ScoreChartProps {
  scores: ScoreData;
}

const ScoreChart = ({ scores }: ScoreChartProps) => {
  const data = [
    { name: 'UI/UX Design', value: scores.ui_ux, color: '#4299E1' },
    { name: 'Website Speed', value: scores.speed, color: '#48BB78' },
    { name: 'SEO Performance', value: scores.seo, color: '#F6AD55' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
        Performance Breakdown
      </h3>
      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}/100`, 'Score']}
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.15)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreChart;
