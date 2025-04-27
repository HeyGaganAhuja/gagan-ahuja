import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-medium mb-6 text-white">
            Unlock Your Business Potential
          </h1>
          <p className="text-muted-foreground text-lg font-regular mb-8">
            We provide tailored solutions to help businesses thrive in today's competitive market.
          </p>
        </div>
        
        <Button asChild size="lg" className="button-3d">
          <a href="https://cal.com/gagan-ahuja/consulting" target="_blank" rel="noopener noreferrer">
            Apply to Work With Us
          </a>
        </Button>
        
        <div className="mt-12 flex justify-center animate-fade-in">
          <Sparkles className="h-6 w-6 text-primary animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
