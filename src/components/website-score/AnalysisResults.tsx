
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScoreSection from './ScoreSection';
import PerformanceRadar from './PerformanceRadar';
import DetailedTips from './DetailedTips';

interface ScoreData {
  ui_ux: number;
  speed: number;
  seo: number;
  total: number;
  metrics?: any;
}

interface AnalysisResultsProps {
  scores: ScoreData;
  analysisComplete: boolean;
  onRequestConsultation: () => void;
}

const AnalysisResults = ({ 
  scores, 
  analysisComplete, 
  onRequestConsultation
}: AnalysisResultsProps) => {
  // Calculate total score based on weighted averages
  const totalScore = Math.round(
    (scores.ui_ux * 0.3) + // UI/UX is 30%
    (scores.speed * 0.4) + // Speed is 40%
    (scores.seo * 0.3)     // SEO is 30%
  );

  const getScoreCategory = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-emerald-500', textColor: 'text-emerald-700' };
    if (score >= 80) return { label: 'Very Good', color: 'bg-green-500', textColor: 'text-green-700' };
    if (score >= 70) return { label: 'Good', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    if (score >= 60) return { label: 'Fair', color: 'bg-orange-500', textColor: 'text-orange-700' };
    return { label: 'Needs Improvement', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  const scoreCategory = getScoreCategory(totalScore);

  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Overall Website Score
          </h3>
          <div className={`px-4 py-1 rounded-full ${scoreCategory.textColor} bg-opacity-10 font-medium text-sm`}>
            {scoreCategory.label}
          </div>
        </div>

        <div className="relative">
          <div className="w-full bg-gray-100 rounded-full h-8 mb-4 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center text-white font-medium ${scoreCategory.color}`}
              style={{ 
                width: `${totalScore}%`,
                boxShadow: '0 0 15px rgba(0,0,0,0.1) inset'
              }}
            >
              {totalScore}/100
            </div>
          </div>
          
          {/* Score markers */}
          <div className="absolute top-full left-0 w-full flex justify-between px-2 mt-1 text-xs text-gray-500">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-lg text-gray-700 mb-4">
            {totalScore >= 90 
              ? 'Outstanding! Your website excels in all key areas and provides an exceptional user experience.'
              : totalScore >= 80
              ? 'Excellent performance! Your website performs very well across most metrics with minor room for improvement.'
              : totalScore >= 70
              ? 'Good performance, but there\'s room for improvement in some key areas to enhance user experience.'
              : totalScore >= 60
              ? 'Your website needs attention in several areas to meet modern web standards.'
              : 'Your website requires significant improvements to provide a better user experience and meet industry standards.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${scores.ui_ux >= 70 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-700">UI/UX Design</p>
                <p className="text-xs text-gray-500">30% weight</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${scores.speed >= 70 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-700">Website Speed</p>
                <p className="text-xs text-gray-500">40% weight</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${scores.seo >= 70 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-700">SEO Performance</p>
                <p className="text-xs text-gray-500">30% weight</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Individual Score Sections */}
      <div className="space-y-4">
        <ScoreSection 
          title="UI/UX Design (30%)" 
          score={scores.ui_ux} 
          color={scores.ui_ux >= 80 ? '#22c55e' : 
                 scores.ui_ux >= 70 ? '#eab308' : '#ef4444'} 
        />
        
        <ScoreSection 
          title="Website Speed (40%)" 
          score={scores.speed} 
          color={scores.speed >= 80 ? '#22c55e' : 
                 scores.speed >= 70 ? '#eab308' : '#ef4444'} 
        />
        
        <ScoreSection 
          title="SEO Performance (30%)" 
          score={scores.seo} 
          color={scores.seo >= 80 ? '#22c55e' : 
                 scores.seo >= 70 ? '#eab308' : '#ef4444'} 
        />
      </div>
      
      {/* Performance Radar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
          Detailed Performance Metrics
        </h3>
        <PerformanceRadar scores={{
          ...scores,
          metrics: {
            uiUx: {
              mobileFriendly: 73,
              visualDesign: 75,
              userExperience: 73,
              accessibility: 72,
              interactivity: 74
            },
            speed: {
              pageSpeed: 74,
              loadTime: 73,
              serverResponse: 75,
              resourceOptimization: 74,
              caching: 74
            },
            seo: {
              keywordOptimization: 77,
              contentQuality: 78,
              metaTags: 76,
              siteStructure: 77,
              mobileSEO: 77
            }
          }
        }} />
      </div>
      
      {/* Detailed Tips */}
      <DetailedTips scores={scores} />
      
      {/* Consultation CTA */}
      {totalScore < 80 && (
        <div className="bg-gradient-to-br from-[#FF5733]/20 to-[#FF5733]/10 p-8 rounded-xl shadow-lg mb-4 border border-[#FF5733]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Want to Improve Your Score?
              </h3>
              <p className="text-gray-700 text-lg">
                Our experts can help optimize your website's performance, enhance user experience, and boost your online presence.
              </p>
            </div>
            <Button 
              onClick={onRequestConsultation} 
              className="w-full md:w-auto px-8 py-6 text-lg bg-[#FF5733] hover:bg-[#FF5733]/90 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
            >
              Get Expert Consultation
            </Button>
          </div>
        </div>
      )}

      {/* Disclaimer Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">
          Our analysis is based on industry standards and best practices. Results may vary based on specific requirements and contexts.
        </p>
      </div>
    </div>
  );
};

export default AnalysisResults;
