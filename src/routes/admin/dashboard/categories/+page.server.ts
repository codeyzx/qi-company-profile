import { fail, type Actions } from "@sveltejs/kit";
import { adminClient } from "$lib/supabase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const { data: categories, error } = await adminClient
    .from("game_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error loading categories:", error);
  }

  return {
    categories: categories || [],
  };
};

export const actions: Actions = {
  create: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();

    // Validate required fields
    const titleId = formData.get("title_id") as string;
    const titleEn = formData.get("title_en") as string;
    const descriptionId = formData.get("description_id") as string;
    const descriptionEn = formData.get("description_en") as string;

    if (!titleId || !titleEn || !descriptionId || !descriptionEn) {
      return fail(400, {
        error: "Title and description are required in both languages",
      });
    }

    const data = {
      title_id: titleId,
      title_en: titleEn,
      description_id: descriptionId,
      description_en: descriptionEn,
      icon: (formData.get("icon") as string) || null,
      badge_id: (formData.get("badge_id") as string) || null,
      badge_en: (formData.get("badge_en") as string) || null,
      count_text_id: (formData.get("count_text_id") as string) || null,
      count_text_en: (formData.get("count_text_en") as string) || null,
      gradient_from: (formData.get("gradient_from") as string) || "#F5CB3B",
      gradient_to: (formData.get("gradient_to") as string) || "#322F81",
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      status: "published" as const,
      updated_by: user.id,
    };

    const { error } = await adminClient.from("game_categories").insert([data]);

    if (error) {
      console.error("Error creating category:", error);
      return fail(500, { error: error.message });
    }

    return { success: true, message: "Category created successfully" };
  },

  update: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return fail(400, { error: "Category ID is required" });
    }

    // Validate required fields
    const titleId = formData.get("title_id") as string;
    const titleEn = formData.get("title_en") as string;
    const descriptionId = formData.get("description_id") as string;
    const descriptionEn = formData.get("description_en") as string;

    if (!titleId || !titleEn || !descriptionId || !descriptionEn) {
      return fail(400, {
        error: "Title and description are required in both languages",
      });
    }

    const data = {
      title_id: titleId,
      title_en: titleEn,
      description_id: descriptionId,
      description_en: descriptionEn,
      icon: (formData.get("icon") as string) || null,
      badge_id: (formData.get("badge_id") as string) || null,
      badge_en: (formData.get("badge_en") as string) || null,
      count_text_id: (formData.get("count_text_id") as string) || null,
      count_text_en: (formData.get("count_text_en") as string) || null,
      gradient_from: (formData.get("gradient_from") as string) || "#F5CB3B",
      gradient_to: (formData.get("gradient_to") as string) || "#322F81",
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      updated_by: user.id,
    };

    const { error } = await adminClient
      .from("game_categories")
      .update(data)
      .eq("id", id);

    if (error) {
      console.error("Error updating category:", error);
      return fail(500, { error: error.message });
    }

    return { success: true, message: "Category updated successfully" };
  },

  delete: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return fail(400, { error: "Category ID is required" });
    }

    // Use admin client to ensure proper permissions
    const { error } = await adminClient
      .from("game_categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting category:", error);
      return fail(500, { error: error.message });
    }

    return { success: true, message: "Category deleted successfully" };
  },
};
