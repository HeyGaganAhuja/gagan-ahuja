
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatYouReceive from '@/components/WhatYouReceive';
import Reviews from '@/components/Reviews';
import CallToAction from '@/components/CallToAction';
import FreeAssets from '@/components/FreeAssets';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Features from '@/components/Features';

const Index = () => {
  // Function to handle scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-fade-in');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('in-view');
        }
      });
    };

    // Initial check on load
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <WhatYouReceive />
      <Features />
      <Reviews />
      <CallToAction />
      <FreeAssets />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
