"use client";

// External imports
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Internal imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * CTAButton component for consistent call-to-action buttons
 * Reused from Hero component for consistency across the site
 */
const CTAButton = ({
  children,
  variant = "default",
  href,
  icon,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  href?: string;
  icon?: React.ReactNode;
}) => {
  const buttonClass = cn(
    "h-16 px-8 text-base font-semibold tracking-wide uppercase sm:text-lg",
    variant === "outline" && "hover:bg-background/5 border-2",
  );

  const button = (
    <Button size="lg" variant={variant as any} className={buttonClass}>
      {icon && (
        <span className="bg-primary-foreground/10 mr-3 -ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </Button>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
};

/**
 * Main CTA component
 */
export function CTA() {
  return (
    <section className="relative" aria-labelledby="cta-heading">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true"></div>
      <div className="absolute top-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" aria-hidden="true"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="relative">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="border-border/50 bg-background/80 rounded-xl border p-8 sm:p-12 lg:p-16 shadow-lg backdrop-blur-sm">
              <div className="mx-auto max-w-xl lg:max-w-none">
                <h2 id="cta-heading" className="text-center text-2xl font-bold tracking-tight uppercase sm:text-3xl lg:text-4xl">
                  Stop sitting on dead leads. Revive your pipeline today.
                </h2>
                <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-center text-lg">
                  Import your first 100 leads free. PropEase scores them, ranks them, and tells
                  you exactly which ones are worth calling — and which dormant contacts are ready
                  to buy again.
                </p>
                <div className="relative mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
                  {/* Decorative elements around buttons */}
                  <div className="border-primary/30 absolute -top-4 -left-4 h-4 w-4 border-t-2 border-l-2" aria-hidden="true"></div>
                  <div className="border-primary/30 absolute -right-4 -bottom-4 h-4 w-4 border-r-2 border-b-2" aria-hidden="true"></div>
                  
                  <CTAButton
                    href="/signup"
                    icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  >
                    IMPORT YOUR LEADS FREE
                  </CTAButton>
                  
                  <CTAButton variant="outline" href="/login">VIEW LIVE DASHBOARD</CTAButton>
                </div>
                <p className="text-muted-foreground mt-6 text-center text-sm">
                  No credit card required • Works with any existing lead spreadsheet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
