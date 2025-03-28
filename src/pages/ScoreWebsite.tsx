
import React, { useState, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactDialog from '@/components/ContactDialog';
import { LanguageContext } from '@/components/Navbar';
import WebsiteAnalysisForm from '@/components/website-score/WebsiteAnalysisForm';
import AnalysisResults from '@/components/website-score/AnalysisResults';
import AnalysisLoadingIndicator from '@/components/website-score/AnalysisLoadingIndicator';
import { generateScores } from '@/utils/websiteScoreUtils';

interface ScoreData {
  ui_ux: number;
  speed: number;
  seo: number;
  total: number;
}

const ScoreWebsite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState<null | ScoreData>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { language } = useContext(LanguageContext);
  
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  // Handle form submission
  const onSubmit = async (url: string) => {
    setIsLoading(true);
    setAnalysisComplete(false);
    
    try {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate scores
      const generatedScores = generateScores(url);
      setScores(generatedScores);
      
      // Store scores in Supabase
      const { error } = await supabase.from('website_scores').insert({
        url: url,
        ui_ux_score: generatedScores.ui_ux,
        speed_score: generatedScores.speed,
        seo_score: generatedScores.seo,
        total_score: generatedScores.total
      });
      
      if (error) {
        console.error('Error storing scores:', error);
        toast({
          title: 'Error storing results',
          description: 'There was a problem saving your results.',
          variant: 'destructive',
        });
      }
      
      // Show consultation dialog for low scores
      if (generatedScores.total < 70) {
        setTimeout(() => {
          setContactDialogOpen(true);
        }, 2000);
      }
      
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Error analyzing website:', error);
      toast({
        title: 'Analysis Failed',
        description: 'There was a problem analyzing the website.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <Navbar />
      
      {/* Main content */}
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-center mb-2 cursor-highlight">
            {getTranslatedText('Score Your Website', 'قيم موقعك الإلكتروني')}
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            {getTranslatedText(
              'Our AI-powered tool analyzes your website\'s UI/UX, speed, and SEO performance to provide a comprehensive score and recommendations.',
              'تقوم أداتنا المدعومة بالذكاء الاصطناعي بتحليل واجهة المستخدم وسرعة وأداء تحسين محركات البحث لموقعك لتقديم نتيجة شاملة وتوصيات.'
            )}
          </p>
          
          {/* URL form */}
          <WebsiteAnalysisForm 
            onSubmit={onSubmit} 
            isLoading={isLoading}
            language={language as 'en' | 'ar'} 
          />
          
          {/* Loading indicator while analysis is being performed */}
          {isLoading && !scores && (
            <AnalysisLoadingIndicator language={language as 'en' | 'ar'} />
          )}
          
          {/* Results section */}
          {scores && (
            <AnalysisResults 
              scores={scores}
              analysisComplete={analysisComplete}
              onRequestConsultation={() => setContactDialogOpen(true)}
              language={language as 'en' | 'ar'}
            />
          )}
        </div>
      </div>
      
      <Footer />
      
      {/* Contact Dialog for consultation */}
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </div>
  );
};

export default ScoreWebsite;
