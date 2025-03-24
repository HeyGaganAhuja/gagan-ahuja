import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart, Palette } from 'lucide-react';

const assetsData = [
  {
    icon: <FileText className="h-6 w-6 text-orange-500" />,
    title: "Website Audit Checklist",
    description: "A comprehensive checklist to evaluate your website's performance, SEO, and user experience.",
    link: "#"
  },
  {
    icon: <BarChart className="h-6 w-6 text-orange-500" />,
    title: "Digital Marketing Guide",
    description: "Learn effective strategies to boost your online presence and drive quality traffic to your website.",
    link: "#"
  },
  {
    icon: <Palette className="h-6 w-6 text-orange-500" />,
    title: "UI/UX Best Practices",
    description: "Design principles and tips to create user-friendly interfaces that convert visitors into customers.",
    link: "#"
  }
];

const FreeAssets = () => {
  return (
    <section className="bg-[#1F3121] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-medium mb-4 text-white">Free Resources</h2>
          <p className="text-gray-300">Download these valuable assets to help grow your business</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {assetsData.map((asset, index) => (
            <div 
              key={index} 
              className="bg-[#2A442E] border border-[#3C5C40] rounded-2xl p-6 hover:border-[#4A6C50] transition-all duration-300 ease-in-out"
            >
              <div className="mb-4">
                {asset.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{asset.title}</h3>
              <p className="text-gray-300 mb-6">{asset.description}</p>
              <Button 
                variant="outline" 
                className="w-full border-[#4A6C50] text-white hover:bg-[#4A6C50] rounded-xl transition-colors"
              >
                <a 
                  href={asset.link} 
                  className="flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download</span>
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeAssets;
