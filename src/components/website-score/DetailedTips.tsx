
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface DetailedTipsProps {
  scores: {
    ui_ux: number;
    speed: number;
    seo: number;
    total: number;
  };
  language: 'en' | 'ar';
}

const DetailedTips = ({ scores, language }: DetailedTipsProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  // Get category status based on score
  const getCategoryStatus = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 70) return 'good';
    return 'needs-improvement';
  };

  // Tips for each category
  const tipsByCategory = {
    ui_ux: {
      excellent: [
        getTranslatedText('Professional design with strong visual hierarchy', 'تصميم احترافي مع تسلسل بصري قوي'),
        getTranslatedText('Intuitive navigation structure', 'بنية تنقل بديهية'),
        getTranslatedText('Consistent branding throughout the site', 'علامة تجارية متسقة في جميع أنحاء الموقع')
      ],
      good: [
        getTranslatedText('Consider enhancing visual consistency', 'النظر في تعزيز الاتساق البصري'),
        getTranslatedText('Improve mobile responsiveness', 'تحسين استجابة الجوال'),
        getTranslatedText('Add more clear call-to-action buttons', 'إضافة المزيد من أزرار الدعوة إلى العمل الواضحة')
      ],
      'needs-improvement': [
        getTranslatedText('Redesign for better user experience', 'إعادة تصميم لتجربة مستخدم أفضل'),
        getTranslatedText('Fix navigation issues and confusing menus', 'إصلاح مشاكل التنقل والقوائم المربكة'),
        getTranslatedText('Improve accessibility for all users', 'تحسين إمكانية الوصول لجميع المستخدمين')
      ]
    },
    speed: {
      excellent: [
        getTranslatedText('Fast loading times across all pages', 'أوقات تحميل سريعة عبر جميع الصفحات'),
        getTranslatedText('Optimized images and resources', 'الصور والموارد المحسنة'),
        getTranslatedText('Efficient code with minimal bloat', 'كود فعال مع الحد الأدنى من التضخم')
      ],
      good: [
        getTranslatedText('Compress and optimize images further', 'ضغط وتحسين الصور بشكل أكبر'),
        getTranslatedText('Implement lazy loading for media', 'تنفيذ التحميل الكسول للوسائط'),
        getTranslatedText('Consider a Content Delivery Network', 'التفكير في شبكة توصيل المحتوى')
      ],
      'needs-improvement': [
        getTranslatedText('Significantly reduce page size and requests', 'تقليل حجم الصفحة والطلبات بشكل كبير'),
        getTranslatedText('Optimize or remove render-blocking resources', 'تحسين أو إزالة الموارد التي تمنع العرض'),
        getTranslatedText('Update hosting to faster servers', 'تحديث الاستضافة إلى خوادم أسرع')
      ]
    },
    seo: {
      excellent: [
        getTranslatedText('Well-structured content with proper heading tags', 'محتوى منظم جيدًا مع علامات عناوين مناسبة'),
        getTranslatedText('Optimized meta tags and descriptions', 'علامات التعريف والأوصاف المحسنة'),
        getTranslatedText('Mobile-friendly design', 'تصميم متوافق مع الأجهزة المحمولة')
      ],
      good: [
        getTranslatedText('Add more relevant keywords to content', 'إضافة المزيد من الكلمات الرئيسية ذات الصلة إلى المحتوى'),
        getTranslatedText('Improve meta descriptions for better CTR', 'تحسين أوصاف التعريف لمعدل نقر أفضل'),
        getTranslatedText('Create more internal links', 'إنشاء المزيد من الروابط الداخلية')
      ],
      'needs-improvement': [
        getTranslatedText('Implement proper page titles and meta descriptions', 'تنفيذ عناوين الصفحات المناسبة وأوصاف التعريف'),
        getTranslatedText('Fix broken links and improve site structure', 'إصلاح الروابط المعطلة وتحسين هيكل الموقع'),
        getTranslatedText('Develop a comprehensive content strategy', 'تطوير استراتيجية محتوى شاملة')
      ]
    }
  };

  const renderTips = (category: 'ui_ux' | 'speed' | 'seo') => {
    const status = getCategoryStatus(scores[category]);
    const tips = tipsByCategory[category][status as keyof typeof tipsByCategory[typeof category]];
    const Icon = status === 'excellent' ? CheckCircle : status === 'good' ? AlertCircle : XCircle;
    const color = status === 'excellent' ? 'text-green-500' : status === 'good' ? 'text-yellow-500' : 'text-red-500';

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className={color} size={20} />
            <span>
              {getTranslatedText(
                `${status === 'excellent' ? 'Excellent' : status === 'good' ? 'Good' : 'Needs Improvement'}`,
                `${status === 'excellent' ? 'ممتاز' : status === 'good' ? 'جيد' : 'يحتاج إلى تحسين'}`
              )}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-2 items-start">
                <span className="text-primary">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="mt-6 mb-8 text-black">
      <h3 className="text-xl font-bold mb-4">
        {getTranslatedText('Improvement Recommendations', 'توصيات التحسين')}
      </h3>
      <Tabs defaultValue="ui_ux">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="ui_ux">{getTranslatedText('UI/UX Design', 'تصميم واجهة المستخدم')}</TabsTrigger>
          <TabsTrigger value="speed">{getTranslatedText('Website Speed', 'سرعة الموقع')}</TabsTrigger>
          <TabsTrigger value="seo">{getTranslatedText('SEO Performance', 'أداء تحسين محركات البحث')}</TabsTrigger>
        </TabsList>
        <TabsContent value="ui_ux" className="mt-4">
          {renderTips('ui_ux')}
        </TabsContent>
        <TabsContent value="speed" className="mt-4">
          {renderTips('speed')}
        </TabsContent>
        <TabsContent value="seo" className="mt-4">
          {renderTips('seo')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedTips;
