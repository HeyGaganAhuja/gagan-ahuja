
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviewsData = [
  {
    name: "Michael Thompson",
    company: "Fusion Tech",
    review: "Gagan helped us completely transform our online presence. Our website now converts 3x better than before, and the UX improvements have been praised by our customers.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Sarah Johnson",
    company: "Elevate Retail",
    review: "The e-commerce platform Gagan built for us has significantly streamlined our operations. The sales dashboard provides valuable insights, and customer feedback has been overwhelmingly positive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "David Chen",
    company: "Innovate Solutions",
    review: "Working with Gagan Consults was a game-changer for our business. The marketing consultation helped us identify key growth opportunities we had been missing.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Jessica Williams",
    company: "Bloom Beauty",
    review: "Our website redesign exceeded all expectations. Gagan understood our brand and created a digital experience that truly resonates with our audience. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Robert Miller",
    company: "Prime Properties",
    review: "The website development process was smooth from start to finish. Gagan's team was responsive, professional, and delivered exactly what we needed for our real estate business.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-[#FF5733]/10 flex items-center justify-center rounded-full">
              <MessageSquare className="w-8 h-8 text-[#FF5733]" />
            </div>
          </div>
          <p className="text-[#FF5733] uppercase text-sm font-medium tracking-wider mb-3">CLIENT REVIEWS</p>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-6 text-white max-w-3xl mx-auto">
            What our clients are saying about our services
          </h2>
        </div>
        
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {reviewsData.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border border-zinc-800 bg-zinc-900/90">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex mb-4">
                      <div className="flex space-x-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#FF5733] text-[#FF5733]" />
                        ))}
                      </div>
                    </div>
                    <p className="mb-5 flex-grow text-sm text-zinc-300 italic">{review.review}</p>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border border-[#FF5733]/20">
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-white">{review.name}</p>
                        <p className="text-xs text-zinc-400">{review.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative inset-0 translate-y-0 mr-2 bg-zinc-900/90 border-zinc-800 hover:bg-secondary" />
            <CarouselNext className="relative inset-0 translate-y-0 ml-2 bg-zinc-900/90 border-zinc-800 hover:bg-secondary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
