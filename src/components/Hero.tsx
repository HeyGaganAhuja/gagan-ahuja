
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight mb-6">
            Accelerating Growth With Websites
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            We create incredible websites for Businesses
          </p>
          <Button size="lg" className="px-8 py-6 text-base" asChild>
            <a 
              href="https://cal.com/gagan-ahuja/consulting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <span>Book a $500 Worth Free Consultation</span>
              <ArrowRight size={18} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
