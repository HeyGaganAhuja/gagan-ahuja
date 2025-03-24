
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Dotted pattern background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-20">
          {Array.from({ length: 200 }).map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-6 animate-fade-in hover-scale">
            Accelerating Growth With Websites <Rocket className="inline ml-2 text-primary" size={36} strokeWidth={1.5} />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We create incredible websites for Businesses
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 text-base bg-primary hover:bg-primary/90 hover-scale animate-fade-in" 
            style={{ animationDelay: '0.4s' }}
            asChild
          >
            <a 
              href="https://cal.com/gagan-ahuja/consulting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <span>Book a $500 Worth Free Consultation</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
