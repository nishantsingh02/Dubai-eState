"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

/**
 * SignupForm Component
 *
 * Full-name, email, password, confirm-password signup form.
 * Uses direct Supabase client to ensure user metadata (full_name)
 * is recorded and immediately reflected on user profile.
 */
export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;
    const confirm = formData.get("confirmPassword") as string;
    const fullName = (formData.get("fullName") as string)?.trim();

    if (!email || !password || !fullName) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              name: fullName,
            },
          },
        });

        if (error) {
          toast.error(error.message || "Failed to create account.");
          return;
        }

        // If session was established immediately (e.g. email confirmation off in Supabase)
        if (data?.session) {
          toast.success("Account created! Redirecting to your dashboard...");
          router.push("/dashboard/leads");
          router.refresh();
        } else {
          // Confirmation email sent
          setSuccess(true);
        }
      } catch (err: any) {
        toast.error(err?.message || "An unexpected error occurred during signup.");
      }
    });
  };

  if (success) {
    return (
      <div
        className="flex flex-col items-center gap-3.5 text-center py-2 animate-in fade-in-50 duration-300"
        id="signup-success"
      >
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
          Check your inbox!
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs leading-relaxed">
          We sent a confirmation link to your email. Click it to activate your PropEase account.
        </p>
        <Link
          href="/login"
          className="mt-3 w-full h-11 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 flex items-center justify-center transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="signup-name"
          className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
        >
          Full name
        </label>
        <div className="relative flex items-center">
          <User className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            id="signup-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="Alex Morgan"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all shadow-xs"
            disabled={isPending}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="signup-email"
          className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
        >
          Work email
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@agency.ae"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all shadow-xs"
            disabled={isPending}
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="signup-password"
          className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
        >
          Password{" "}
          <span className="font-normal text-slate-400 dark:text-slate-500 normal-case">
            (min. 8 characters)
          </span>
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all shadow-xs"
            disabled={isPending}
          />
          <button
            type="button"
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="signup-confirm"
          className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
        >
          Confirm password
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            id="signup-confirm"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all shadow-xs"
            disabled={isPending}
          />
          <button
            type="button"
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showConfirm ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-2 w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        disabled={isPending}
        id="signup-submit"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Creating account…
          </>
        ) : (
          <>
            Create Broker Account
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700/80" />
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Already have an account?
        </span>
        <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700/80" />
      </div>

      {/* Switch to login */}
      <Link
        href="/login"
        className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center shadow-xs"
        id="go-to-login"
      >
        Sign In Instead
      </Link>
    </form>
  );
}
