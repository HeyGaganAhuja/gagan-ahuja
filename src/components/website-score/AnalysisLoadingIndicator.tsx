
import React from 'react';
import { Loader2 } from 'lucide-react';

interface AnalysisLoadingIndicatorProps {
  language: 'en' | 'ar';
}

const AnalysisLoadingIndicator = ({ language }: AnalysisLoadingIndicatorProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg font-medium">
        {getTranslatedText('Analyzing your website...', 'جارٍ تحليل موقعك الإلكتروني...')}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        {getTranslatedText('This may take a moment', 'قد يستغرق هذا لحظة')}
      </p>
    </div>
  );
};

export default AnalysisLoadingIndicator;
