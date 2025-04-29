
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Calendar, Timer } from 'lucide-react';

const CallToAction = () => {
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // Format time remaining
  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-24 bg-[#050505] text-zinc-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white animate-fade-in">Book a Meeting With Us</h2>
          <p className="text-lg md:text-xl mb-10 text-zinc-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Ready to accelerate your business growth? Schedule a consultation with our experts and discover how we can help you achieve your goals.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 text-base bg-[#FF5733] hover:bg-[#FF5733]/90 text-white hover-scale animate-fade-in button-glow" 
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
          
          {/* Timer section */}
          <div className="mt-8 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-2 bg-zinc-800/70 rounded-full px-6 py-2 border border-zinc-700/50 shadow-lg">
              <Timer size={20} className="text-[#FF5733] animate-pulse" />
              <span className="text-white font-bold">{formatTime()}</span>
            </div>
            <p className="text-zinc-400 text-sm mt-2">Limited time offer - Expires soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
