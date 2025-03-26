
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart, Palette, Gift } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const assetsData = [
  {
    icon: <FileText className="h-8 w-8 mb-2 text-[#FF5733]" />,
    title: "Website Audit Checklist",
    description: "A comprehensive checklist to evaluate your website's performance, SEO, and user experience.",
    link: "#"
  },
  {
    icon: <BarChart className="h-8 w-8 mb-2 text-[#FF5733]" />,
    title: "Digital Marketing Guide",
    description: "Learn effective strategies to boost your online presence and drive quality traffic to your website.",
    link: "#"
  },
  {
    icon: <Palette className="h-8 w-8 mb-2 text-[#FF5733]" />,
    title: "UI/UX Best Practices",
    description: "Design principles and tips to create user-friendly interfaces that convert visitors into customers.",
    link: "#"
  }
];

const FreeAssets = () => {
  return (
    <section id="assets" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-[#FF5733]/10 flex items-center justify-center rounded-full">
              <Gift className="w-8 h-8 text-[#FF5733]" />
            </div>
          </div>
          <p className="text-[#FF5733] uppercase text-sm font-medium tracking-wider mb-3">FREE RESOURCES</p>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-6 text-white max-w-3xl mx-auto">
            Download these valuable assets to help grow your business
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {assetsData.map((asset, index) => (
            <Card key={index} className="zapier-card border border-zinc-800 bg-zinc-900/90 shadow-lg hover-lift rounded-[20px]">
              <CardHeader>
                <div className="text-[#FF5733] flex h-12 w-12 items-center justify-center rounded-full bg-[#FF5733]/10 mb-4">
                  {asset.icon}
                </div>
                <CardTitle className="text-xl text-white">{asset.title}</CardTitle>
                <CardDescription className="text-zinc-400">{asset.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-[#FF5733] text-white hover:text-white transition-all duration-300 modern-button" asChild>
                  <a 
                    href={asset.link} 
                    className="flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeAssets;
