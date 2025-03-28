
import React from 'react';

interface ScoreSectionProps {
  title: string;
  score: number;
  color: string;
  language: 'en' | 'ar';
}

const ScoreSection = ({ title, score, color, language }: ScoreSectionProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className={`h-4 rounded-full ${color}`} 
        style={{ width: `${score}%` }}
      ></div>
    </div>
    <div className="flex justify-between mt-1">
      <span className="text-sm text-gray-500">
        {language === 'ar' ? 'ضعيف' : 'Poor'}
      </span>
      <span className="text-sm font-medium text-black">{score}/100</span>
      <span className="text-sm text-gray-500">
        {language === 'ar' ? 'ممتاز' : 'Excellent'}
      </span>
    </div>
  </div>
);

export default ScoreSection;
