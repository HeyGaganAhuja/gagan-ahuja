
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, X, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

// Create a language context to manage the language state across the app
export const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: (lang: 'en' | 'ar') => {},
});

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<'en' | 'ar'>('en');
  const isMobile = useIsMobile();

  // Apply RTL direction when language is Arabic
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <nav 
        className={`w-full py-4 bg-background/95 backdrop-blur-sm fixed top-0 z-50 border-b border-border/40 ${language === 'ar' ? 'text-right' : 'text-left'}`}
        style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-serif font-semibold text-foreground">
            {language === 'ar' ? 'استشارات جاجان' : 'Gagan Consults'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" style={{ gap: '2rem' }}>
            <Link to="/" className="flex items-center text-foreground/80 hover:text-primary transition-colors text-sm">
              <Home size={16} className="mr-1" />
              <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </Link>
            <a href="#whatyoureceive" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              {language === 'ar' ? 'الحلول' : 'Solutions'}
            </a>
            <a href="#reviews" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              {language === 'ar' ? 'التقييمات' : 'Reviews'}
            </a>
            <a href="#assets" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              {language === 'ar' ? 'الأصول المجانية' : 'Free Assets'}
            </a>
            <a href="#faq" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
            <Link to="/score-website" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              {language === 'ar' ? 'قيم موقعك' : 'Score Your Website'}
            </Link>
            
            {/* Language toggle */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${language === 'en' ? 'border-primary' : 'border-transparent'}`}
              >
                <span className="text-lg">🇬🇧</span>
              </button>
              <button 
                onClick={() => setLanguage('ar')}
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${language === 'ar' ? 'border-primary' : 'border-transparent'}`}
              >
                <span className="text-lg">🇦🇪</span>
              </button>
            </div>
            
            <Button asChild className="bg-primary hover:bg-primary/90 modern-button">
              <a href="https://cal.com/gagan-ahuja/consulting" target="_blank" rel="noopener noreferrer">
                {language === 'ar' ? 'احجز مكالمة' : 'Book a Call'}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language toggle for mobile */}
            <div className="flex items-center mr-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-7 h-7 rounded-full flex items-center justify-center border ${language === 'en' ? 'border-primary' : 'border-transparent'}`}
              >
                <span className="text-sm">🇬🇧</span>
              </button>
              <button 
                onClick={() => setLanguage('ar')}
                className={`w-7 h-7 ml-1 rounded-full flex items-center justify-center border ${language === 'ar' ? 'border-primary' : 'border-transparent'}`}
              >
                <span className="text-sm">🇦🇪</span>
              </button>
            </div>
            
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
                className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center flex items-center justify-center" 
                onClick={() => setIsOpen(false)}
              >
                <Home size={18} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <a 
                href="#whatyoureceive" 
                className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center" 
                onClick={() => setIsOpen(false)}
              >
                {language === 'ar' ? 'الحلول' : 'Solutions'}
              </a>
              <a 
                href="#reviews"
                className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
                onClick={() => setIsOpen(false)}
              >
                {language === 'ar' ? 'التقييمات' : 'Reviews'}
              </a>
              <a 
                href="#assets"
                className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
                onClick={() => setIsOpen(false)}
              >
                {language === 'ar' ? 'الأصول المجانية' : 'Free Assets'}
              </a>
              <a 
                href="#faq"
                className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
                onClick={() => setIsOpen(false)}
              >
                {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
              </a>
              <Link 
                to="/score-website"
                className="text-lg p-2 font-medium bg-secondary/70 rounded-md text-center"
                onClick={() => setIsOpen(false)}
              >
                {language === 'ar' ? 'قيم موقعك' : 'Score Your Website'}
              </Link>
              <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                <a 
                  href="https://cal.com/gagan-ahuja/consulting" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  {language === 'ar' ? 'احجز مكالمة' : 'Book a Call'}
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </LanguageContext.Provider>
  );
};

export default Navbar;
