import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateRecommendations } from '@/utils/websiteScoreUtils';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Check } from 'lucide-react';
import { 
  LineChart, 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

interface DetailedTipsProps {
  scores: any;
  language: 'en' | 'ar';
}

const DetailedTips = ({ scores, language }: DetailedTipsProps) => {
  const [activeTab, setActiveTab] = useState("ui-ux");
  const recommendations = generateRecommendations(scores);
  
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  const formatMetricsData = (metricsObj: Record<string, number>, category: string) => {
    return Object.entries(metricsObj || {}).map(([key, value]) => ({
      name: formatMetricName(key),
      value: value,
      category: category
    }));
  };

  const formatMetricName = (key: string) => {
    // Convert camelCase to sentence case
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const getDetailedMetricsData = () => {
    if (!scores.metrics) return [];
    
    const uiUxData = formatMetricsData(scores.metrics.uiUx, 'UI/UX');
    const seoData = formatMetricsData(scores.metrics.seo, 'SEO');
    const speedData = formatMetricsData(scores.metrics.speed, 'Speed');
    
    return [...uiUxData, ...seoData, ...speedData];
  };

  const getCategoryMetrics = (category: string) => {
    if (!scores.metrics) return [];
    
    switch(category) {
      case 'ui-ux':
        return formatMetricsData(scores.metrics.uiUx, 'UI/UX');
      case 'seo':
        return formatMetricsData(scores.metrics.seo, 'SEO');
      case 'speed':
        return formatMetricsData(scores.metrics.speed, 'Speed');
      default:
        return [];
    }
  };

  const getColorForScore = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 70) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {getTranslatedText('Detailed Analysis & Recommendations', 'تحليل مفصل وتوصيات')}
        </h3>
        <div className="h-1 w-20 bg-[#FF5733] rounded-full"></div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="ui-ux" 
            className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#FF5733] data-[state=active]:shadow-sm rounded-md transition-all duration-200 cursor-pointer"
          >
            {getTranslatedText('UI/UX (30%)', 'واجهة المستخدم (30٪)')}
          </TabsTrigger>
          <TabsTrigger 
            value="speed" 
            className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#FF5733] data-[state=active]:shadow-sm rounded-md transition-all duration-200 cursor-pointer"
          >
            {getTranslatedText('Speed (40%)', 'السرعة (40٪)')}
          </TabsTrigger>
          <TabsTrigger 
            value="seo" 
            className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#FF5733] data-[state=active]:shadow-sm rounded-md transition-all duration-200 cursor-pointer"
          >
            {getTranslatedText('SEO (30%)', 'تحسين محركات البحث (30٪)')}
          </TabsTrigger>
        </TabsList>
        
        {['ui-ux', 'speed', 'seo'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4 animate-in fade-in-50">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="h-80 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getCategoryMetrics(tab)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    layout={language === 'ar' ? 'vertical' : 'horizontal'}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    {language === 'ar' ? (
                      <>
                        <XAxis type="number" domain={[0, 100]} stroke="#666" />
                        <YAxis dataKey="name" type="category" width={150} stroke="#666" />
                      </>
                    ) : (
                      <>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} stroke="#666" />
                        <YAxis domain={[0, 100]} stroke="#666" />
                      </>
                    )}
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const value = Number(payload[0].value);
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                              <p className="font-semibold text-gray-900">{payload[0].name}</p>
                              <p className="text-lg font-bold" style={{ color: getColorForScore(value) }}>
                                {value}/100
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {getCategoryMetrics(tab).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getColorForScore(entry.value)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mt-6">
                <h4 className="font-semibold text-xl mb-4 text-gray-900">
                  {getTranslatedText('Recommendations', 'التوصيات')}
                </h4>
                <ul className="space-y-3">
                  {tab === 'ui-ux' && recommendations.uiUx.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-800">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5733]"></div>
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                  {tab === 'speed' && recommendations.speed.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-800">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5733]"></div>
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                  {tab === 'seo' && recommendations.seo.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-800">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5733]"></div>
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                  {((tab === 'ui-ux' && recommendations.uiUx.length === 0) ||
                   (tab === 'speed' && recommendations.speed.length === 0) ||
                   (tab === 'seo' && recommendations.seo.length === 0)) && (
                    <li className="flex items-center space-x-3 text-green-600">
                      <Check size={16} />
                      <span>
                        {getTranslatedText('Great job! No major issues found in this category.', 'عمل رائع! لم يتم العثور على مشكلات رئيسية في هذه الفئة.')}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h4 className="font-semibold text-xl mb-6 text-gray-900">
          {getTranslatedText('Performance Comparison', 'مقارنة الأداء')}
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { name: 'UI/UX', score: scores.ui_ux, avg: 68 },
                { name: 'Speed', score: scores.speed, avg: 65 },
                { name: 'SEO', score: scores.seo, avg: 70 }
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis domain={[0, 100]} stroke="#666" />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                        <p className="font-semibold text-gray-900">{payload[0].name}</p>
                        <p className="text-lg font-bold" style={{ color: payload[0].color }}>
                          {payload[0].value}/100
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#FF5733" 
                name={getTranslatedText('Your Score', 'نتيجتك')}
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="avg" 
                stroke="#82ca9d" 
                name={getTranslatedText('Average Score', 'النتيجة المتوسطة')}
                strokeDasharray="5 5" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DetailedTips;
