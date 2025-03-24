
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const reviewsData = [
  {
    name: "Michael Thompson",
    company: "Fusion Tech",
    review: "Gagan helped us completely transform our online presence. Our website now converts 3x better than before, and the UX improvements have been praised by our customers.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    company: "Elevate Retail",
    review: "The e-commerce platform Gagan built for us has significantly streamlined our operations. The sales dashboard provides valuable insights, and customer feedback has been overwhelmingly positive.",
    rating: 5
  },
  {
    name: "David Chen",
    company: "Innovate Solutions",
    review: "Working with Gagan Consults was a game-changer for our business. The marketing consultation helped us identify key growth opportunities we had been missing.",
    rating: 5
  },
  {
    name: "Jessica Williams",
    company: "Bloom Beauty",
    review: "Our website redesign exceeded all expectations. Gagan understood our brand and created a digital experience that truly resonates with our audience. Highly recommended!",
    rating: 5
  },
  {
    name: "Robert Miller",
    company: "Prime Properties",
    review: "The website development process was smooth from start to finish. Gagan's team was responsive, professional, and delivered exactly what we needed for our real estate business.",
    rating: 5
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Client Reviews</h2>
          <p className="text-muted-foreground">What our clients are saying about our services</p>
        </div>
        
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {reviewsData.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border border-border/40 bg-white">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-4 flex-grow italic">{review.review}</p>
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative inset-0 translate-y-0 mr-2 bg-white border-border/40 hover:bg-secondary" />
            <CarouselNext className="relative inset-0 translate-y-0 ml-2 bg-white border-border/40 hover:bg-secondary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
