
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="w-full py-4 bg-background/80 backdrop-blur-sm fixed top-0 z-50 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-serif font-semibold">
          Gagan Consults
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#reviews" className="text-foreground/80 hover:text-foreground transition-colors">
            Reviews
          </a>
          <a href="#assets" className="text-foreground/80 hover:text-foreground transition-colors">
            Free Assets
          </a>
          <a href="#faq" className="text-foreground/80 hover:text-foreground transition-colors">
            FAQ
          </a>
          <Button asChild className="bg-accent hover:bg-accent/90">
            <a href="https://cal.com/gagan-ahuja/consulting" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-[61px] bg-background z-40 flex flex-col p-5 space-y-5 md:hidden">
          <a 
            href="#services" 
            className="text-lg p-2" 
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a 
            href="#reviews"
            className="text-lg p-2"
            onClick={() => setIsOpen(false)}
          >
            Reviews
          </a>
          <a 
            href="#assets"
            className="text-lg p-2"
            onClick={() => setIsOpen(false)}
          >
            Free Assets
          </a>
          <a 
            href="#faq"
            className="text-lg p-2"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </a>
          <Button className="w-full bg-accent hover:bg-accent/90" asChild>
            <a 
              href="https://cal.com/gagan-ahuja/consulting" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              Book a Call
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
