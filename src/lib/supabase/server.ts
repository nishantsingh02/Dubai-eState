import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client for use in Server Components and Server Actions.
 * Reads/writes session cookies on the server side.
 */
export async function createClient() {
  if (!SUPABASE_URL || !SUPABASE_URL.startsWith("http")) {
    throw new Error(
      "Missing or invalid NEXT_PUBLIC_SUPABASE_URL in .env.local — " +
      "add your Supabase project URL (e.g. https://xxxx.supabase.co) and restart the dev server."
    );
  }

  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local — " +
      "add your Supabase anon/public key and restart the dev server."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component — cookies can only be set in Server Actions or Route Handlers
        }
      },
    },
  });
}
