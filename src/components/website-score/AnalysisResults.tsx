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

  // Determine overall performance status
  const getPerformanceStatus = () => {
    if (scores.total >= 80) return 'success';
    if (scores.total >= 70) return 'warning';
    return 'critical';
  };

  const performanceStatus = getPerformanceStatus();

  return (
    <div className={`transition-all duration-500 ${analysisComplete ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">
            {getTranslatedText('Website Analysis Results', 'نتائج تحليل الموقع')}
          </h2>
          <div className="flex items-center text-green-600">
            <Check className="mr-1" size={18} />
            <span>{getTranslatedText('Complete', 'مكتمل')}</span>
          </div>
        </div>
        
        {/* Overall Score Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-black">
            {getTranslatedText('Overall Score', 'النتيجة الإجمالية')}
          </h3>
          
          {/* Score Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
            <div 
              className={`h-full flex items-center justify-center text-white font-semibold transition-all duration-300 ${
                performanceStatus === 'success' ? 'bg-green-500' : 
                performanceStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
              style={{ width: `${scores.total}%` }}
            >
              {scores.total}/100
            </div>
          </div>
          
          {/* Performance Status Message */}
          <p className={`text-base font-medium ${
            performanceStatus === 'success' ? 'text-green-700' : 
            performanceStatus === 'warning' ? 'text-yellow-700' : 'text-red-700'
          }`}>
            {scores.total >= 80 
              ? getTranslatedText('Excellent! Your website performs well across all key metrics.', 'ممتاز! يعمل موقعك بشكل جيد في جميع المقاييس الرئيسية.')
              : scores.total >= 70
              ? getTranslatedText('Good performance, but there\'s room for improvement in some areas.', 'أداء جيد، ولكن هناك مجال للتحسين في بعض المجالات.')
              : getTranslatedText('Your website needs significant improvements to meet modern standards.', 'يحتاج موقعك إلى تحسينات كبيرة لتلبية المعايير الحديثة.')}
          </p>
        </div>
        
        {/* Visual Performance Chart */}
        <ScoreChart scores={scores} language={language} />
        
        {/* Detailed Performance Sections */}
        <div className="space-y-4">
          <ScoreSection 
            title={getTranslatedText('UI/UX Design (30%)', 'تصميم واجهة المستخدم (30٪)')} 
            score={scores.ui_ux} 
            color={scores.ui_ux >= 80 ? 'bg-green-500' : 
                   scores.ui_ux >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
            language={language}
          />
          
          <ScoreSection 
            title={getTranslatedText('Website Speed (40%)', 'سرعة الموقع (40٪)')} 
            score={scores.speed} 
            color={scores.speed >= 80 ? 'bg-green-500' : 
                   scores.speed >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
            language={language}
          />
          
          <ScoreSection 
            title={getTranslatedText('SEO Performance (30%)', 'أداء تحسين محركات البحث (30٪)')} 
            score={scores.seo} 
            color={scores.seo >= 80 ? 'bg-green-500' : 
                   scores.seo >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
            language={language}
          />
        </div>
        
        {/* Performance Radar Chart */}
        <PerformanceRadar scores={scores} language={language} />
        
        {/* Detailed Improvement Tips */}
        <DetailedTips scores={scores} language={language} />
        
        {/* Consultation Section for Low-Performing Websites */}
        {scores.total < 70 && (
          <div className="p-6 bg-primary/10 rounded-lg space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2 text-black">
                {getTranslatedText('Need Help Improving Your Website?', 'هل تحتاج إلى مساعدة في تحسين موقعك؟')}
              </h3>
              <p className="text-gray-700 mb-4">
                {getTranslatedText('Our team of experts can help you address these issues and enhance your website\'s performance.', 'يمكن لفريق الخبراء لدينا مساعدتك في معالجة هذه المشكلات وتحسين أداء موقعك.')}
              </p>
            </div>
            <Button onClick={onRequestConsultation} className="w-full">
              {getTranslatedText('Get a Free Consultation', 'احصل على استشارة مجانية')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;
