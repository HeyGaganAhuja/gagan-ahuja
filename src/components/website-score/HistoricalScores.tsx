
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Eye, BarChart2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface HistoricalScore {
  id: string;
  url: string;
  ui_ux_score: number;
  speed_score: number;
  seo_score: number;
  total_score: number;
  created_at: string;
}

interface HistoricalScoresProps {
  scores: HistoricalScore[];
  language: 'en';
  onViewDetails: (id: string) => void;
  onRunNewAnalysis: () => void;
}

const HistoricalScores = ({ 
  scores, 
  onViewDetails,
  onRunNewAnalysis 
}: HistoricalScoresProps) => {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {scores.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BarChart2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Results Yet</h3>
          <p className="text-gray-600 mb-6">You haven't analyzed any websites yet. Run your first analysis to see results here.</p>
          <Button onClick={onRunNewAnalysis} className="bg-primary hover:bg-primary/90">
            Run New Analysis
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h3 className="text-lg font-medium text-gray-900">Previous Website Analyses</h3>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-gray-50/80">
                  <TableHead className="text-left font-medium w-1/3">Website URL</TableHead>
                  <TableHead className="text-center font-medium w-1/6">UI/UX</TableHead>
                  <TableHead className="text-center font-medium w-1/6">Speed</TableHead>
                  <TableHead className="text-center font-medium w-1/6">SEO</TableHead>
                  <TableHead className="text-center font-medium w-1/6">Overall</TableHead>
                  <TableHead className="text-right font-medium w-1/6">Date</TableHead>
                  <TableHead className="text-right font-medium w-1/12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((score) => (
                  <TableRow 
                    key={score.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewDetails(score.id)}
                  >
                    <TableCell className="font-medium truncate max-w-[200px]">
                      {score.url}
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getScoreColorClass(score.ui_ux_score)}`}>
                      {score.ui_ux_score}
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getScoreColorClass(score.speed_score)}`}>
                      {score.speed_score}
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getScoreColorClass(score.seo_score)}`}>
                      {score.seo_score}
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getScoreColorClass(score.total_score)}`}>
                      {score.total_score}
                    </TableCell>
                    <TableCell className="text-right text-gray-500">
                      {formatDate(score.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(score.id);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {scores.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button onClick={onRunNewAnalysis} className="bg-primary hover:bg-primary/90">
            Run New Analysis
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoricalScores;
