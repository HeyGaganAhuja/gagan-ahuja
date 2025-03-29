
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Form schema for URL validation
const formSchema = z.object({
  url: z.string().url('Please enter a valid URL').min(1, 'URL is required'),
});

interface WebsiteAnalysisFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  language: 'en' | 'ar';
}

const WebsiteAnalysisForm = ({ onSubmit, isLoading, language }: WebsiteAnalysisFormProps) => {
  const getTranslatedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.url);
  };

  return (
    <div className="mb-12 bg-black/5 p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getTranslatedText('Website URL', 'عنوان الموقع الإلكتروني')}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://yourdomain.com" 
                    {...field} 
                    className="bg-white text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {getTranslatedText('Analyzing Website...', 'جارٍ تحليل الموقع...')}
              </>
            ) : (
              getTranslatedText('Analyze Website', 'تحليل الموقع')
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WebsiteAnalysisForm;
