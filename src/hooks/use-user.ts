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
    let isMounted = true;

    // 1. Fast path: Read active session from storage/cookie
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        setUser(session.user);
        setIsLoading(false);
      }
    });

    // 2. Validate current user with Supabase server
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (!isMounted) return;
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    });

    // 3. Listen for real-time auth state transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Compute display name with multiple metadata fallbacks
  const metadataName =
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.name as string) ||
    (user?.user_metadata?.display_name as string) ||
    "";

  let displayName = metadataName.trim();
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
    displayName = isLoading ? "Loading..." : "Broker / Agent";
  }

  const email = user?.email || (isLoading ? "" : "broker@propease.ae");

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
