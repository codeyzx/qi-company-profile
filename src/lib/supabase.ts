import {
  createBrowserClient,
  createServerClient,
  isBrowser,
} from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supabase: SupabaseClient<Database> = isBrowser()
  ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
  : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    });

// Admin client with service role (bypasses RLS)
export const adminClient = createClient(
  PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
