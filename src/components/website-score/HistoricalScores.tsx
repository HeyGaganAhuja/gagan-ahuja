
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistance } from 'date-fns';
import { ExternalLink, RefreshCcw } from 'lucide-react';

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

interface HistoricalScoresProps {
  scores: WebsiteScore[];
  onSelect: (score: WebsiteScore) => void;
}

const HistoricalScores: React.FC<HistoricalScoresProps> = ({ scores, onSelect }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Your Recent Analyses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scores.map((score) => (
            <div
              key={score.id}
              className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h3 className="font-medium text-base break-all">
                  {score.url}
                </h3>
                <div className="flex gap-2 mt-1 text-sm text-muted-foreground">
                  <span>Total Score: {score.total_score}</span>
                  <span>•</span>
                  <span>
                    {formatDistance(new Date(score.created_at), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 md:flex-auto"
                  onClick={() => window.open(score.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" /> Visit
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 md:flex-auto"
                  onClick={() => onSelect(score)}
                >
                  <RefreshCcw className="h-4 w-4 mr-1" /> Analyze Again
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalScores;
