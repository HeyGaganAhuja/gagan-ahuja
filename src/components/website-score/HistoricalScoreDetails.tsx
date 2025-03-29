import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ScoreSection from './ScoreSection';
import ScoreChart from './ScoreChart';

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
  // Format the data for the ScoreChart component
  const chartData = {
    ui_ux: score.ui_ux_score,
    speed: score.speed_score,
    seo: score.seo_score,
    total: score.total_score
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-2 text-gray-300 hover:text-white hover:bg-[#333333]"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-100">Historical Analysis</h2>
      </div>
      
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-100">
              {score.url}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Analyzed on {formatDate(new Date(score.created_at))}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2 md:mt-0 text-gray-300 hover:text-white border-gray-700 hover:bg-[#333333] hover:border-gray-600"
            onClick={() => window.open(score.url, '_blank')}
          >
            Visit Website
            <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Overall Score</h4>
            <div 
              className={`text-lg font-bold ${
                score.total_score >= 80 ? 'text-green-600' :
                score.total_score >= 70 ? 'text-yellow-600' :
                'text-red-600'
              }`}
            >
              {score.total_score}/100
            </div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-4 mt-2">
            <div 
              className={`h-4 rounded-full ${
                score.total_score >= 80 ? 'bg-green-500' :
                score.total_score >= 70 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${score.total_score}%` }}
            />
          </div>
        </div>
        
        {/* Score Chart */}
        <div className="mb-8">
          <ScoreChart scores={chartData} />
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
      </div>
    </div>
  );
};

export default HistoricalScoreDetails;
