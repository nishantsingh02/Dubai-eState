"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

/**
 * LoginForm Component
 *
 * Direct Supabase authentication with immediate state synchronization,
 * error handling, and router navigation.
 */
export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message || "Failed to sign in. Please check your credentials.");
          return;
        }

        if (data?.user) {
          toast.success("Welcome back! Loading your dashboard...");
          router.push("/dashboard/leads");
          router.refresh();
        }
      } catch (err: any) {
        toast.error(err?.message || "An unexpected error occurred during sign in.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="login-email"
          className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
        >
          Email address
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            id="login-email"
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
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
          >
            Password
          </label>
          <Link
            href="#"
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative flex items-center">
          <Lock className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
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

      {/* Submit */}
      <button
        type="submit"
        className="mt-2 w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        disabled={isPending}
        id="login-submit"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          <>
            Sign in to Dashboard
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700/80" />
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Don&apos;t have an account?
        </span>
        <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700/80" />
      </div>

      {/* Switch to signup */}
      <Link
        href="/signup"
        className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center shadow-xs"
        id="go-to-signup"
      >
        Create a Free Account
      </Link>
    </form>
  );
}
