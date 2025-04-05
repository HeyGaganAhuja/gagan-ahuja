
import React from 'react';
import { Loader2 } from 'lucide-react';

const AnalysisLoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg font-medium">
        Analyzing your website...
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        This may take a moment
      </p>
    </div>
  );
};

export default AnalysisLoadingIndicator;
