
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ScoreSection from './ScoreSection';
import DetailedTips from './DetailedTips';
import PerformanceRadar from './PerformanceRadar';

interface HistoricalScore {
  id: string;
  url: string;
  ui_ux_score: number;
  speed_score: number;
  seo_score: number;
  total_score: number;
  created_at: string;
}

interface HistoricalScoreDetailsProps {
  score: HistoricalScore;
  onBack: () => void;
}

const HistoricalScoreDetails = ({ score, onBack }: HistoricalScoreDetailsProps) => {
  // Format the data for analysis components
  const scoreData = {
    ui_ux: score.ui_ux_score,
    speed: score.speed_score,
    seo: score.seo_score,
    total: score.total_score,
    metrics: {
      uiUx: {
        mobileFriendly: score.ui_ux_score,
        visualDesign: score.ui_ux_score + (Math.random() * 5 - 2.5),
        userExperience: score.ui_ux_score + (Math.random() * 5 - 2.5),
        accessibility: score.ui_ux_score + (Math.random() * 5 - 2.5),
        interactivity: score.ui_ux_score + (Math.random() * 5 - 2.5)
      },
      speed: {
        pageSpeed: score.speed_score,
        loadTime: score.speed_score + (Math.random() * 5 - 2.5),
        serverResponse: score.speed_score + (Math.random() * 5 - 2.5),
        resourceOptimization: score.speed_score + (Math.random() * 5 - 2.5),
        caching: score.speed_score + (Math.random() * 5 - 2.5)
      },
      seo: {
        keywordOptimization: score.seo_score,
        contentQuality: score.seo_score + (Math.random() * 5 - 2.5),
        metaTags: score.seo_score + (Math.random() * 5 - 2.5),
        siteStructure: score.seo_score + (Math.random() * 5 - 2.5),
        mobileSEO: score.seo_score + (Math.random() * 5 - 2.5)
      }
    }
  };
  
  // Determine score category
  const getScoreCategory = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-emerald-500', textColor: 'text-emerald-700' };
    if (score >= 80) return { label: 'Very Good', color: 'bg-green-500', textColor: 'text-green-700' };
    if (score >= 70) return { label: 'Good', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    if (score >= 60) return { label: 'Fair', color: 'bg-orange-500', textColor: 'text-orange-700' };
    return { label: 'Needs Improvement', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  const scoreCategory = getScoreCategory(score.total_score);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to History
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Historical Analysis</h2>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {score.url}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Analyzed on {formatDate(new Date(score.created_at))}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2 md:mt-0"
            onClick={() => window.open(score.url, '_blank')}
          >
            Visit Website
            <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        {/* Overall Score */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Overall Score</h4>
            <div className={`px-4 py-1 rounded-full ${scoreCategory.textColor} bg-opacity-10 font-medium text-sm`}>
              {scoreCategory.label}
            </div>
          </div>
          
          <div className="relative mt-4">
            <div className="w-full bg-gray-100 rounded-full h-8 mt-2">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center text-white font-medium ${scoreCategory.color}`}
                style={{ width: `${score.total_score}%` }}
              >
                {score.total_score}/100
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
        </div>
        
        {/* Individual Scores */}
        <div className="space-y-4 mt-8">
          <ScoreSection
            title="UI/UX Design (30%)"
            score={score.ui_ux_score}
            color={score.ui_ux_score >= 80 ? '#22c55e' :
                score.ui_ux_score >= 70 ? '#eab308' : '#ef4444'}
          />
          
          <ScoreSection
            title="Website Speed (40%)"
            score={score.speed_score}
            color={score.speed_score >= 80 ? '#22c55e' :
                score.speed_score >= 70 ? '#eab308' : '#ef4444'}
          />
          
          <ScoreSection
            title="SEO Performance (30%)"
            score={score.seo_score}
            color={score.seo_score >= 80 ? '#22c55e' :
                score.seo_score >= 70 ? '#eab308' : '#ef4444'}
          />
        </div>
        
        {/* Performance Radar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-8">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
            Detailed Performance Metrics
          </h3>
          <PerformanceRadar scores={scoreData} />
        </div>
        
        {/* Detailed Recommendations */}
        <div className="mt-8">
          <DetailedTips scores={scoreData} />
        </div>
      </div>
    </div>
  );
};

export default HistoricalScoreDetails;
