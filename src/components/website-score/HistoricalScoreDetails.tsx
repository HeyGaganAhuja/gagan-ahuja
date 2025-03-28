
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScoreSection from './ScoreSection';
import ScoreChart from './ScoreChart';
import PerformanceRadar from './PerformanceRadar';
import DetailedTips from './DetailedTips';

interface HistoricalScoreDetailsProps {
  score: {
    id: string;
    url: string;
    ui_ux_score: number;
    speed_score: number;
    seo_score: number;
    total_score: number;
    created_at: string;
  };
  language: 'en' | 'ar';
  onBack: () => void;
}

const HistoricalScoreDetails = ({ score, language, onBack }: HistoricalScoreDetailsProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  // Format the scores in the structure needed by existing components
  const formattedScores = {
    ui_ux: score.ui_ux_score,
    speed: score.speed_score,
    seo: score.seo_score,
    total: score.total_score
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-2xl font-bold text-black">
          {getTranslatedText(
            `Analysis Results for ${new URL(score.url).hostname}`,
            `نتائج تحليل ${new URL(score.url).hostname}`
          )}
        </h2>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-black">
          {getTranslatedText('Overall Score', 'النتيجة الإجمالية')}
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
          <div 
            className={`h-6 rounded-full flex items-center justify-center text-white font-medium ${
              score.total_score >= 80 ? 'bg-green-500' : 
              score.total_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`} 
            style={{ width: `${score.total_score}%` }}
          >
            {score.total_score}/100
          </div>
        </div>
        
        <p className="text-black mt-4">
          {score.total_score >= 80 
            ? getTranslatedText('Excellent! Your website performs well across all key metrics.', 'ممتاز! يعمل موقعك بشكل جيد في جميع المقاييس الرئيسية.')
            : score.total_score >= 70
            ? getTranslatedText('Good performance, but there\'s room for improvement in some areas.', 'أداء جيد، ولكن هناك مجال للتحسين في بعض المجالات.')
            : getTranslatedText('Your website needs significant improvements to meet modern standards.', 'يحتاج موقعك إلى تحسينات كبيرة لتلبية المعايير الحديثة.')}
        </p>
      </div>

      {/* Reuse existing components */}
      <ScoreChart scores={formattedScores} language={language} />
      
      <div className="space-y-4">
        <ScoreSection 
          title={getTranslatedText('UI/UX Design', 'تصميم واجهة المستخدم')} 
          score={score.ui_ux_score} 
          color={score.ui_ux_score >= 80 ? 'bg-green-500' : 
                score.ui_ux_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
          language={language}
        />
        
        <ScoreSection 
          title={getTranslatedText('Website Speed', 'سرعة الموقع')} 
          score={score.speed_score} 
          color={score.speed_score >= 80 ? 'bg-green-500' : 
                score.speed_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
          language={language}
        />
        
        <ScoreSection 
          title={getTranslatedText('SEO Performance', 'أداء تحسين محركات البحث')} 
          score={score.seo_score} 
          color={score.seo_score >= 80 ? 'bg-green-500' : 
                score.seo_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
          language={language}
        />
      </div>
      
      <PerformanceRadar scores={formattedScores} language={language} />
      <DetailedTips scores={formattedScores} language={language} />
    </div>
  );
};

export default HistoricalScoreDetails;
