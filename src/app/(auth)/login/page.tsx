import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/auth-card";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In — PropEase Dubai Lead Intelligence",
  description:
    "Sign in to PropEase to access your Dubai real estate lead intelligence dashboard.",
};

/**
 * Login Page
 */
export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your PropEase account"
    >
      <LoginForm />
    </AuthCard>
  );
}
