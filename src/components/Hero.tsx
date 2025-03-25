
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Timer } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(timerInterval);
    };
  }, [isVisible]);

  // Format time remaining
  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden dotted-pattern grid-pattern">
      <div className="moving-gradient"></div>
      <div className="grainy-texture absolute inset-0"></div>
      
      <div 
        className="cursor-glow" 
        style={{ 
          left: `${mousePosition.x - 125}px`, 
          top: `${mousePosition.y - 125}px`,
          opacity: isVisible ? 0.6 : 0 
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1 rounded-full bg-[#FF5733]/20 border border-[#FF5733]/20 text-[#FF5733] text-sm font-medium">
              We build tech from ❤️
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight mb-6 animate-fade-in hover-scale">
            Accelerating Growth With Websites 🚀
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We create incredible websites for Businesses
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 text-base bg-[#FF5733] hover:bg-[#FF5733]/90 hover-scale animate-fade-in modern-button button-glow" 
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
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 ml-2" />
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

          {/* Steps section */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { number: 1, title: "Describe what you want to build." },
                { number: 2, title: "We build your first version." },
                { number: 3, title: "Talk to extend your project." },
                { number: 4, title: "Share or sync to GitHub." }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div className="step-gradient relative mb-3">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center border border-zinc-700/50 shadow-lg">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-zinc-700/50" style={{ width: 'calc(100% + 6rem)' }}></div>
                    )}
                  </div>
                  <p className="text-zinc-300 text-center text-xs">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none"></div>
    </section>
  );
};

export default Hero;
