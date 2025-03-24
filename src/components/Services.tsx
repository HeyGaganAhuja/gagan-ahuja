
import React from 'react';
import { Layout, ShoppingCart, Code, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const servicesData = [
  {
    icon: <Layout className="h-12 w-12 mb-4" />,
    title: "UI/UX Design",
    description: "Creating beautiful, user-centered interfaces that enhance customer satisfaction and boost conversion rates."
  },
  {
    icon: <ShoppingCart className="h-12 w-12 mb-4" />,
    title: "E-commerce Platform",
    description: "Building high-converting online stores with seamless checkout experiences and robust product management."
  },
  {
    icon: <Code className="h-12 w-12 mb-4" />,
    title: "Website Development",
    description: "Developing fast, responsive, and SEO-friendly websites tailored to your business needs and goals."
  },
  {
    icon: <BarChart3 className="h-12 w-12 mb-4" />,
    title: "Marketing Consultation",
    description: "Strategic guidance to boost your online presence and drive sales growth through effective digital marketing."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Our Services</h2>
          <p className="text-muted-foreground">Comprehensive solutions to accelerate your business growth</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader className="text-center pt-8">
                <div className="flex justify-center">
                  {service.icon}
                </div>
                <CardTitle className="mt-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
