"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  user: User | null;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  workspace?: string;
  isLoading: boolean;
}

/**
 * Hook to retrieve the currently logged in Supabase user
 * and provide reactive profile metadata (name, email, initials, avatar).
 */
export function useUser(): UserProfile {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get current user session
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Compute name with fallbacks
  const metadataName =
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.name as string) ||
    "";

  let displayName = metadataName;
  if (!displayName && user?.email) {
    const prefix = user.email.split("@")[0];
    displayName = prefix
      .replace(/[._-]/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  if (!displayName) {
    displayName = "Agent";
  }

  const email = user?.email || "agent@propease.ae";

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "AG";

  return {
    user,
    name: displayName,
    email,
    avatar: (user?.user_metadata?.avatar_url as string) || "/avatars/avatar.png",
    initials,
    workspace: (user?.user_metadata?.workspace as string) || "Apex Real Estate Dubai",
    isLoading,
  };
}
