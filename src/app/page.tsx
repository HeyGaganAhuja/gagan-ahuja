
import ScrollAnimator from '@/components/ScrollAnimator';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatYouReceive from '@/components/WhatYouReceive';
import Reviews from '@/components/Reviews';
import CallToAction from '@/components/CallToAction';
import FreeAssets from '@/components/FreeAssets';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ScrollAnimator />
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
}
