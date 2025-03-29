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
}

const DetailedTips = ({ scores }: DetailedTipsProps) => {
  const [activeTab, setActiveTab] = useState("ui-ux");
  const recommendations = generateRecommendations(scores);

  // Consistent metrics data
  const baseMetrics = {
    uiUx: {
      mobileFriendliness: 73,
      visualDesign: 75,
      userExperience: 73,
      accessibility: 72,
      interactivity: 74
    },
    speed: {
      pageSpeed: 74,
      loadTime: 73,
      serverResponse: 75,
      resourceOptimization: 74,
      caching: 74
    },
    seo: {
      keywordOptimization: 77,
      contentQuality: 78,
      metaTags: 76,
      siteStructure: 77,
      mobileSEO: 77
    }
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

  const getCategoryMetrics = (category: string) => {
    switch(category) {
      case 'ui-ux':
        return formatMetricsData(baseMetrics.uiUx, 'UI/UX');
      case 'speed':
        return formatMetricsData(baseMetrics.speed, 'Speed');
      case 'seo':
        return formatMetricsData(baseMetrics.seo, 'SEO');
      default:
        return [];
    }
  };

  const getColorForScore = (score: number) => {
    if (score >= 90) return "#10b981"; // emerald-500
    if (score >= 80) return "#22c55e"; // green-500
    if (score >= 70) return "#eab308"; // yellow-500
    if (score >= 60) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Detailed Analysis & Recommendations
        </h3>
        <div className="h-1 w-20 bg-[#FF5733] rounded-full"></div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger 
            value="ui-ux" 
            className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#FF5733] data-[state=active]:shadow-md rounded-lg transition-all duration-200 cursor-pointer py-3"
          >
            UI/UX (30%)
          </TabsTrigger>
          <TabsTrigger 
            value="speed" 
            className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#FF5733] data-[state=active]:shadow-md rounded-lg transition-all duration-200 cursor-pointer py-3"
          >
            Speed (40%)
          </TabsTrigger>
          <TabsTrigger 
            value="seo" 
            className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#FF5733] data-[state=active]:shadow-md rounded-lg transition-all duration-200 cursor-pointer py-3"
          >
            SEO (30%)
          </TabsTrigger>
        </TabsList>
        
        {['ui-ux', 'speed', 'seo'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4 animate-in fade-in-50">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="h-80 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getCategoryMetrics(tab)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70} 
                      stroke="#666"
                      tick={{ fill: '#666', fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      stroke="#666"
                      tick={{ fill: '#666', fontSize: 12 }}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const value = Number(payload[0].value);
                          return (
                            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                              <p className="font-semibold text-gray-900 mb-2">{payload[0].name}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Score:</span>
                                  <span className="font-bold" style={{ color: getColorForScore(value) }}>
                                    {value}/100
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Rating:</span>
                                  <span className="font-medium" style={{ color: getColorForScore(value) }}>
                                    {getScoreLabel(value)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                    >
                      {getCategoryMetrics(tab).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getColorForScore(entry.value)}
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mt-6">
                <h4 className="font-semibold text-xl mb-4 text-gray-900">
                  Recommendations
                </h4>
                <ul className="space-y-4">
                  {tab === 'ui-ux' && recommendations.uiUx.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-800 bg-gray-50 p-4 rounded-lg">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5733]"></div>
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                  {tab === 'speed' && recommendations.speed.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-800 bg-gray-50 p-4 rounded-lg">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5733]"></div>
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                  {tab === 'seo' && recommendations.seo.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-800 bg-gray-50 p-4 rounded-lg">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5733]"></div>
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                  {((tab === 'ui-ux' && recommendations.uiUx.length === 0) ||
                   (tab === 'speed' && recommendations.speed.length === 0) ||
                   (tab === 'seo' && recommendations.seo.length === 0)) && (
                    <li className="flex items-center space-x-3 text-green-600 bg-green-50 p-4 rounded-lg">
                      <Check size={16} />
                      <span>
                        Great job! No major issues found in this category.
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h4 className="font-semibold text-xl mb-6 text-gray-900">
          Performance Comparison
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { name: 'UI/UX', score: scores.ui_ux, avg: 73 },
                { name: 'Speed', score: scores.speed, avg: 74 },
                { name: 'SEO', score: scores.seo, avg: 77 }
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#666" 
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]} 
                stroke="#666"
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.name}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[#FF5733]">Your Score:</span>
                            <span className="font-bold text-[#FF5733]">{payload[0].payload.score}/100</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#82ca9d]">Average Score:</span>
                            <span className="font-bold text-[#82ca9d]">{payload[0].payload.avg}/100</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-gray-600">Difference:</span>
                            <span className={`font-bold ${payload[0].payload.score >= payload[0].payload.avg ? 'text-green-500' : 'text-red-500'}`}>
                              {(payload[0].payload.score - payload[0].payload.avg).toFixed(1)}%
                            </span>
                          </div>
                        </div>
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
                name="Your Score"
                activeDot={{ r: 8 }} 
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="avg" 
                stroke="#82ca9d" 
                name="Average Score"
                strokeDasharray="5 5"
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DetailedTips;
