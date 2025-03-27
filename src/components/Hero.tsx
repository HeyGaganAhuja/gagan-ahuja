import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Timer } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Handle text hover effect
    const handleTextHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'H1' || target.tagName === 'P' || target.tagName === 'SPAN' || target.classList.contains('cursor-highlight')) {
        setHoveredElement(target);
      } else {
        setHoveredElement(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleTextHover);

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleTextHover);
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
      
      {/* Custom cursor effect */}
      <div 
        className="custom-cursor" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          backgroundColor: 'white',
          mixBlendMode: hoveredElement ? 'difference' : 'normal'
        }}
      ></div>
      
      <div className="cursor-glow" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          opacity: isVisible ? 0.6 : 0,
          transform: 'translate(-50%, -50%)' 
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1 rounded-full bg-[#FF5733]/20 border border-[#FF5733]/20 text-white text-sm font-medium cursor-highlight">
              We build tech from ❤️
            </span>
          </div>
          <h1 className="text-5xl xs:text-6xl sm:text-6xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight mb-6 animate-fade-in hover-scale cursor-highlight">
            Accelerating Growth With Websites 🚀
          </h1>
          <p className="text-md sm:text-md md:text-xl text-muted-foreground mb-6 animate-fade-in cursor-highlight" style={{ animationDelay: '0.2s' }}>
            We create incredible websites for Businesses
          </p>
          <div className="flex flex-col items-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-base sm:text-lg md:text-lg bg-[#FF5733] hover:bg-[#FF5733]/90 hover-scale animate-fade-in modern-button button-glow mb-2" 
              style={{ animationDelay: '0.4s' }}
              asChild
            >
              <a 
                href="https://cal.com/gagan-ahuja/consulting" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 ml-2" />
              </a>
            </Button>
            <p className="text-zinc-200 text-sm font-medium animate-fade-in cursor-highlight" style={{ animationDelay: '0.5s' }}>
              Worth <span className="text-[#FF5733] font-bold">$1000</span> Dollars
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-2 bg-zinc-800/70 rounded-full px-6 py-2 border border-zinc-700/50 shadow-lg">
              <Timer size={20} className="text-[#FF5733] animate-pulse" />
              <span className="text-white font-bold text-base sm:text-lg md:text-xl cursor-highlight">{formatTime()}</span>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 cursor-highlight">Limited time offer - Expires soon!</p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-center text-xl sm:text-2xl text-zinc-300 mb-6 hidden md:block cursor-highlight">Steps to Work With Us</h3>
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
                      <span className="text-lg sm:text-xl font-bold text-white cursor-highlight">{step.number}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-zinc-700/50" style={{ width: 'calc(100% + 4rem)' }}></div>
                    )}
                  </div>
                  <p className="text-zinc-300 text-center text-xs sm:text-sm px-1 cursor-highlight">{step.title}</p>
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
