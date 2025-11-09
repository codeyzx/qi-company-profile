import { error } from "@sveltejs/kit";
import { adminClient } from "$lib/supabase";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    // Get site config
    const { data: configData, error: configError } = await adminClient
      .from("site_config")
      .select("*")
      .order("config_key", { ascending: true });

    if (configError) {
      console.error("Error loading site config:", configError);
      throw error(500, "Failed to load site config");
    }

    return {
      siteConfig: configData || [],
    };
  } catch (err) {
    console.error("Load error:", err);
    throw error(500, "Failed to load config data");
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData();

      const configData = {
        key: formData.get("config_key") as string,
        value_id: formData.get("config_value") as string,
        value_en: formData.get("config_value") as string,
        description: (formData.get("description") as string) || null,
      };

      const { error: insertError } = await adminClient
        .from("site_config")
        .insert([configData]);

      if (insertError) {
        console.error("Insert error:", insertError);
        return {
          error: "Failed to create config: " + insertError.message,
        };
      }

      return {
        success: true,
        message: "Configuration created successfully",
      };
    } catch (err) {
      console.error("Create error:", err);
      return {
        error: "Failed to create configuration",
      };
    }
  },

  update: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = formData.get("id") as string;

      if (!id) {
        return { error: "ID is required for update" };
      }

      const configData = {
        key: formData.get("config_key") as string,
        value_id: formData.get("config_value") as string,
        value_en: formData.get("config_value") as string,
        description: (formData.get("description") as string) || null,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await adminClient
        .from("site_config")
        .update(configData)
        .eq("id", id);

      if (updateError) {
        console.error("Update error:", updateError);
        return {
          error: "Failed to update config: " + updateError.message,
        };
      }

      return {
        success: true,
        message: "Configuration updated successfully",
      };
    } catch (err) {
      console.error("Update error:", err);
      return {
        error: "Failed to update configuration",
      };
    }
  },

  delete: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = formData.get("id") as string;

      if (!id) {
        return { error: "ID is required for delete" };
      }

      const { error: deleteError } = await adminClient
        .from("site_config")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Delete error:", deleteError);
        return {
          error: "Failed to delete config: " + deleteError.message,
        };
      }

      return {
        success: true,
        message: "Configuration deleted successfully",
      };
    } catch (err) {
      console.error("Delete error:", err);
      return {
        error: "Failed to delete configuration",
      };
    }
  },
};
