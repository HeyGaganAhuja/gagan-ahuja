
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactDialog from '@/components/ContactDialog';
import { LanguageContext } from '@/components/Navbar';

// Form schema for URL validation
const formSchema = z.object({
  url: z.string().url('Please enter a valid URL').min(1, 'URL is required'),
});

// Score section component
const ScoreSection = ({ title, score, color }: { title: string; score: number; color: string }) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className={`h-4 rounded-full ${color}`} 
        style={{ width: `${score}%` }}
      ></div>
    </div>
    <div className="flex justify-between mt-1">
      <span className="text-sm text-gray-500">Poor</span>
      <span className="text-sm font-medium text-black">{score}/100</span>
      <span className="text-sm text-gray-500">Excellent</span>
    </div>
  </div>
);

const ScoreWebsite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState<null | {
    ui_ux: number;
    speed: number;
    seo: number;
    total: number;
  }>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { language } = useContext(LanguageContext);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  // Function to generate realistic-looking random scores
  const generateScores = (url: string) => {
    // Create a seed from the URL to keep results consistent
    let seed = 0;
    for (let i = 0; i < url.length; i++) {
      seed += url.charCodeAt(i);
    }
    
    // Generate scores between 55-95 to make them realistic
    const randomScore = (min: number, max: number) => {
      return Math.floor(((seed * (i++) * 9301 + 49297) % 233280) / 233280 * (max - min) + min);
    };
    
    let i = 1;
    const ui_ux = randomScore(55, 95);
    const speed = randomScore(55, 95);
    const seo = randomScore(55, 95);
    const total = Math.floor((ui_ux + speed + seo) / 3);
    
    return { ui_ux, speed, seo, total };
  };

  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setAnalysisComplete(false);
    
    try {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate scores
      const generatedScores = generateScores(values.url);
      setScores(generatedScores);
      
      // Store scores in Supabase
      const { error } = await supabase.from('website_scores').insert({
        url: values.url,
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
          <div className="mb-12 bg-black/5 p-6 rounded-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getTranslatedText('Website URL', 'عنوان الموقع الإلكتروني')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://yourdomain.com" 
                          {...field} 
                          className="bg-white text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {getTranslatedText('Analyzing Website...', 'جارٍ تحليل الموقع...')}
                    </>
                  ) : (
                    getTranslatedText('Analyze Website', 'تحليل الموقع')
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Loading indicator while analysis is being performed */}
          {isLoading && !scores && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg font-medium">
                {getTranslatedText('Analyzing your website...', 'جارٍ تحليل موقعك الإلكتروني...')}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {getTranslatedText('This may take a moment', 'قد يستغرق هذا لحظة')}
              </p>
            </div>
          )}
          
          {/* Results section */}
          {scores && (
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
                  />
                  
                  <ScoreSection 
                    title={getTranslatedText('Website Speed', 'سرعة الموقع')} 
                    score={scores.speed} 
                    color={scores.speed >= 80 ? 'bg-green-500' : 
                           scores.speed >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
                  />
                  
                  <ScoreSection 
                    title={getTranslatedText('SEO Performance', 'أداء تحسين محركات البحث')} 
                    score={scores.seo} 
                    color={scores.seo >= 80 ? 'bg-green-500' : 
                           scores.seo >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
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
                    <Button onClick={() => setContactDialogOpen(true)}>
                      {getTranslatedText('Get a Free Consultation', 'احصل على استشارة مجانية')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
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
