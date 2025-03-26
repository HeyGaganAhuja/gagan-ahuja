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
      <div className="top-gradient-glow"></div>
      <div className="moving-gradient"></div>
      <div className="grainy-texture absolute inset-0 opacity-25"></div>
      
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
            <span className="px-4 py-1 rounded-full bg-[#FF5733]/20 border border-[#FF5733]/20 text-white text-sm font-medium">
              We build tech from ❤️
            </span>
          </div>
          <h1 className="text-5xl xs:text-6xl sm:text-6xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight mb-6 animate-fade-in hover-scale">
            Accelerating Growth With Websites 🚀
          </h1>
          <p className="text-md sm:text-md md:text-xl text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We create incredible websites for Businesses
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 text-base sm:text-lg md:text-lg bg-[#FF5733] hover:bg-[#FF5733]/90 hover-scale animate-fade-in modern-button button-glow" 
            style={{ animationDelay: '0.4s' }}
            asChild
          >
            <a 
              href="https://cal.com/gagan-ahuja/consulting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <span className="mb-1">Book a Free Consultation</span>
              <span className="text-xs text-white/70">Worth $1000</span>
              <ArrowRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          {/* Rest of the component remains the same */}
          {/* Timer section */}
          <div className="mt-8 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-2 bg-zinc-800/70 rounded-full px-6 py-2 border border-zinc-700/50 shadow-lg">
              <Timer size={20} className="text-[#FF5733] animate-pulse" />
              <span className="text-white font-bold text-base sm:text-lg md:text-xl">{formatTime()}</span>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">Limited time offer - Expires soon!</p>
          </div>

          {/* Steps section */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-center text-xl sm:text-2xl text-zinc-300 mb-6 hidden md:block">Steps to Work With Us</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {[
                { number: 1, title: "Describe what you want to build." },
                { number: 2, title: "We build your first version." },
                { number: 3, title: "Talk to extend your project." },
                { number: 4, title: "Share or sync to GitHub." }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div className="step-gradient relative mb-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border border-zinc-700/50 shadow-lg">
                      <span className="text-lg sm:text-xl font-bold text-white">{step.number}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-zinc-700/50" style={{ width: 'calc(100% + 4rem)' }}></div>
                    )}
                  </div>
                  <p className="text-zinc-300 text-center text-xs sm:text-sm px-1">{step.title}</p>
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
