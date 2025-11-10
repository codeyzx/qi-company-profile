import { error } from "@sveltejs/kit";
import { adminClient } from "$lib/supabase";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    // Get contact info - should only have 1 record
    const { data: contactData, error: contactError } = await adminClient
      .from("contact_info")
      .select("*")
      .limit(1)
      .single();

    if (contactError && contactError.code !== 'PGRST116') {
      console.error("Error loading contact info:", contactError);
      throw error(500, "Failed to load contact info");
    }

    return {
      contactInfo: contactData || null,
    };
  } catch (err) {
    console.error("Load error:", err);
    throw error(500, "Failed to load contact data");
  }
};

export const actions: Actions = {
  update: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = formData.get("id") as string;

      // Parse emails array
      const emailsStr = formData.get("emails") as string;
      const emails = emailsStr ? emailsStr.split('\n').map(e => e.trim()).filter(e => e) : [];

      // Parse phone numbers array
      const phonesStr = formData.get("phone_numbers") as string;
      const phoneNumbers = phonesStr ? phonesStr.split('\n').map(p => p.trim()).filter(p => p) : [];

      // Parse social links JSON
      let socialLinks = {};
      const socialLinksStr = formData.get("social_links") as string;
      if (socialLinksStr && socialLinksStr.trim()) {
        try {
          socialLinks = JSON.parse(socialLinksStr);
        } catch (e) {
          return { error: "Invalid JSON format for social links" };
        }
      }

      const contactData = {
        emails: emails,
        phone_numbers: phoneNumbers,
        social_links: socialLinks,
        operating_hours_id: (formData.get("operating_hours_id") as string) || null,
        operating_hours_en: (formData.get("operating_hours_en") as string) || null,
        address_id: (formData.get("address_id") as string) || null,
        address_en: (formData.get("address_en") as string) || null,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (id) {
        // Update existing
        result = await adminClient
          .from("contact_info")
          .update(contactData)
          .eq("id", id);
      } else {
        // Insert new
        result = await adminClient
          .from("contact_info")
          .insert([{ ...contactData, status: "published" }]);
      }

      if (result.error) {
        console.error("Save error:", result.error);
        return {
          error: "Failed to save contact info: " + result.error.message,
        };
      }

      return {
        success: true,
        message: "Contact info saved successfully",
      };
    } catch (err) {
      console.error("Save error:", err);
      return {
        error: "Failed to save contact info",
      };
    }
  },
};
