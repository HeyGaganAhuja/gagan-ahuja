
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();

  return (
    <nav className="w-full py-4 bg-background/95 backdrop-blur-sm fixed top-0 z-50 border-b border-border/40">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-serif font-semibold text-foreground">
          Gagan Consults
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8" style={{ gap: '2rem' }}>
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors text-sm">
            Home
          </Link>
          <a href="#whatyoureceive" className="text-foreground/80 hover:text-primary transition-colors text-sm">
            Solutions
          </a>
          <a href="#reviews" className="text-foreground/80 hover:text-primary transition-colors text-sm">
            Reviews
          </a>
          <a href="#assets" className="text-foreground/80 hover:text-primary transition-colors text-sm">
            Free Assets
          </a>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors text-sm flex items-center">
                <User className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
              <Button variant="secondary" onClick={signOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild variant="secondary">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
          
          <Button asChild className="bg-primary hover:bg-primary/90 modern-button">
            <a href="https://cal.com/gagan-ahuja/consulting" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} className="text-foreground" /> : <MenuIcon size={24} className="text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-[61px] bg-black/95 backdrop-blur-sm z-[100] flex flex-col p-5 space-y-5 md:hidden">
          <div className="w-full flex flex-col space-y-5">
            <Link 
              to="/" 
              className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center" 
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#whatyoureceive" 
              className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center" 
              onClick={() => setIsOpen(false)}
            >
              Solutions
            </a>
            <a 
              href="#reviews"
              className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </a>
            <a 
              href="#assets"
              className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
              onClick={() => setIsOpen(false)}
            >
              Free Assets
            </a>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link 
                to="/auth"
                className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
            
            <Button className="w-full bg-primary hover:bg-primary/90" asChild>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
