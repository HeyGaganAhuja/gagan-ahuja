import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

interface ScoreChartProps {
  scores: {
    ui_ux: number;
    speed: number;
    seo: number;
    total: number;
  };
  language: 'en' | 'ar';
}

const ScoreChart = ({ scores, language }: ScoreChartProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  // Transform scores into chart data format
  const data = [
    { 
      name: getTranslatedText('UI/UX', 'واجهة المستخدم'), 
      value: scores.ui_ux,
      color: scores.ui_ux >= 80 ? '#22c55e' : scores.ui_ux >= 70 ? '#eab308' : '#ef4444'
    },
    { 
      name: getTranslatedText('Speed', 'السرعة'), 
      value: scores.speed,
      color: scores.speed >= 80 ? '#22c55e' : scores.speed >= 70 ? '#eab308' : '#ef4444'
    },
    { 
      name: getTranslatedText('SEO', 'تحسين محركات البحث'), 
      value: scores.seo,
      color: scores.seo >= 80 ? '#22c55e' : scores.seo >= 70 ? '#eab308' : '#ef4444'
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-lg font-bold" style={{ color: payload[0].color }}>
            {payload[0].value}/100
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {payload[0].value >= 80 
              ? getTranslatedText('Excellent', 'ممتاز')
              : payload[0].value >= 70
              ? getTranslatedText('Good', 'جيد')
              : getTranslatedText('Needs Improvement', 'يحتاج إلى تحسين')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
        {getTranslatedText('Performance Breakdown', 'تحليل الأداء')}
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#4b5563', fontSize: 14 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fill: '#4b5563', fontSize: 14 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreChart;
