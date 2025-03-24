
import React from 'react';
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
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Reviews />
      <CallToAction />
      <FreeAssets />
      <FAQ />
      <Support />
      <Footer />
    </div>
  );
};

export default Index;
