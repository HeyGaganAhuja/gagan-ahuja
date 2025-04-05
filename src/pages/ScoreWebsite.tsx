
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import WebsiteAnalysisForm from "@/components/website-score/WebsiteAnalysisForm";
import AnalysisResults from "@/components/website-score/AnalysisResults";
import AnalysisLoadingIndicator from "@/components/website-score/AnalysisLoadingIndicator";
import { analyzeWebsite } from "@/utils/websiteScoreUtils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import HistoricalScores from "@/components/website-score/HistoricalScores";

interface WebsiteScore {
  id: string;
  url: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  ui_ux_score: number;
  speed_score: number;
  seo_score: number;
  total_score: number;
  created_at: string;
}

const ScoreWebsite = () => {
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [historicalScores, setHistoricalScores] = useState<WebsiteScore[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Fix: Define userId as string | null explicitly to prevent type recursion
  const userId: string | null = user ? user.id : null;

  useEffect(() => {
    const fetchHistoricalScores = async () => {
      if (userId) {
        try {
          const { data, error } = await supabase
            .from("website_scores")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(5);

          if (error) throw error;
          if (data) setHistoricalScores(data as WebsiteScore[]);
        } catch (error) {
          console.error("Error fetching historical scores:", error);
        }
      }
    };

    fetchHistoricalScores();
  }, [userId]);

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      const scoreData = await analyzeWebsite(url);
      setResults(scoreData);

      // Record search in history
      if (userId) {
        try {
          await supabase.from("search_history").insert({
            query: "website_score",
            url,
            user_id: userId,
          });
        } catch (error) {
          console.error("Error recording search history:", error);
        }
      }

      // Save the website score
      try {
        const { error } = await supabase.from("website_scores").insert({
          url,
          name: name || null,
          email: email || null,
          phone: phone || null,
          ui_ux_score: scoreData.ui_ux,
          speed_score: scoreData.speed,
          seo_score: scoreData.seo,
          total_score: scoreData.total,
          user_id: userId || null,
        });

        if (error) throw error;
      } catch (error) {
        console.error("Error saving website score:", error);
      }
    } catch (error) {
      console.error("Error analyzing website:", error);
      toast({
        title: "Analysis Error",
        description: "There was an error analyzing the website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Button
        variant="outline"
        className="mb-4"
        onClick={handleBackToHome}
      >
        ← Back to Home
      </Button>
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        Website Performance Analysis
      </h1>

      {!results && !isAnalyzing && (
        <WebsiteAnalysisForm
          url={url}
          setUrl={setUrl}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          onAnalyze={handleAnalyze}
        />
      )}

      {isAnalyzing && <AnalysisLoadingIndicator />}

      {results && !isAnalyzing && (
        <AnalysisResults
          results={results}
          onAnalyzeAnother={() => {
            setResults(null);
            setUrl("");
          }}
        />
      )}

      {historicalScores.length > 0 && !results && !isAnalyzing && (
        <HistoricalScores 
          scores={historicalScores}
          onSelect={(score) => {
            setUrl(score.url);
            setName(score.name || "");
            setEmail(score.email || "");
            setPhone(score.phone || "");
          }}
        />
      )}
    </div>
  );
};

export default ScoreWebsite;
