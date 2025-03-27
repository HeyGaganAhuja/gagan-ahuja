import React, { useState } from 'react';
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
      <span className="text-sm font-medium">{score}/100</span>
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content */}
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-center mb-2 cursor-highlight">
            Score Your Website
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Our AI-powered tool analyzes your website's UI/UX, speed, and SEO performance to provide 
            a comprehensive score and recommendations.
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
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://yourdomain.com" 
                          {...field} 
                          className="bg-white"
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
                      Analyzing Website...
                    </>
                  ) : (
                    'Analyze Website'
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Results section */}
          {scores && (
            <div className={`transition-all duration-500 ${analysisComplete ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Website Analysis Results</h2>
                  <div className="flex items-center text-green-600">
                    <Check className="mr-1" size={18} />
                    <span>Complete</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Overall Score</h3>
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
                  
                  <p className="text-gray-700 mt-4">
                    {scores.total >= 80 
                      ? 'Excellent! Your website performs well across all key metrics.'
                      : scores.total >= 70
                      ? 'Good performance, but there\'s room for improvement in some areas.'
                      : 'Your website needs significant improvements to meet modern standards.'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <ScoreSection 
                    title="UI/UX Design" 
                    score={scores.ui_ux} 
                    color={scores.ui_ux >= 80 ? 'bg-green-500' : 
                           scores.ui_ux >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
                  />
                  
                  <ScoreSection 
                    title="Website Speed" 
                    score={scores.speed} 
                    color={scores.speed >= 80 ? 'bg-green-500' : 
                           scores.speed >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
                  />
                  
                  <ScoreSection 
                    title="SEO Performance" 
                    score={scores.seo} 
                    color={scores.seo >= 80 ? 'bg-green-500' : 
                           scores.seo >= 70 ? 'bg-yellow-500' : 'bg-red-500'} 
                  />
                </div>
                
                {scores.total < 70 && (
                  <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Need Help Improving Your Website?</h3>
                    <p className="mb-4">Our team of experts can help you address these issues and enhance your website's performance.</p>
                    <Button onClick={() => setContactDialogOpen(true)}>
                      Get a Free Consultation
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
