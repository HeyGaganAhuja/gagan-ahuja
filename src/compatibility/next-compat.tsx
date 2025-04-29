
/**
 * This file provides compatibility components for using the app in both Next.js and Vite contexts.
 * It creates simplified versions of Next.js components that will work in a Vite environment.
 */

import React from 'react';

export const Link = ({ href, className, children, onClick }: 
  { href: string; className?: string; children: React.ReactNode; onClick?: () => void }) => {
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
};

export const useRouter = () => {
  return {
    push: (path: string) => {
      window.location.href = path;
    },
    back: () => {
      window.history.back();
    },
    pathname: typeof window !== 'undefined' ? window.location.pathname : '',
  };
};

export const usePathname = () => {
  return typeof window !== 'undefined' ? window.location.pathname : '';
};

// Export some dummy Image component if needed
export const Image = ({ 
  src, 
  alt, 
  width, 
  height,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return <img src={src} alt={alt} width={width} height={height} className={className} />;
};
