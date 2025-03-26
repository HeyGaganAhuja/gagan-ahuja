import React from 'react';
import { MessageSquare, Eye, Globe, Github, Sparkles } from 'lucide-react';
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
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold mb-4">Powerful Features</h2>
          <p className="text-zinc-300 max-w-2xl mx-auto">Everything you need to build exceptional web experiences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-6xl mx-auto">
          {featuresData.map((feature, index) => (
            <FeatureIcon 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
