import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/auth-card";
import { SignupForm } from "@/features/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account — PropEase Dubai Lead Intelligence",
  description:
    "Create your PropEase account to start scoring and prioritizing Dubai real estate leads.",
};

/**
 * Signup Page
 */
export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Start managing Dubai leads with AI intelligence"
    >
      <SignupForm />
    </AuthCard>
  );
}
