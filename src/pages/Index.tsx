
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Reviews from '@/components/Reviews';
import CallToAction from '@/components/CallToAction';
import FreeAssets from '@/components/FreeAssets';
import FAQ from '@/components/FAQ';
import Support from '@/components/Support';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services id="services" />
      <Reviews id="reviews" />
      <CallToAction />
      <FreeAssets id="assets" />
      <FAQ id="faq" />
      <Support />
      <Footer />
    </div>
  );
};

export default Index;
