
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScoreSection from './ScoreSection';

interface ScoreData {
  ui_ux: number;
  speed: number;
  seo: number;
  total: number;
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
    <div className={`transition-all duration-500 ${analysisComplete ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {getTranslatedText('Website Analysis Results', 'نتائج تحليل الموقع')}
          </h2>
          <div className="flex items-center text-green-600">
            <Check className="mr-1" size={18} />
            <span>{getTranslatedText('Complete', 'مكتمل')}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-black">
            {getTranslatedText('Overall Score', 'النتيجة الإجمالية')}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
            <div 
              className={`h-6 rounded-full flex items-center justify-center text-white font-medium ${
                scores.total >= 80 ? 'bg-green-500' : 
                scores.total >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
              style={{ width: `${scores.total}%` }}
            >
              {scores.total}/100
            </div>
          </div>
          
          <p className="text-black mt-4">
            {scores.total >= 80 
              ? getTranslatedText('Excellent! Your website performs well across all key metrics.', 'ممتاز! يعمل موقعك بشكل جيد في جميع المقاييس الرئيسية.')
              : scores.total >= 70
              ? getTranslatedText('Good performance, but there\'s room for improvement in some areas.', 'أداء جيد، ولكن هناك مجال للتحسين في بعض المجالات.')
              : getTranslatedText('Your website needs significant improvements to meet modern standards.', 'يحتاج موقعك إلى تحسينات كبيرة لتلبية المعايير الحديثة.')}
          </p>
        </div>
        
        <div className="space-y-4">
          <ScoreSection 
            title={getTranslatedText('UI/UX Design', 'تصميم واجهة المستخدم')} 
            score={scores.ui_ux} 
            color={scores.ui_ux >= 80 ? 'bg-green-500' : 
                   scores.ui_ux >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
            language={language}
          />
          
          <ScoreSection 
            title={getTranslatedText('Website Speed', 'سرعة الموقع')} 
            score={scores.speed} 
            color={scores.speed >= 80 ? 'bg-green-500' : 
                   scores.speed >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
            language={language}
          />
          
          <ScoreSection 
            title={getTranslatedText('SEO Performance', 'أداء تحسين محركات البحث')} 
            score={scores.seo} 
            color={scores.seo >= 80 ? 'bg-green-500' : 
                   scores.seo >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
            language={language}
          />
        </div>
        
        {scores.total < 70 && (
          <div className="mt-8 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-2 text-black">
              {getTranslatedText('Need Help Improving Your Website?', 'هل تحتاج إلى مساعدة في تحسين موقعك؟')}
            </h3>
            <p className="mb-4 text-black">
              {getTranslatedText('Our team of experts can help you address these issues and enhance your website\'s performance.', 'يمكن لفريق الخبراء لدينا مساعدتك في معالجة هذه المشكلات وتحسين أداء موقعك.')}
            </p>
            <Button onClick={onRequestConsultation}>
              {getTranslatedText('Get a Free Consultation', 'احصل على استشارة مجانية')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;
