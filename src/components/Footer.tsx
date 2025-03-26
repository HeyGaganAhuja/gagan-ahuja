
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Send, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ContactDialog from './ContactDialog';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <>
      {/* Contact Dialog */}
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
      
      {/* New Call-to-Action Section */}
      <section className="bg-black py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-[#141414] rounded-3xl px-8 py-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Grow Your Business
              </h2>
              <p className="text-zinc-400 text-lg">
                Strategic consulting to elevate your business performance and drive sustainable growth.
              </p>
            </div>
            <div className="flex justify-end items-center">
              <button 
                onClick={() => setContactDialogOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Connect Now 
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Footer */}
      <footer className="bg-black text-zinc-100 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-xl font-serif font-medium mb-4 text-white">Gagan Consults</h3>
              <p className="text-zinc-400 mb-6 max-w-md">
                Helping businesses accelerate growth through strategic web design and development solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-serif font-medium mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-zinc-400 hover:text-primary transition-colors">Services</a>
                </li>
                <li>
                  <a href="#reviews" className="text-zinc-400 hover:text-primary transition-colors">Reviews</a>
                </li>
                <li>
                  <a href="#assets" className="text-zinc-400 hover:text-primary transition-colors">Free Assets</a>
                </li>
                <li>
                  <a href="#faq" className="text-zinc-400 hover:text-primary transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-serif font-medium mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-zinc-400 hover:text-primary transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-zinc-400 hover:text-primary transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-zinc-400 hover:text-primary transition-colors">Refund Policy</a>
                </li>
                <li>
                  <a href="#" className="text-zinc-400 hover:text-primary transition-colors">Cancellation Policy</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-zinc-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} Gagan Consults. All rights reserved.
              </p>
              <div className="flex items-center">
                <form className="flex items-center" onSubmit={handleSubscribe}>
                  <Input
                    type="email"
                    placeholder="Subscribe to newsletter"
                    className="bg-zinc-900 border-black text-zinc-300 placeholder:text-zinc-500 mr-2 w-full md:w-auto"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" variant="outline" size="sm" className="bg-transparent border-black text-zinc-300 hover:bg-zinc-900">
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
