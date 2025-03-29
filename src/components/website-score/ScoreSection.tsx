import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ScoreSectionProps {
  title: string;
  score: number;
  color: string;
}

const ScoreSection = ({ title, score, color }: ScoreSectionProps) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-900">
          {title}
        </h4>
        <span className="font-semibold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out" 
          style={{
            width: `${score}%`,
            backgroundColor: color
          }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {score >= 80 ? (
          'Excellent'
        ) : score >= 70 ? (
          'Good'
        ) : score >= 60 ? (
          'Needs Improvement'
        ) : (
          'Poor'
        )}
      </div>
    </div>
  );
};

export default ScoreSection;
