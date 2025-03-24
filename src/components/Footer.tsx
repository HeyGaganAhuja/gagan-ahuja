
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif font-medium mb-4">Gagan Consults</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Helping businesses accelerate growth through strategic web design and development solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Services</a>
              </li>
              <li>
                <a href="#reviews" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Reviews</a>
              </li>
              <li>
                <a href="#assets" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Free Assets</a>
              </li>
              <li>
                <a href="#faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Refund Policy</a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Cancellation Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/70 mb-4 md:mb-0">
              © {new Date().getFullYear()} Gagan Consults. All rights reserved.
            </p>
            <div className="flex items-center">
              <form className="flex items-center">
                <Input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground mr-2 w-full md:w-auto"
                />
                <Button variant="outline" size="sm" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
