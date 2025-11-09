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
    const data = {
      title_id: formData.get("title_id") as string,
      title_en: formData.get("title_en") as string,
      description_id: formData.get("description_id") as string,
      description_en: formData.get("description_en") as string,
      icon: formData.get("icon") as string,
      badge_id: formData.get("badge_id") as string,
      badge_en: formData.get("badge_en") as string,
      count_text_id: formData.get("count_text_id") as string,
      count_text_en: formData.get("count_text_en") as string,
      gradient_from: (formData.get("gradient_from") as string) || "#F5CB3B",
      gradient_to: (formData.get("gradient_to") as string) || "#322F81",
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      status: "published",
      updated_by: user.id,
    };

    const { error } = await adminClient.from("game_categories").insert([data]);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true, message: "Category created successfully" };
  },

  update: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const id = formData.get("id") as string;

    const data = {
      title_id: formData.get("title_id") as string,
      title_en: formData.get("title_en") as string,
      description_id: formData.get("description_id") as string,
      description_en: formData.get("description_en") as string,
      icon: formData.get("icon") as string,
      badge_id: formData.get("badge_id") as string,
      badge_en: formData.get("badge_en") as string,
      count_text_id: formData.get("count_text_id") as string,
      count_text_en: formData.get("count_text_en") as string,
      gradient_from: formData.get("gradient_from") as string,
      gradient_to: formData.get("gradient_to") as string,
      sort_order: parseInt(formData.get("sort_order") as string),
      updated_by: user.id,
    };

    const { error } = await adminClient
      .from("game_categories")
      .update(data)
      .eq("id", id);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true, message: "Category updated successfully" };
  },

  delete: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) return fail(400, { error: "Category ID required" });

    const { error } = await supabase
      .from("game_categories")
      .delete()
      .eq("id", id);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true, message: "Category deleted successfully" };
  },
};
