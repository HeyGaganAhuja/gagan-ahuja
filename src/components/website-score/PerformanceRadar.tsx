
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface PerformanceRadarProps {
  scores: any;
}

const PerformanceRadar = ({ scores }: PerformanceRadarProps) => {
  const metrics = [
    { subject: 'Mobile Friendliness', A: 80, B: scores.metrics?.uiUx?.mobileFriendly || 65 },
    { subject: 'Page Speed', A: 75, B: scores.metrics?.speed?.pageSpeed || 60 },
    { subject: 'Keyword Optimization', A: 85, B: scores.metrics?.seo?.keywordOptimization || 70 },
    { subject: 'Visual Design', A: 88, B: scores.metrics?.uiUx?.visualDesign || 75 },
    { subject: 'Content Quality', A: 82, B: scores.metrics?.seo?.contentQuality || 68 },
    { subject: 'Load Time', A: 75, B: scores.metrics?.speed?.loadTime || 62 },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metrics}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Industry Average"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
          />
          <Radar
            name="Your Website"
            dataKey="B"
            stroke="#FF5733"
            fill="#FF5733"
            fillOpacity={0.3}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceRadar;
