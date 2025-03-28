
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
    total: score.total_score,
    // Generate simulated detailed metrics for historical scores
    metrics: {
      uiUx: {
        mobileFriendliness: Math.min(100, Math.max(50, score.ui_ux_score + Math.floor(Math.random() * 10) - 5)),
        colorContrast: Math.min(100, Math.max(50, score.ui_ux_score + Math.floor(Math.random() * 10) - 5)),
        navigation: Math.min(100, Math.max(50, score.ui_ux_score + Math.floor(Math.random() * 10) - 5)),
        imageOptimization: Math.min(100, Math.max(50, score.ui_ux_score + Math.floor(Math.random() * 10) - 5)),
        interactiveElements: Math.min(100, Math.max(50, score.ui_ux_score + Math.floor(Math.random() * 10) - 5))
      },
      seo: {
        metaTags: Math.min(100, Math.max(50, score.seo_score + Math.floor(Math.random() * 10) - 5)),
        headingStructure: Math.min(100, Math.max(50, score.seo_score + Math.floor(Math.random() * 10) - 5)),
        keywordPresence: Math.min(100, Math.max(50, score.seo_score + Math.floor(Math.random() * 10) - 5)),
        robotsTxt: Math.min(100, Math.max(50, score.seo_score + Math.floor(Math.random() * 10) - 5)),
        linkStructure: Math.min(100, Math.max(50, score.seo_score + Math.floor(Math.random() * 10) - 5))
      },
      speed: {
        pageLoadTime: Math.min(100, Math.max(50, score.speed_score + Math.floor(Math.random() * 10) - 5)),
        imageCompression: Math.min(100, Math.max(50, score.speed_score + Math.floor(Math.random() * 10) - 5)),
        codeMinification: Math.min(100, Math.max(50, score.speed_score + Math.floor(Math.random() * 10) - 5)),
        serverResponseTime: Math.min(100, Math.max(50, score.speed_score + Math.floor(Math.random() * 10) - 5))
      }
    }
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
          title={getTranslatedText('UI/UX Design (30%)', 'تصميم واجهة المستخدم (30٪)')} 
          score={score.ui_ux_score} 
          color={score.ui_ux_score >= 80 ? 'bg-green-500' : 
                score.ui_ux_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
          language={language}
        />
        
        <ScoreSection 
          title={getTranslatedText('Website Speed (40%)', 'سرعة الموقع (40٪)')} 
          score={score.speed_score} 
          color={score.speed_score >= 80 ? 'bg-green-500' : 
                score.speed_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
          language={language}
        />
        
        <ScoreSection 
          title={getTranslatedText('SEO Performance (30%)', 'أداء تحسين محركات البحث (30٪)')} 
          score={score.seo_score} 
          color={score.seo_score >= 80 ? 'bg-green-500' : 
                score.seo_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
          language={language}
        />
      </div>
      
      <PerformanceRadar scores={formattedScores} language={language} />
      <DetailedTips scores={formattedScores} language={language} />
      
      <div className="mt-6 text-sm text-gray-500">
        {getTranslatedText(
          `Analysis performed on ${new Date(score.created_at).toLocaleString()}`,
          `تم إجراء التحليل في ${new Date(score.created_at).toLocaleString()}`
        )}
      </div>
    </div>
  );
};

export default HistoricalScoreDetails;
