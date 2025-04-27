
import React from 'react';
import { Search, FileText, BarChart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Identify Your Problems in Lead Generation and Sales System",
    description: "Our dedicated account executive will analyse the current issues in your system.",
    step: "Step 1"
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "ICP and Offer Creation",
    description: "We create your ICP list with a compelling offer that your prospects can't say \"NO TO\". If needed, we will revamp your current ICP and offer to ensure we have accurate data.",
    step: "Step 2"
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Campaign Setup and Optimization",
    description: "We set up and optimize your campaign for maximum performance and results.",
    step: "Step 3"
  }
];

const WhatYouReceive = () => {
  return (
    <section className="py-20 bg-black" id="whatyoureceive">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-white">
            How We Help You?
          </h2>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/20" />
          
          {/* Steps */}
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`flex items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
                  
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <Card className="p-8 bg-zinc-900/90 border-zinc-800">
                      <div className="mb-4">
                        {step.icon}
                      </div>
                      <div className="text-sm text-primary mb-3">{step.step}</div>
                      <h3 className="text-2xl mb-4 text-white">{step.title}</h3>
                      <p className="text-zinc-400">{step.description}</p>
                    </Card>
                  </div>
                  <div className="w-1/2" /> {/* Spacer */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouReceive;
