
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

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
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-[#FF5733]/10 flex items-center justify-center rounded-full">
                <HelpCircle className="w-8 h-8 text-[#FF5733]" />
              </div>
            </div>
            <p className="text-[#FF5733] uppercase text-sm font-medium tracking-wider mb-3">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-6 text-white max-w-3xl mx-auto">
              Find answers to common questions about our services
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="mb-8">
            {displayItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800 bg-zinc-900/20 mb-3 rounded-lg">
                <AccordionTrigger className="text-left font-medium px-4 text-white">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 px-4">
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
                className="border-[#FF5733]/30 text-[#FF5733] hover:bg-[#FF5733]/5"
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
