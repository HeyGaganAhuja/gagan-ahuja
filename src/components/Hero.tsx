
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Timer } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only enable cursor effects on desktop
    if (isMobile) return;
    
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
      // Add all heading tags to the list of elements that should have hover effect
      if (
        target.tagName === 'H1' || 
        target.tagName === 'H2' || 
        target.tagName === 'H3' || 
        target.tagName === 'H4' || 
        target.tagName === 'H5' || 
        target.tagName === 'H6' || 
        target.tagName === 'P' || 
        target.tagName === 'SPAN'
      ) {
        setHoveredElement(target);
      } else {
        setHoveredElement(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleTextHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleTextHover);
    };
  }, [isVisible, isMobile]);

  // Timer countdown
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

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
      
      {/* Custom cursor effect - only show on desktop */}
      {!isMobile && (
        <>
          <div 
            className="custom-cursor" 
            style={{ 
              left: `${mousePosition.x}px`, 
              top: `${mousePosition.y}px`,
              opacity: isVisible ? 1 : 0,
              mixBlendMode: hoveredElement ? 'difference' : 'normal',
              // Add smooth transition for desktop cursor
              transition: 'transform 0.15s ease-out, opacity 0.3s ease-out, width 0.1s ease-out, height 0.1s ease-out, left 0.08s linear, top 0.08s linear'
            }}
          ></div>
          
          <div className="cursor-glow" 
            style={{ 
              left: `${mousePosition.x}px`, 
              top: `${mousePosition.y}px`,
              opacity: isVisible ? 0.6 : 0,
              transition: 'opacity 0.3s ease-out, left 0.08s linear, top 0.08s linear'
            }}
          ></div>
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1 rounded-full bg-primary/20 border border-primary/20 text-white text-sm font-medium">
              We build tech from ❤️
            </span>
          </div>
          <h1 className="text-5xl xs:text-6xl sm:text-6xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight mb-6 animate-fade-in hover-scale">
            Accelerating Growth With Websites 🚀
          </h1>
          <p className="text-md sm:text-md md:text-xl text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We create incredible websites for Businesses
          </p>
          <div className="flex flex-col items-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-base sm:text-lg md:text-lg bg-primary hover:bg-primary/90 hover-scale animate-fade-in modern-button button-glow mb-2" 
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
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <p className="text-zinc-200 text-sm font-medium animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Worth <span className="text-primary font-bold">$1000</span> Dollars
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-2 bg-zinc-800/70 rounded-full px-6 py-2 border border-zinc-700/50 shadow-lg">
              <Timer size={20} className="text-primary animate-pulse" />
              <span className="text-white font-bold text-base sm:text-lg md:text-xl">{formatTime()}</span>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Limited time offer - Expires soon!
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-center text-xl sm:text-2xl text-zinc-300 mb-8 hidden md:block">
              Steps to Work With Us
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative">
              {[
                { number: 1, title: "Describe what you want to build." },
                { number: 2, title: "We build your first version." },
                { number: 3, title: "Talk to extend your project." },
                { number: 4, title: "Share or sync to GitHub." }
              ].map((step, index) => (
                <div key={index} className="step-container">
                  <div className="flex flex-col items-center relative">
                    <div className="step-number gradient-primary">
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                    <p className="text-zinc-300 text-center text-sm mt-4 max-w-[200px]">{step.title}</p>
                  </div>
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
