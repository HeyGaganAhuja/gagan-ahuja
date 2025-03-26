import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';

const Support = () => {
  return (
    <section className="py-16 bg-[#050505]">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <Coffee className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Support Our Work</h2>
          <p className="text-muted-foreground mb-6 font-semibold">
            If you've found our resources helpful, consider buying us a coffee to support our continued creation of valuable content.
          </p>
          <Button className="px-6 bg-primary hover:bg-primary/90" asChild>
            <a 
              href="https://www.buymeacoffee.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Coffee size={18} />
              <span>Buy Me a Coffee</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Support;
