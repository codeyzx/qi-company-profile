import { error } from "@sveltejs/kit";
import { adminClient } from "$lib/supabase";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    // Get contact info
    const { data: contactData, error: contactError } = await adminClient
      .from("contact_info")
      .select("*")
      .order("created_at", { ascending: true });

    if (contactError) {
      console.error("Error loading contact info:", contactError);
      throw error(500, "Failed to load contact info");
    }

    return {
      contactInfo: contactData || [],
    };
  } catch (err) {
    console.error("Load error:", err);
    throw error(500, "Failed to load contact data");
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData();

      const contactData = {
        contact_type: formData.get("contact_type") as string,
        label_id: formData.get("label_id") as string,
        label_en: formData.get("label_en") as string,
        value: formData.get("value") as string,
        display_order: parseInt(formData.get("display_order") as string) || 0,
        is_public: formData.get("is_public") === "on",
        icon: (formData.get("icon") as string) || null,
        link_url: (formData.get("link_url") as string) || null,
      };

      const { error: insertError } = await adminClient
        .from("contact_info")
        .insert([contactData]);

      if (insertError) {
        console.error("Insert error:", insertError);
        return {
          error: "Failed to create contact info: " + insertError.message,
        };
      }

      return {
        success: true,
        message: "Contact info created successfully",
      };
    } catch (err) {
      console.error("Create error:", err);
      return {
        error: "Failed to create contact info",
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

      const contactData = {
        contact_type: formData.get("contact_type") as string,
        label_id: formData.get("label_id") as string,
        label_en: formData.get("label_en") as string,
        value: formData.get("value") as string,
        display_order: parseInt(formData.get("display_order") as string) || 0,
        is_public: formData.get("is_public") === "on",
        icon: (formData.get("icon") as string) || null,
        link_url: (formData.get("link_url") as string) || null,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await adminClient
        .from("contact_info")
        .update(contactData)
        .eq("id", id);

      if (updateError) {
        console.error("Update error:", updateError);
        return {
          error: "Failed to update contact info: " + updateError.message,
        };
      }

      return {
        success: true,
        message: "Contact info updated successfully",
      };
    } catch (err) {
      console.error("Update error:", err);
      return {
        error: "Failed to update contact info",
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
        .from("contact_info")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Delete error:", deleteError);
        return {
          error: "Failed to delete contact info: " + deleteError.message,
        };
      }

      return {
        success: true,
        message: "Contact info deleted successfully",
      };
    } catch (err) {
      console.error("Delete error:", err);
      return {
        error: "Failed to delete contact info",
      };
    }
  },
};
