
import React from 'react';

interface FeatureIconProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 p-4 bg-zinc-800 rounded-xl shadow-lg w-20 h-20 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-zinc-300 text-sm max-w-xs">{description}</p>
    </div>
  );
};

export default FeatureIcon;
