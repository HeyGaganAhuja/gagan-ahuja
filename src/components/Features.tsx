
import React from 'react';
import { MessageSquare, Eye, Globe, Github, Sparkles, Puzzle } from 'lucide-react';
import FeatureIcon from './FeatureIcon';

const featuresData = [
  {
    icon: <MessageSquare className="w-8 h-8 text-[#FF5733]" />,
    title: "Instant & intuitive",
    description: "Live rendering, handles image input, has instant undo and lets you collaborate with branching. The AI fixes your bugs. One-click deploy when ready."
  },
  {
    icon: <Eye className="w-8 h-8 text-[#FF5733]" />,
    title: "Beautiful design",
    description: "We believe your product should look good. Lovable follows best practice UI & UX principles to make sure every idea you bring to life is beautifully designed."
  },
  {
    icon: <Globe className="w-8 h-8 text-[#FF5733]" />,
    title: "Support any backend",
    description: "Lovable has support for databases, API integrations and back-end functionality. Connect your own or use our Supabase connector."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-[#FF5733]" />,
    title: "Select & edit",
    description: "The accuracy you need to make fine grained changes. With Select & Edit you click an element and describe what you want updated."
  },
  {
    icon: <Github className="w-8 h-8 text-[#FF5733]" />,
    title: "Github integration",
    description: "Connect Lovable to your GitHub account to automatically sync the code to your repository. Perfect for project hand offs and more advanced workflows."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-[#FF5733]/10 flex items-center justify-center rounded-full">
              <Puzzle className="w-8 h-8 text-[#FF5733]" />
            </div>
          </div>
          <p className="text-[#FF5733] uppercase text-sm font-medium tracking-wider mb-3">POWERFUL FEATURES</p>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-6 text-white max-w-3xl mx-auto">
            Everything you need to build exceptional web experiences
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuresData.map((feature, index) => (
            <div key={index} className="col-span-1">
              <div className="bg-zinc-900/90 border-zinc-800 h-full shadow-lg hover-lift rounded-[20px] p-6">
                <div className="w-12 h-12 bg-[#FF5733]/10 flex items-center justify-center mb-4 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
