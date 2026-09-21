import { ReactNode } from "react";

/**
 * AuthCard Component
 *
 * Luminous light glassmorphism card matching the PropEase landing aesthetic.
 * Features a bright frosted glass body, radiant top accent glow line,
 * geometric corner brackets, and vibrant badge styling.
 */
export function AuthCard({
  children,
  title,
  description,
  badgeText = "Dubai Lead Intelligence",
}: {
  children: ReactNode;
  title: string;
  description: string;
  badgeText?: string;
}) {
  return (
    <div className="relative group">
      {/* Outer ambient glow halo */}
      <div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500/25 via-amber-400/25 to-orange-600/25 blur-xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"
        aria-hidden="true"
      />

      {/* Main luminous card container */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-white/70 dark:border-white/20 bg-white/95 dark:bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-9 shadow-[0_20px_60px_-15px_rgba(249,115,22,0.18),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)_inset] transition-all">
        {/* Top glowing gradient border accent */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"
          aria-hidden="true"
        />

        {/* Decorative architectural corner brackets */}
        <div
          className="border-orange-500 absolute -top-2 -left-2 h-3.5 w-3.5 border-t-2 border-l-2"
          aria-hidden="true"
        />
        <div
          className="border-orange-500 absolute -right-2 -bottom-2 h-3.5 w-3.5 border-r-2 border-b-2"
          aria-hidden="true"
        />

        {/* Badge & Titles */}
        <div className="mb-7 flex flex-col items-center text-center">
          {badgeText && (
            <div
              className="border border-orange-500/30 bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 mb-3.5 inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold shadow-xs"
              role="note"
            >
              <span
                className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"
                aria-hidden="true"
              />
              <span className="tracking-wide">{badgeText}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Form Slot */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
