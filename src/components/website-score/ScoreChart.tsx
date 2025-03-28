
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

  const config = {
    uiux: { color: "#22c55e" },
    speed: { color: "#eab308" },
    seo: { color: "#ef4444" },
  };

  return (
    <div className="mt-6 mb-8 text-black">
      <h3 className="text-xl font-bold mb-4">
        {getTranslatedText('Performance Analysis', 'تحليل الأداء')}
      </h3>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div style={{ width: '100%', height: 300 }}>
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout={language === 'ar' ? 'vertical' : 'horizontal'}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {language === 'ar' ? (
                  <>
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                  </>
                ) : (
                  <>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                  </>
                )}
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;
