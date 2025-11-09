import { fail, type Actions } from "@sveltejs/kit";
import { adminClient } from "$lib/supabase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const { data: heroContent, error } = await adminClient
    .from("hero_content")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error loading hero content:", error);
  }

  return {
    heroContent: heroContent || null,
  };
};

export const actions: Actions = {
  update: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const data: any = {
      title_id: formData.get("title_id") as string,
      title_en: formData.get("title_en") as string,
      description_id: formData.get("description_id") as string,
      description_en: formData.get("description_en") as string,
      badge_text_id: formData.get("badge_text_id") as string,
      badge_text_en: formData.get("badge_text_en") as string,
      cta_primary_text_id: formData.get("cta_primary_text_id") as string,
      cta_primary_text_en: formData.get("cta_primary_text_en") as string,
      cta_primary_url: formData.get("cta_primary_url") as string,
      cta_secondary_text_id: formData.get("cta_secondary_text_id") as string,
      cta_secondary_text_en: formData.get("cta_secondary_text_en") as string,
      cta_secondary_url: formData.get("cta_secondary_url") as string,
      status: "published" as const,
      updated_by: user.id,
    };

    // Parse stats JSON if provided
    const statsInput = formData.get("stats") as string;
    if (statsInput) {
      try {
        const parsedStats = JSON.parse(statsInput);
        if (Array.isArray(parsedStats)) {
          data.stats = parsedStats;
        }
      } catch (error) {
        console.error("Invalid stats JSON:", error);
        // Don't fail, just skip stats update
      }
    }

    // Check if hero content exists
    const { data: existing } = await adminClient
      .from("hero_content")
      .select("id")
      .limit(1)
      .single();

    let result;
    if (existing) {
      // Update existing
      result = await adminClient
        .from("hero_content")
        .update(data)
        .eq("id", existing.id);
    } else {
      // Create new
      result = await adminClient.from("hero_content").insert([data]);
    }

    if (result.error) {
      return fail(500, { error: result.error.message });
    }

    return { success: true, message: "Hero content updated successfully" };
  },
};
