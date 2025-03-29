import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Loader2 } from 'lucide-react';
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
  onViewDetails: (id: string) => void;
  onRunNewAnalysis: () => void;
}

const HistoricalScores = ({ scores, onViewDetails, onRunNewAnalysis }: HistoricalScoresProps) => {
  if (scores.length === 0) {
    return (
      <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-md text-center border border-gray-800">
        <h3 className="text-xl font-bold mb-4 text-gray-100">No Historical Data</h3>
        <p className="text-gray-400 mb-6">
          You haven't analyzed any websites yet. Run your first analysis to see results here.
        </p>
        <Button onClick={onRunNewAnalysis}>
          Run New Analysis
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-bold text-gray-100">
          Previously Analyzed Websites
        </h3>
        <p className="text-gray-400 mt-1">
          Review your past website analyses
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#242424]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Website
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {scores.map((score) => (
              <tr 
                key={score.id}
                className="hover:bg-[#242424] transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {score.url}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      score.total_score >= 80 ? 'bg-green-900 text-green-200' :
                      score.total_score >= 70 ? 'bg-yellow-900 text-yellow-200' :
                      'bg-red-900 text-red-200'
                    }`}
                  >
                    {score.total_score}/100
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {new Date(score.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="ghost"
                    onClick={() => onViewDetails(score.id)}
                    className="text-gray-300 hover:text-white hover:bg-[#333333]"
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalScores;
