import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "PropEase — Dubai Lead Intelligence",
  description: "Sign in or create an account for PropEase Dubai Lead Intelligence.",
};

/**
 * Auth Route Group Layout
 *
 * Full-screen layout matching the landing page theme with the blueprint grid background,
 * warm amber ambient glow orbs, top navigation with logo + theme toggle, and centered card.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground flex flex-col justify-between overflow-x-hidden selection:bg-orange-500/20 selection:text-orange-600">
      {/* Background blueprint grid matching landing hero */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient glowing orbs matching landing page */}
      <div
        className="absolute top-0 right-0 -z-10 h-72 w-72 md:h-96 md:w-96 rounded-full bg-orange-400/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 left-0 -z-10 h-72 w-72 md:h-96 md:w-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Auth Navigation Header */}
      <header className="relative z-20 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 group"
          aria-label="PropEase Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold tracking-tight text-foreground text-lg leading-none">
              PropEase
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              Dubai Lead Intelligence
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-xs font-medium gap-1.5 hidden sm:inline-flex text-muted-foreground hover:text-foreground"
          >
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-in fade-in-50 zoom-in-95 duration-300">
          {children}
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="relative z-20 py-5 text-center text-xs text-muted-foreground border-t border-border/20">
        <p>© {new Date().getFullYear()} PropEase. Built for UAE Real Estate Brokers.</p>
      </footer>
    </div>
  );
}
