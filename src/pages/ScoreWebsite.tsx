
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactDialog from '@/components/ContactDialog';
import WebsiteAnalysisForm from '@/components/website-score/WebsiteAnalysisForm';
import AnalysisLoadingIndicator from '@/components/website-score/AnalysisLoadingIndicator';
import { generateScores } from '@/utils/websiteScoreUtils';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

const AnalysisResults = lazy(() => import('@/components/website-score/AnalysisResults'));
const HistoricalScores = lazy(() => import('@/components/website-score/HistoricalScores'));
const HistoricalScoreDetails = lazy(() => import('@/components/website-score/HistoricalScoreDetails'));

interface ScoreData {
  ui_ux: number;
  speed: number;
  seo: number;
  total: number;
}

interface HistoricalScore {
  id: string;
  url: string;
  ui_ux_score: number;
  speed_score: number;
  seo_score: number;
  total_score: number;
  created_at: string;
}

const ScoreWebsite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState<null | ScoreData>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('new-analysis');
  const [historicalScores, setHistoricalScores] = useState<HistoricalScore[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [selectedHistoricalScore, setSelectedHistoricalScore] = useState<HistoricalScore | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    document.title = "Website Performance Analysis Tool - Gagan Ahuja";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Analyze your website\'s UI/UX, speed, and SEO performance with our free comprehensive website scoring tool. Get personalized recommendations to improve your site.');
    }
    
    // Set canonical URL for SEO
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://www.gaganahuja.com/score-website');
    }
  }, []);

  const fetchHistoricalScores = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const { count, error: countError } = await supabase
        .from('website_scores')
        .select('*', { count: 'exact', head: true });
      
      if (countError) throw countError;
      
      if (count) {
        setTotalPages(Math.ceil(count / itemsPerPage));
      }
      
      const { data, error } = await supabase
        .from('website_scores')
        .select('*')
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);
      
      if (error) throw error;
      
      setHistoricalScores(data || []);
    } catch (error) {
      console.error('Error fetching historical scores:', error);
      toast({
        title: 'Error',
        description: 'Failed to load historical scores.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingHistory(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistoricalScores();
    }
  }, [activeTab, currentPage, fetchHistoricalScores]);

  const onSubmit = async (url: string) => {
    setIsLoading(true);
    setAnalysisComplete(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedScores = generateScores(url);
      setScores(generatedScores);
      
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
      
      if (generatedScores.total < 70) {
        setTimeout(() => {
          setContactDialogOpen(true);
        }, 1500);
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

  const handleViewDetails = (id: string) => {
    const score = historicalScores.find(s => s.id === id);
    if (score) {
      setSelectedHistoricalScore(score);
    }
  };

  const handleBackToHistory = () => {
    setSelectedHistoricalScore(null);
  };

  const handleRunNewAnalysis = () => {
    setActiveTab('new-analysis');
    setScores(null);
    setAnalysisComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-center mb-2 cursor-default">
            Score Your Website
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Our AI-powered tool analyzes your website's UI/UX, speed, and SEO performance to provide a comprehensive score and recommendations.
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="new-analysis">
                New Analysis
              </TabsTrigger>
              <TabsTrigger value="history">
                Analysis History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-analysis">
              <WebsiteAnalysisForm 
                onSubmit={onSubmit} 
                isLoading={isLoading}
              />
              
              {isLoading && !scores && (
                <AnalysisLoadingIndicator />
              )}
              
              {scores && (
                <Suspense fallback={<AnalysisLoadingIndicator />}>
                  <AnalysisResults 
                    scores={scores}
                    analysisComplete={analysisComplete}
                    onRequestConsultation={() => setContactDialogOpen(true)}
                  />
                </Suspense>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              {isLoadingHistory ? (
                <div className="flex justify-center py-12">
                  <AnalysisLoadingIndicator />
                </div>
              ) : selectedHistoricalScore ? (
                <Suspense fallback={<AnalysisLoadingIndicator />}>
                  <HistoricalScoreDetails 
                    score={selectedHistoricalScore}
                    onBack={handleBackToHistory}
                  />
                </Suspense>
              ) : (
                <>
                  <Suspense fallback={<AnalysisLoadingIndicator />}>
                    <HistoricalScores 
                      scores={historicalScores} 
                      onViewDetails={handleViewDetails}
                      onRunNewAnalysis={handleRunNewAnalysis}
                    />
                  </Suspense>
                  
                  {historicalScores.length > 0 && (
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNumber;
                          
                          if (totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                          } else {
                            pageNumber = currentPage - 2 + i;
                          }
                          
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                isActive={currentPage === pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className="cursor-pointer"
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev)}
                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
      
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </div>
  );
};

export default ScoreWebsite;
