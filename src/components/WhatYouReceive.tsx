
import React from 'react';
import { Search, FileText, LayoutGrid } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-12 h-12 text-primary" />,
    title: "Identify Your Problems in Lead Generation and Sales System",
    description: "Our dedicated account executive will analyse the current issues in your system."
  },
  {
    icon: <FileText className="w-12 h-12 text-primary" />,
    title: "ICP and Offer Creation",
    description: "We create your ICP list with a compelling offer that your prospects can't say \"NO TO\". If needed, we will revamp your current ICP and offer to ensure we have accurate data."
  },
  {
    icon: <LayoutGrid className="w-12 h-12 text-primary" />,
    title: "Scalable as You Grow",
    description: "We're prepared to adapt to your changing needs."
  }
];

const WhatYouReceive = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          How We Help You?
        </h2>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-primary/20 via-primary to-primary/20" />
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative flex items-start gap-8 mb-24 last:mb-0 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-zinc-900/90 p-8 rounded-2xl border border-zinc-800">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-zinc-400">{step.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full">
                <div className="absolute w-8 h-8 bg-primary/20 rounded-full -left-2 -top-2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouReceive;
