import React from 'react';

interface ScoreSectionProps {
  title: string;
  score: number;
  color: string;
  language: 'en' | 'ar';
}

const ScoreSection = ({ title, score, color, language }: ScoreSectionProps) => {
  const getScoreLabel = (score: number) => {
    if (score >= 80) return language === 'ar' ? 'ممتاز' : 'Excellent';
    if (score >= 70) return language === 'ar' ? 'جيد' : 'Good';
    if (score >= 60) return language === 'ar' ? 'متوسط' : 'Fair';
    return language === 'ar' ? 'ضعيف' : 'Poor';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-xl font-bold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out`} 
          style={{ 
            width: `${score}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-500">
          {language === 'ar' ? 'ضعيف' : 'Poor'}
        </span>
        <span className="text-sm font-medium" style={{ color }}>
          {getScoreLabel(score)}
        </span>
        <span className="text-sm text-gray-500">
          {language === 'ar' ? 'ممتاز' : 'Excellent'}
        </span>
      </div>
    </div>
  );
};

export default ScoreSection;
