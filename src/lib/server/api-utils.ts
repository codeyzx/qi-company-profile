import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { adminClient } from "$lib/supabase";

/**
 * Check if the request is authenticated with a valid admin session
 */
export async function checkAuth(event: RequestEvent) {
  const { session } = event.locals;

  if (!session) {
    return { authenticated: false, user: null, adminUser: null };
  }

  // Verify user is an admin
  const { data: adminUser } = await adminClient
    .from("admin_users")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (!adminUser) {
    return { authenticated: false, user: session.user, adminUser: null };
  }

  return { authenticated: true, user: session.user, adminUser };
}

/**
 * Standard API response helpers
 */
export function apiSuccess<T>(data: T, status = 200) {
  return json({ success: true, data }, { status });
}

export function apiError(error: string, status = 400) {
  return json({ success: false, error }, { status });
}

/**
 * Validate required fields
 */
export function validateRequired(
  data: Record<string, any>,
  fields: string[]
): { valid: boolean; missing?: string[] } {
  const missing = fields.filter((field) => !data[field]);
  if (missing.length > 0) {
    return { valid: false, missing };
  }
  return { valid: true };
}
