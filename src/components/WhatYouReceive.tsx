import React from 'react';
import { Puzzle, Layout, BarChart3, Layers, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const solutionsData = [
  {
    icon: <Puzzle className="h-8 w-8 text-[#FF5733]" />,
    title: "Affordable Solution",
    description: "Receive top-quality design services without the high price tag.",
    className: "col-span-1"
  },
  {
    icon: <Layout className="h-8 w-8 text-[#FF5733]" />,
    title: "Custom Design Solutions",
    description: "Our expertise ensures your vision becomes a reality.",
    className: "col-span-1"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-[#FF5733]" />,
    title: "Scalable as You Grow",
    description: "We're prepared to adapt to your changing needs.",
    className: "col-span-1"
  },
  {
    icon: <Layers className="h-8 w-8 text-[#FF5733]" />,
    title: "Integrated Workflow",
    description: "Effortlessly connect all your existing applications.",
    className: "col-span-1"
  },
  {
    icon: <Users className="h-8 w-8 text-[#FF5733]" />,
    title: "Real-Time Collaboration",
    description: "Work together efficiently while staying connected to all your working apps.",
    className: "col-span-1"
  }
];

const WhatYouReceive = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#FF5733] uppercase text-sm font-medium tracking-wider mb-3">WHAT YOU'LL RECEIVE</p>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-6 text-white max-w-3xl mx-auto">
            We solve the challenges that come with creative processes.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {solutionsData.map((solution, index) => (
            <div 
              key={index} 
              className={`${solution.className}`}
            >
              <Card className={`
                ${index < 3 ? 'md:col-span-1' : 'md:col-span-1'}
                bg-zinc-900/90 border-zinc-800 h-full shadow-lg hover-lift rounded-[20px]
              `}>
                <CardHeader className="pb-2">
                  <div className={`
                    w-12 h-12 
                    bg-[#FF5733]/10
                    flex items-center justify-center mb-4 rounded-full
                  `}>
                    {solution.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouReceive;
