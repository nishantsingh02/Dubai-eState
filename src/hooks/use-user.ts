"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

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

    async function fetchUserData() {
      try {
        // 1. Fast path: Read active session from storage/cookie
        const { data: sessionData } = await supabase.auth.getSession();
        if (isMounted && sessionData?.session?.user) {
          setUser(sessionData.session.user);
          setIsLoading(false);
        }

        // 2. Validate current user with Supabase server
        const { data: userData } = await supabase.auth.getUser();
        if (isMounted && userData?.user) {
          setUser(userData.user);
        }
      } catch {
        // Silently handle any auth fetch error
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchUserData();

    // 3. Listen for real-time auth state transitions
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (!isMounted) return;
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
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
