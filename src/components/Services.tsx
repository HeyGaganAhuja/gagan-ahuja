
import React from 'react';
import { Layout, ShoppingCart, Code, BarChart3, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const servicesData = [
  {
    icon: <Layout className="h-12 w-12 mb-4 text-primary" />,
    title: "UI/UX Design",
    description: "Creating beautiful, user-centered interfaces that enhance customer satisfaction and boost conversion rates."
  },
  {
    icon: <ShoppingCart className="h-12 w-12 mb-4 text-primary" />,
    title: "E-commerce Platform",
    description: "Building high-converting online stores with seamless checkout experiences and robust product management."
  },
  {
    icon: <Code className="h-12 w-12 mb-4 text-primary" />,
    title: "Website Development",
    description: "Developing fast, responsive, and SEO-friendly websites tailored to your business needs and goals."
  },
  {
    icon: <BarChart3 className="h-12 w-12 mb-4 text-primary" />,
    title: "Marketing Consultation",
    description: "Strategic guidance to boost your online presence and drive sales growth through effective digital marketing."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">Our Services</h2>
          <p className="text-muted-foreground">Comprehensive solutions to accelerate your business growth</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="zapier-card border border-border/40 bg-card flex flex-col h-full">
              <CardHeader className="text-center pt-8 pb-2">
                <div className="flex justify-center mb-2 w-16 h-16 mx-auto rounded-full bg-primary/10 items-center">
                  {React.cloneElement(service.icon, { className: 'h-8 w-8 text-primary' })}
                </div>
                <CardTitle className="mt-2 text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-2 pb-6">
                <Button 
                  className="w-full bg-secondary hover:bg-primary text-foreground hover:text-white transition-all duration-300 modern-button"
                >
                  <MessageCircle size={18} className="mr-2 group-hover:animate-pulse" />
                  <span>Ask a Query</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
