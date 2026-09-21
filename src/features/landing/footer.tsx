"use client";

// External imports
import Link from "next/link";
import { Building2 } from "lucide-react";

// Internal imports
import { XIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

/**
 * FooterHeading component for consistent section headings
 */
const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
    {children}
  </h3>
);

/**
 * FooterLink component for consistent link styling
 */
const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
  >
    {children}
  </Link>
);

/**
 * Navigation data for footer links — PropEase specific
 */
const navigation = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Agency Stories", href: "#testimonials" },
    { name: "Live Dashboard", href: "/login" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  support: [
    { name: "Import Guide", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "API Docs", href: "#" },
    { name: "Status", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
  ],
  social: [
    {
      name: "X",
      href: "https://x.com/KaraBharat",
      openInNewTab: true,
      icon: XIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/KaraBharat/shadcn-crm-dashboard",
      openInNewTab: true,
      icon: GitHubIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/kara-bharat/",
      openInNewTab: true,
      icon: LinkedInIcon,
    },
  ],
};

/**
 * Main Footer component
 */
export function Footer() {
  return (
    <footer
      className="border-border/50 relative border-t"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Background elements */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-50"
        aria-hidden="true"
      ></div>
      <div
        className="bg-orange-500/10 absolute top-1/4 right-1/4 -z-10 h-64 w-64 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div className="space-y-8">
            <div className="flex items-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500"
                aria-hidden="true"
              >
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="ml-4 text-xl font-bold tracking-tight">
                PropEase
              </span>
            </div>
            <p className="text-muted-foreground text-base">
              Dubai&apos;s AI-powered lead intelligence platform. Score every inquiry.
              Revive every dormant lead. Close more deals.
            </p>
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label={item.name}
                  target={item.openInNewTab ? "_blank" : "_self"}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <FooterHeading>Product</FooterHeading>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <FooterHeading>Company</FooterHeading>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <FooterHeading>Support</FooterHeading>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <FooterHeading>Legal</FooterHeading>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-border/50 mt-12 border-t pt-8">
          <p className="text-muted-foreground text-center text-sm">
            &copy; {new Date().getFullYear()} PropEase. All rights reserved. Built for Dubai real estate agencies.
          </p>
        </div>
      </div>
    </footer>
  );
}
