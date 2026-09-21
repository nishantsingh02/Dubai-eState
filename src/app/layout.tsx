import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "PropEase — Dubai Lead Intelligence for Real Estate Agencies",
  description:
    "AI-powered lead scoring and prioritization for Dubai real estate agencies. Score every inquiry 0–100, revive dormant leads, and know exactly who to call first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistMono.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
