"use client";

// External imports
import { QuoteIcon } from "lucide-react";

// Internal imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

/**
 * SectionTitle component for consistent headings across sections
 */
const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <h2 className="text-3xl font-bold tracking-tight uppercase sm:text-4xl">
        <span className="relative">{title}</span>
      </h2>
      <p className="text-muted-foreground mt-4 max-w-2xl text-center text-lg">
        {subtitle}
      </p>
    </div>
  );
};

/**
 * TestimonialCard component for displaying individual customer testimonial
 */
const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: any;
  index: number;
}) => {
  return (
    <Card
      key={index}
      className="border-border/50 bg-background/60 hover:border-primary/20 group overflow-hidden rounded-xl border p-1 transition-all duration-300 hover:shadow-lg"
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div
              className="bg-orange-500/10 group-hover:bg-orange-500/20 flex h-12 w-12 items-center justify-center rounded-full transition-all"
              aria-hidden="true"
            >
              <QuoteIcon className="h-6 w-6 text-orange-500" />
            </div>
            <div className="text-muted-foreground text-right text-sm tracking-wide italic">
              Dubai Agency Story
            </div>
          </div>

          <p className="text-foreground text-lg">
            <span aria-hidden="true">&ldquo;</span>
            <span>{testimonial.quote}</span>
            <span aria-hidden="true">&rdquo;</span>
          </p>

          <div className="flex items-center gap-4 border-t pt-5">
            <Avatar className="border-border/50 h-12 w-12 border-2">
              <AvatarImage
                src={testimonial.avatar}
                alt={`${testimonial.author}'s avatar`}
              />
              <AvatarFallback className="bg-orange-500/10 text-orange-600 font-semibold">
                {testimonial.author
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold tracking-tight">
                {testimonial.author}
              </div>
              <div className="text-muted-foreground text-sm">
                {testimonial.role}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Dubai broker testimonials — real estate agency personas
 */
const testimonials = [
  {
    quote:
      "Before PropEase, I was calling 30 leads a day blind. Now I call 8 — and I'm closing twice as many deals. The AI score is spot on for Dubai buyers. A hot lead is genuinely hot.",
    author: "Tariq Mansoor",
    role: "Principal Broker, Apex Realty Dubai",
    avatar: "/avatars/avatar.png",
  },
  {
    quote:
      "I imported 4,000 leads from our old CRM. PropEase flagged 112 as reactivation candidates with real reasons — new launches, residency status changes. That pipeline alone was worth AED 200M+.",
    author: "Elena Petrov",
    role: "Senior Luxury Consultant, Savills Dubai",
    avatar: "/avatars/avatar.png",
  },
  {
    quote:
      "The phone deduplication alone saved us hours. We had the same lead listed 14 times across different portals. PropEase collapsed them into one record and told us which inquiry was freshest.",
    author: "Hassan Al-Rashidi",
    role: "CEO, Al Rashidi Properties",
    avatar: "/avatars/avatar.png",
  },
];

/**
 * Main Testimonials component
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative"
      aria-labelledby="testimonials-heading"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        aria-hidden="true"
      ></div>
      <div
        className="bg-orange-500/10 absolute right-1/4 bottom-1/4 -z-10 h-72 w-72 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <SectionTitle
          title="Dubai Brokers Love PropEase"
          subtitle="From luxury specialists to off-plan investors — hear how Dubai's top agencies use PropEase to prioritize smarter."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
