import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoveRight } from 'lucide-react';

interface WebsiteAnalysisFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const WebsiteAnalysisForm = ({ onSubmit, isLoading }: WebsiteAnalysisFormProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (input: string) => {
    // Simple URL validation
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return pattern.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    
    setError(null);
    let formattedUrl = url;
    
    // Add https:// if not present
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    onSubmit(formattedUrl);
  };

  return (
    <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-md border border-gray-800 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-100">
        Enter your website URL
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="e.g., example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 pr-4 text-base bg-[#242424] border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600"
            disabled={isLoading}
          />
          
          {error && (
            <p className="text-red-400 mt-2 text-sm">{error}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 bg-primary hover:bg-primary/90 text-lg transition-all duration-300"
          disabled={isLoading}
        >
          <span>Analyze Website</span>
          <MoveRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-sm text-gray-400 text-center">
          Free for all websites. No registration required.
        </p>
      </form>
    </div>
  );
};

export default WebsiteAnalysisForm;
