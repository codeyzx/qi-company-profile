import { error } from "@sveltejs/kit";
import { adminClient } from "$lib/supabase";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    // Get about content
    const { data: aboutData, error: aboutError } = await adminClient
      .from("about_content")
      .select("*")
      .order("created_at", { ascending: true });

    if (aboutError) {
      console.error("Error loading about content:", aboutError);
      throw error(500, "Failed to load about content");
    }

    return {
      aboutContent: aboutData || [],
    };
  } catch (err) {
    console.error("Load error:", err);
    throw error(500, "Failed to load about data");
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData();

      const aboutData = {
        main_title_id: formData.get("title_id") as string,
        main_title_en: formData.get("title_en") as string,
        main_description_id: formData.get("content_id") as string,
        main_description_en: formData.get("content_en") as string,
        slogan_id: (formData.get("highlight_text_id") as string) || null,
        slogan_en: (formData.get("highlight_text_en") as string) || null,
        image_url: (formData.get("image_url") as string) || null,
        values: null,
        stats: null,
        status: "published",
      };

      const { error: insertError } = await adminClient
        .from("about_content")
        .insert([aboutData]);

      if (insertError) {
        console.error("Insert error:", insertError);
        return {
          error: "Failed to create about content: " + insertError.message,
        };
      }

      return {
        success: true,
        message: "About content created successfully",
      };
    } catch (err) {
      console.error("Create error:", err);
      return {
        error: "Failed to create about content",
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

      const aboutData = {
        main_title_id: formData.get("title_id") as string,
        main_title_en: formData.get("title_en") as string,
        main_description_id: formData.get("content_id") as string,
        main_description_en: formData.get("content_en") as string,
        slogan_id: (formData.get("highlight_text_id") as string) || null,
        slogan_en: (formData.get("highlight_text_en") as string) || null,
        image_url: (formData.get("image_url") as string) || null,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await adminClient
        .from("about_content")
        .update(aboutData)
        .eq("id", id);

      if (updateError) {
        console.error("Update error:", updateError);
        return {
          error: "Failed to update about content: " + updateError.message,
        };
      }

      return {
        success: true,
        message: "About content updated successfully",
      };
    } catch (err) {
      console.error("Update error:", err);
      return {
        error: "Failed to update about content",
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
        .from("about_content")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Delete error:", deleteError);
        return {
          error: "Failed to delete about content: " + deleteError.message,
        };
      }

      return {
        success: true,
        message: "About content deleted successfully",
      };
    } catch (err) {
      console.error("Delete error:", err);
      return {
        error: "Failed to delete about content",
      };
    }
  },
};
