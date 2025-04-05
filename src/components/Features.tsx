
import React from 'react';
import { MessageSquare, Eye, Globe, Github, Sparkles, Puzzle } from 'lucide-react';
import FeatureIcon from './FeatureIcon';

const featuresData = [
  {
    icon: <MessageSquare className="w-8 h-8 text-[#FF5733]" />,
    title: "Instant & Intuitive Builds",
    description: "Real-time updates with live previews. Share feedback, iterate instantly, and even input images for dynamic rendering. We fix bugs fast and deploy with just one click."
  },
  {
    icon: <Eye className="w-8 h-8 text-[#FF5733]" />,
    title: "Conversion-Focused Design",
    description: "Your product won’t just work—it’ll wow. Every site or app we build follows proven UI/UX principles, designed to increase engagement, build trust, and drive results."
  },
  {
    icon: <Globe className="w-8 h-8 text-[#FF5733]" />,
    title: "Backend-Ready & Scalable",
    description: "From e-commerce platforms to SaaS tools—we connect your front-end with powerful backends, APIs, and databases. You’re covered.."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-[#FF5733]" />,
    title: "Pixel-Perfect Edits",
    description: "Want a section changed? Just point and describe. We offer precise control and smart suggestions to ensure your product reflects your exact vision."
  },
  {
    icon: <Github className="w-8 h-8 text-[#FF5733]" />,
    title: "Github integration",
    description: "We sync your codebase directly to GitHub, making handoffs smooth and managing updates effortless—ideal for scaling teams or collaborative projects."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-[#FF5733]/10 flex items-center justify-center rounded-full mx-auto">
            <Puzzle className="w-8 h-8 text-[#FF5733]" />
          </div>
          
          <p className="text-[#FF5733] uppercase text-sm font-medium tracking-wider mb-3">POWERFUL FEATURES</p>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-6 text-white max-w-3xl mx-auto">
            Everything you need to build exceptional web experiences
          </h2>
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
