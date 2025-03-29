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
  language: 'en' | 'ar';
}

const AnalysisResults = ({ 
  scores, 
  analysisComplete, 
  onRequestConsultation,
  language
}: AnalysisResultsProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          {getTranslatedText('Overall Score', 'النتيجة الإجمالية')}
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
            ? getTranslatedText('Excellent! Your website performs well across all key metrics.', 'ممتاز! يعمل موقعك بشكل جيد في جميع المقاييس الرئيسية.')
            : scores.total >= 70
            ? getTranslatedText('Good performance, but there\'s room for improvement in some areas.', 'أداء جيد، ولكن هناك مجال للتحسين في بعض المجالات.')
            : getTranslatedText('Your website needs significant improvements to meet modern standards.', 'يحتاج موقعك إلى تحسينات كبيرة لتلبية المعايير الحديثة.')}
        </p>
      </div>
      
      {/* Performance Chart */}
      <ScoreChart scores={scores} language={language} />
      
      {/* Individual Score Sections */}
      <div className="space-y-4">
        <ScoreSection 
          title={getTranslatedText('UI/UX Design (30%)', 'تصميم واجهة المستخدم (30٪)')} 
          score={scores.ui_ux} 
          color={scores.ui_ux >= 80 ? '#22c55e' : 
                 scores.ui_ux >= 70 ? '#eab308' : '#ef4444'} 
          language={language}
        />
        
        <ScoreSection 
          title={getTranslatedText('Website Speed (40%)', 'سرعة الموقع (40٪)')} 
          score={scores.speed} 
          color={scores.speed >= 80 ? '#22c55e' : 
                 scores.speed >= 70 ? '#eab308' : '#ef4444'} 
          language={language}
        />
        
        <ScoreSection 
          title={getTranslatedText('SEO Performance (30%)', 'أداء تحسين محركات البحث (30٪)')} 
          score={scores.seo} 
          color={scores.seo >= 80 ? '#22c55e' : 
                 scores.seo >= 70 ? '#eab308' : '#ef4444'} 
          language={language}
        />
      </div>
      
      {/* Performance Radar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
          {getTranslatedText('Detailed Performance Metrics', 'مقاييس الأداء التفصيلية')}
        </h3>
        <PerformanceRadar scores={scores} language={language} />
      </div>
      
      {/* Detailed Tips */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {getTranslatedText('Recommendations', 'التوصيات')}
          </h3>
          <div className="h-1 w-20 bg-[#FF5733] rounded-full"></div>
        </div>
        <div className="space-y-6">
          <DetailedTips scores={scores} language={language} />
        </div>
      </div>
      
      {/* Consultation CTA */}
      {scores.total < 70 && (
        <div className="bg-gradient-to-br from-[#FF5733]/10 to-[#FF5733]/5 p-8 rounded-lg border border-[#FF5733]/20 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {getTranslatedText('Need Help Improving Your Website?', 'هل تحتاج إلى مساعدة في تحسين موقعك؟')}
              </h3>
              <p className="text-gray-700 text-lg">
                {getTranslatedText('Our team of experts can help you address these issues and enhance your website\'s performance.', 'يمكن لفريق الخبراء لدينا مساعدتك في معالجة هذه المشكلات وتحسين أداء موقعك.')}
              </p>
            </div>
            <Button 
              onClick={onRequestConsultation} 
              className="w-full md:w-auto px-8 py-6 text-lg bg-[#FF5733] hover:bg-[#FF5733]/90 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {getTranslatedText('Get a Free Consultation', 'احصل على استشارة مجانية')}
            </Button>
          </div>
        </div>
      )}

      {/* Disclaimer Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">
          {getTranslatedText(
            'This tool provides insights but isn\'t perfect. Review results for accuracy and let us know if you spot any errors!',
            'توفر هذه الأداة رؤى ولكنها ليست مثالية. راجع النتائج للتأكد من دقتها وأخبرنا إذا لاحظت أي أخطاء!'
          )}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResults;
