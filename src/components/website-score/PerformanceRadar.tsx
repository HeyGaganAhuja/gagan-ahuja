
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

interface PerformanceRadarProps {
  scores: {
    ui_ux: number;
    speed: number;
    seo: number;
    total: number;
  };
  language: 'en' | 'ar';
}

const PerformanceRadar = ({ scores, language }: PerformanceRadarProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  // Calculate performance metrics based on scores
  const calculateMetrics = () => {
    // UI/UX metrics
    const usability = Math.min(100, Math.max(0, scores.ui_ux * 1.05));
    const accessibility = Math.min(100, Math.max(0, scores.ui_ux * 0.95));
    
    // Speed metrics
    const loadTime = Math.min(100, Math.max(0, scores.speed * 1.1));
    const responsiveness = Math.min(100, Math.max(0, scores.speed * 0.9));
    
    // SEO metrics
    const contentQuality = Math.min(100, Math.max(0, scores.seo * 0.95));
    const techSEO = Math.min(100, Math.max(0, scores.seo * 1.05));
    
    return [
      {
        metric: getTranslatedText('Usability', 'سهولة الاستخدام'),
        value: usability
      },
      {
        metric: getTranslatedText('Accessibility', 'إمكانية الوصول'),
        value: accessibility
      },
      {
        metric: getTranslatedText('Load Time', 'وقت التحميل'),
        value: loadTime
      },
      {
        metric: getTranslatedText('Responsiveness', 'سرعة الاستجابة'),
        value: responsiveness
      },
      {
        metric: getTranslatedText('Content Quality', 'جودة المحتوى'),
        value: contentQuality
      },
      {
        metric: getTranslatedText('Technical SEO', 'تحسين محركات البحث التقني'),
        value: techSEO
      }
    ];
  };

  const config = {
    radar: { color: "hsl(var(--primary))" },
  };

  return (
    <div className="mt-6 mb-8 text-black">
      <h3 className="text-xl font-bold mb-4">
        {getTranslatedText('Detailed Performance Metrics', 'مقاييس الأداء المفصلة')}
      </h3>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div style={{ width: '100%', height: 350 }}>
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={calculateMetrics()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Radar
                  name={getTranslatedText('Score', 'النتيجة')}
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceRadar;
