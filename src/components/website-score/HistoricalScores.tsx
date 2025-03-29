
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRightCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

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
  language: 'en' | 'ar';
  onViewDetails: (id: string) => void;
  onRunNewAnalysis: () => void;
}

const HistoricalScores = ({ 
  scores, 
  language, 
  onViewDetails,
  onRunNewAnalysis
}: HistoricalScoresProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: language === 'ar' ? ar : undefined
    });
  };

  const getScoreColorClass = (score: number) => {
    return score >= 80 ? 'text-green-600' : 
           score >= 70 ? 'text-yellow-600' : 'text-red-600';
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          {getTranslatedText('Historical Analysis Results', 'نتائج التحليل السابقة')}
        </CardTitle>
        <Button onClick={onRunNewAnalysis}>
          {getTranslatedText('Run New Analysis', 'تشغيل تحليل جديد')}
        </Button>
      </CardHeader>
      <CardContent>
        {scores.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {getTranslatedText(
              'No previous analyses found. Run your first website analysis!',
              'لم يتم العثور على تحليلات سابقة. قم بتشغيل تحليلك الأول للموقع!'
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>
                {getTranslatedText(
                  'Your website analysis history',
                  'سجل تحليل موقعك'
                )}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{getTranslatedText('Website URL', 'رابط الموقع')}</TableHead>
                  <TableHead className="text-center">{getTranslatedText('Total Score', 'النتيجة الإجمالية')}</TableHead>
                  <TableHead className="text-center">{getTranslatedText('UI/UX', 'واجهة المستخدم')}</TableHead>
                  <TableHead className="text-center">{getTranslatedText('Speed', 'السرعة')}</TableHead>
                  <TableHead className="text-center">{getTranslatedText('SEO', 'تحسين محركات البحث')}</TableHead>
                  <TableHead className="text-right">{getTranslatedText('Date', 'التاريخ')}</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((score) => (
                  <TableRow key={score.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <span className="truncate max-w-[180px]">
                          {new URL(score.url).hostname}
                        </span>
                        <a href={score.url} target="_blank" rel="noopener noreferrer" className="ml-1">
                          <ExternalLink size={14} className="text-gray-500" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${getScoreColorClass(score.total_score)}`}>
                      {score.total_score}
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColorClass(score.ui_ux_score)}`}>
                      {score.ui_ux_score}
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColorClass(score.speed_score)}`}>
                      {score.speed_score}
                    </TableCell>
                    <TableCell className={`text-center ${getScoreColorClass(score.seo_score)}`}>
                      {score.seo_score}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatDate(score.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onViewDetails(score.id)}
                      >
                        <span className="mr-1">
                          {getTranslatedText('Details', 'التفاصيل')}
                        </span>
                        <ArrowRightCircle size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoricalScores;
