"use client";

// External imports
import Link from "next/link";
import { useState } from "react";
import { Menu, Building2 } from "lucide-react";

// Internal imports
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/**
 * NavLink component for consistent styling of navigation links
 */
const NavLink = ({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-md px-4 py-2 text-sm font-medium tracking-wide transition-all",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Home", "Features", "Pricing", "Testimonials"];
  const { activeHash } = useActiveSection(navItems);

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed inset-x-0 top-4 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-background/90 border-border/30 relative rounded-full border shadow-lg backdrop-blur-xl">
            <nav
              className="flex h-16 items-center justify-between px-4 sm:px-6"
              aria-label="Main navigation"
            >
              {/* Logo */}
              <Link
                href="/"
                className="group flex items-center gap-2.5"
                aria-label="PropEase homepage"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                    <Building2 className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-lg font-bold tracking-tight">
                    PropEase
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => {
                  const hash = `#${item.toLowerCase()}`;
                  const isActive = activeHash === hash;
                  return (
                    <NavLink key={item} href={hash} isActive={isActive}>
                      {item}
                    </NavLink>
                  );
                })}
              </div>

              {/* Desktop CTA */}
              <div className="hidden items-center gap-3 md:flex">
                <Link href="/login">
                  <Button variant="ghost" className="font-medium tracking-wide">
                    Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 font-medium tracking-wide rounded-full">
                    Start Free Trial
                  </Button>
                </Link>

                <ModeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-background/80 rounded-full p-2 transition-colors md:hidden"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu
                  className="text-muted-foreground h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-background/80 fixed inset-0 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="bg-background/95 border-border/50 fixed inset-x-0 top-0 border-b p-6">
            <div className="mt-20 flex flex-col gap-2 space-y-1">
              {navItems.map((item) => {
                const hash = `#${item.toLowerCase()}`;
                const isActive = activeHash === hash;
                return (
                  <NavLink
                    key={item}
                    href={hash}
                    isActive={isActive}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </NavLink>
                );
              })}
              <div className="border-border/50 mt-6 grid grid-cols-2 gap-3 border-t pt-6">
                <Link href="/login" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full font-medium tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/login" className="w-full">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-end pt-6">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
