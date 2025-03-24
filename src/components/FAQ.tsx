
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What services does Gagan Consults offer?",
    answer: "We offer a range of services including UI/UX design, e-commerce platform development, website development, and marketing consultation for sales growth."
  },
  {
    question: "How long does it typically take to develop a website?",
    answer: "The timeline varies depending on the complexity of the project. A simple website can be completed in 2-4 weeks, while more complex e-commerce platforms might take 8-12 weeks."
  },
  {
    question: "Do you provide ongoing support after the website launch?",
    answer: "Yes, we offer various support packages to ensure your website remains secure, up-to-date, and performing optimally after launch."
  },
  {
    question: "What information do you need to get started on a project?",
    answer: "To get started, we typically need information about your business goals, target audience, brand assets, content requirements, and any technical specifications you may have."
  },
  {
    question: "How are your services priced?",
    answer: "Our pricing is customized based on the scope and requirements of each project. We provide detailed quotes after an initial consultation to understand your specific needs."
  },
  {
    question: "Can you help improve an existing website?",
    answer: "Yes, we offer website redesign and optimization services to enhance the performance, user experience, and conversion rates of existing websites."
  },
  {
    question: "What makes Gagan Consults different from other web development agencies?",
    answer: "We focus on business growth, not just aesthetics. Our strategic approach ensures that every design element and feature serves a purpose in driving your business objectives."
  },
  {
    question: "Do you offer content creation services for websites?",
    answer: "Yes, we can help with content strategy and creation, including copywriting, image selection, and video production to effectively communicate your brand message."
  }
];

const FAQ = () => {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? faqData : faqData.slice(0, 4);

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions about our services</p>
          </div>
          
          <Accordion type="single" collapsible className="mb-8">
            {displayItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {!showAll && (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowAll(true)}
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
