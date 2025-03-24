
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const assetsData = [
  {
    icon: <FileText className="h-8 w-8 mb-2" />,
    title: "Website Audit Checklist",
    description: "A comprehensive checklist to evaluate your website's performance, SEO, and user experience.",
    link: "#"
  },
  {
    icon: <BarChart className="h-8 w-8 mb-2" />,
    title: "Digital Marketing Guide",
    description: "Learn effective strategies to boost your online presence and drive quality traffic to your website.",
    link: "#"
  },
  {
    icon: <Palette className="h-8 w-8 mb-2" />,
    title: "UI/UX Best Practices",
    description: "Design principles and tips to create user-friendly interfaces that convert visitors into customers.",
    link: "#"
  }
];

const FreeAssets = () => {
  return (
    <section id="assets" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Free Resources</h2>
          <p className="text-muted-foreground">Download these valuable assets to help grow your business</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {assetsData.map((asset, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <div className="text-primary">
                  {asset.icon}
                </div>
                <CardTitle className="text-xl">{asset.title}</CardTitle>
                <CardDescription>{asset.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
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
