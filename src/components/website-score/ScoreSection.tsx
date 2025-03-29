
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ScoreSectionProps {
  title: string;
  score: number;
  color: string;
}

const ScoreSection = ({ title, score, color }: ScoreSectionProps) => {
  // Get the appropriate label based on score
  const getScoreLabel = () => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  // Get text color based on score
  const getTextColorClass = () => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-900">
          {title}
        </h4>
        <span className={`font-bold ${getTextColorClass()}`}>
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
      <div className="mt-2 text-sm font-medium flex justify-between items-center">
        <span className={getTextColorClass()}>
          {getScoreLabel()}
        </span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div 
              key={star} 
              className={`w-2 h-2 rounded-full ${
                score >= 50 + star * 10 ? color : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;
