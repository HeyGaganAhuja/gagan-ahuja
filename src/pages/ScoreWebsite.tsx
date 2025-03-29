
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import WebsiteAnalysisForm from '@/components/website-score/WebsiteAnalysisForm';
import AnalysisResults from '@/components/website-score/AnalysisResults';
import AnalysisLoadingIndicator from '@/components/website-score/AnalysisLoadingIndicator';
import HistoricalScores from '@/components/website-score/HistoricalScores';
import HistoricalScoreDetails from '@/components/website-score/HistoricalScoreDetails';
import Navbar from '@/components/Navbar';
import { analyzeWebsite } from '@/utils/websiteScoreUtils';

const ScoreWebsite = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('url') || '';
  const [url, setUrl] = useState(initialUrl);
  const [showHistoricalDetails, setShowHistoricalDetails] = useState(false);
  const [selectedHistoricalScore, setSelectedHistoricalScore] = useState(null);

  useEffect(() => {
    if (initialUrl) {
      handleSubmit(initialUrl);
    }
  }, [initialUrl]);

  const { data: historicalScores, refetch: refetchHistory } = useQuery({
    queryKey: ['historicalScores'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('website_scores')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const {
    data: analysisResults,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['websiteAnalysis', url],
    queryFn: async () => {
      // Record search in history if user is logged in
      if (user && url) {
        await supabase.from('search_history').insert({
          user_id: user.id,
          query: 'website analysis',
          url
        });
      }
      return analyzeWebsite(url);
    },
    enabled: false,
  });

  const handleSubmit = (websiteUrl) => {
    setUrl(websiteUrl);
    refetch();
  };

  const viewHistoricalDetails = (id) => {
    const score = historicalScores.find(score => score.id === id);
    setSelectedHistoricalScore(score);
    setShowHistoricalDetails(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100 pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              Website Performance Analysis
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Get a comprehensive analysis of your website's performance, SEO, and user experience.
            </p>
            
            {showHistoricalDetails && selectedHistoricalScore ? (
              <HistoricalScoreDetails 
                score={selectedHistoricalScore} 
                onBack={() => setShowHistoricalDetails(false)} 
              />
            ) : (
              <>
                <WebsiteAnalysisForm onSubmit={handleSubmit} isLoading={isPending} />
                
                {isPending ? (
                  <AnalysisLoadingIndicator />
                ) : analysisResults ? (
                  <AnalysisResults results={analysisResults} />
                ) : isError ? (
                  <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-lg">
                    <p className="font-medium">Error analyzing website</p>
                    <p className="text-sm mt-1">{error?.message || 'Please try again with a valid URL'}</p>
                  </div>
                ) : null}
                
                {user && historicalScores && historicalScores.length > 0 && !isPending && !analysisResults && (
                  <div className="mt-10">
                    <HistoricalScores 
                      scores={historicalScores} 
                      onViewDetails={viewHistoricalDetails}
                      onRunNewAnalysis={() => window.scrollTo(0, 0)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreWebsite;
