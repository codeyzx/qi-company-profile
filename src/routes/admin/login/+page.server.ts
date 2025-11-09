import { fail, type Actions } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";

// No load function needed - hooks.server.ts handles the redirect

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return fail(400, {
        error: "Email and password are required",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return fail(400, {
        error: error.message || "Invalid login credentials",
      });
    }

    // Use service role to verify admin status (bypass RLS infinite recursion)
    const adminClient = createClient(
      PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    console.log("Looking for admin user with ID:", data.user.id);
    console.log("User email:", data.user.email);

    // Use service role client to query admin_users (bypasses RLS)
    const { data: adminUser, error: adminError } = await adminClient
      .from("admin_users")
      .select("id, role, email")
      .eq("id", data.user.id)
      .single();

    console.log("Admin user query result:", { adminUser, adminError });
    console.log("adminError check:", !!adminError);
    console.log("!adminUser check:", !adminUser);
    console.log("Combined condition:", !!(adminError || !adminUser));

    if (adminError || !adminUser) {
      console.error("Admin verification failed:", adminError);
      // Sign out if not an admin
      await supabase.auth.signOut();
      return fail(403, {
        error: "You do not have admin access",
      });
    }

    console.log(
      "✅ Admin verification successful! Redirecting to dashboard..."
    );

    throw redirect(303, "/admin/dashboard");
  },

  register: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return fail(400, {
        error: "Email and password are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, {
        error: "Please enter a valid email address",
      });
    }

    if (password.length < 8) {
      return fail(400, {
        error: "Password must be at least 8 characters long",
      });
    }

    try {
      // Use service role client to create user without email confirmation
      const adminClient = createClient(
        PUBLIC_SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      );

      // Create user with admin client (bypasses email confirmation)
      const { data: authData, error: authError } =
        await adminClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true, // Auto-confirm email
        });

      if (authError) {
        console.error("Supabase signup error:", authError);
        return fail(400, {
          error: authError.message || "Registration failed. Please try again.",
        });
      }

      if (!authData.user) {
        return fail(400, {
          error: "Registration failed - no user returned",
        });
      }

      // Create admin user record
      const { error: insertError } = await supabase.from("admin_users").insert({
        id: authData.user.id,
        email: authData.user.email!,
        role: "admin",
      } as any);

      if (insertError) {
        console.error("Admin user insert error:", insertError);
        return fail(400, {
          error: "Failed to create admin profile: " + insertError.message,
        });
      }

      return {
        success:
          "Account created successfully! You can now login with your credentials.",
      };
    } catch (error) {
      console.error("Registration error:", error);
      return fail(500, {
        error: "An unexpected error occurred during registration",
      });
    }
  },
};
