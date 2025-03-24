
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Book a Meeting With Us</h2>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/90">
            Ready to accelerate your business growth? Schedule a consultation with our experts and discover how we can help you achieve your goals.
          </p>
          <Button size="lg" variant="outline" className="px-8 py-6 text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <a 
              href="https://cal.com/gagan-ahuja/consulting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Calendar size={18} />
              <span>Schedule Your Consultation</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
