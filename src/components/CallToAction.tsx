
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 bg-zinc-900 text-zinc-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white animate-fade-in">Book a Meeting With Us</h2>
          <p className="text-lg md:text-xl mb-10 text-zinc-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Ready to accelerate your business growth? Schedule a consultation with our experts and discover how we can help you achieve your goals.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-6 text-base bg-transparent border-zinc-400 text-white hover:bg-zinc-800 hover-scale animate-fade-in button-glow" 
            style={{ animationDelay: '0.4s' }}
            asChild
          >
            <a 
              href="https://cal.com/gagan-ahuja/consulting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Calendar size={18} className="transition-transform group-hover:rotate-12" />
              <span>Schedule Your Consultation</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
