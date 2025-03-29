
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScoreSection from './ScoreSection';
import ScoreChart from './ScoreChart';
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
  language: 'en';
}

const AnalysisResults = ({ 
  scores, 
  analysisComplete, 
  onRequestConsultation
}: AnalysisResultsProps) => {
  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          Overall Score
        </h3>
        <div className="w-full bg-gray-100 rounded-full h-8 mb-4 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out flex items-center justify-center text-white font-medium ${
              scores.total >= 80 ? 'bg-green-500' : 
              scores.total >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`} 
            style={{ width: `${scores.total}%` }}
          >
            {scores.total}/100
          </div>
        </div>
        
        <p className="text-lg text-gray-700">
          {scores.total >= 80 
            ? 'Excellent! Your website performs well across all key metrics.'
            : scores.total >= 70
            ? 'Good performance, but there\'s room for improvement in some areas.'
            : 'Your website needs significant improvements to meet modern standards.'}
        </p>
      </div>
      
      {/* Performance Chart */}
      <ScoreChart scores={scores} language="en" />
      
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
          Detailed Performance Metrics
        </h3>
        <PerformanceRadar scores={scores} language="en" />
      </div>
      
      {/* Detailed Tips */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Recommendations
          </h3>
          <div className="h-1 w-20 bg-[#FF5733] rounded-full"></div>
        </div>
        <div className="space-y-6">
          <DetailedTips scores={scores} language="en" />
        </div>
      </div>
      
      {/* Consultation CTA - Improved visibility */}
      {scores.total < 70 && (
        <div className="bg-gradient-to-br from-[#FF5733]/30 to-[#FF5733]/20 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Need Help Improving Your Website?
              </h3>
              <p className="text-gray-700 text-lg">
                Our team of experts can help you address these issues and enhance your website's performance.
              </p>
            </div>
            <Button 
              onClick={onRequestConsultation} 
              className="w-full md:w-auto px-8 py-6 text-lg bg-[#FF5733] hover:bg-[#FF5733]/90 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
            >
              Get a Free Consultation
            </Button>
          </div>
        </div>
      )}

      {/* Disclaimer Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">
          This tool provides insights but isn't perfect. Review results for accuracy and let us know if you spot any errors!
        </p>
      </div>
    </div>
  );
};

export default AnalysisResults;
