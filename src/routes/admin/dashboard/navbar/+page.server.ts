import type { PageServerLoad, Actions } from "./$types";
import { error, fail } from "@sveltejs/kit";

interface MenuItem {
  href: string;
  label_id: string;
  label_en: string;
  order: number;
}

interface NavbarConfig {
  id: string;
  menu_items: MenuItem[];
  status: "draft" | "published";
  version: number;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // Fetch current navbar configuration
  const { data: navbarConfig, error: navbarError } = await (supabase as any)
    .from("navbar_config")
    .select("*")
    .single();

  if (navbarError && navbarError.code !== "PGRST116") {
    console.error("Error loading navbar config:", navbarError);
    // Return default config if error
    return {
      navbarConfig: {
        menu_items: [
          { href: "#home", label_id: "Home", label_en: "Home", order: 1 },
          { href: "#berita", label_id: "Berita", label_en: "News", order: 2 },
          {
            href: "#kategori",
            label_id: "Kategori",
            label_en: "Categories",
            order: 3,
          },
          {
            href: "#tentang",
            label_id: "Tentang Kami",
            label_en: "About Us",
            order: 4,
          },
          {
            href: "#contact",
            label_id: "Kontak",
            label_en: "Contact",
            order: 5,
          },
        ],
      },
    };
  }

  return {
    navbarConfig: navbarConfig || {
      menu_items: [
        { href: "#home", label_id: "Home", label_en: "Home", order: 1 },
        { href: "#berita", label_id: "Berita", label_en: "News", order: 2 },
        {
          href: "#kategori",
          label_id: "Kategori",
          label_en: "Categories",
          order: 3,
        },
        {
          href: "#tentang",
          label_id: "Tentang Kami",
          label_en: "About Us",
          order: 4,
        },
        { href: "#contact", label_id: "Kontak", label_en: "Contact", order: 5 },
      ],
    },
  };
};

export const actions: Actions = {
  update: async ({ request, locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();
    if (!session) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = await request.formData();
    const menuItemsJson = formData.get("menu_items") as string;

    try {
      const menuItems = JSON.parse(menuItemsJson);

      // Validate menu items structure
      if (!Array.isArray(menuItems)) {
        return fail(400, { message: "Menu items must be an array" });
      }

      for (const item of menuItems) {
        if (
          !item.href ||
          !item.label_id ||
          !item.label_en ||
          typeof item.order !== "number"
        ) {
          return fail(400, { message: "Invalid menu item structure" });
        }
      }

      // Check if navbar config exists
      const { data: existingConfig } = await (supabase as any)
        .from("navbar_config")
        .select("id")
        .single();

      if (existingConfig) {
        // Update existing configuration
        const { error: updateError } = await (supabase as any)
          .from("navbar_config")
          .update({
            menu_items: menuItems,
            updated_by: session.user.id,
            status: "published",
          })
          .eq("id", existingConfig.id);

        if (updateError) {
          console.error("Error updating navbar config:", updateError);
          return fail(500, {
            message: "Failed to update navbar configuration",
          });
        }
      } else {
        // Create new configuration
        const { error: insertError } = await (supabase as any)
          .from("navbar_config")
          .insert({
            menu_items: menuItems,
            updated_by: session.user.id,
            status: "published",
          });

        if (insertError) {
          console.error("Error creating navbar config:", insertError);
          return fail(500, {
            message: "Failed to create navbar configuration",
          });
        }
      }

      return {
        success: true,
        message: "Navigation menu updated successfully!",
      };
    } catch (error) {
      console.error("Error parsing menu items:", error);
      return fail(400, { message: "Invalid JSON format for menu items" });
    }
  },
};
