import { redirect, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { saveVersion, logActivity } from "$lib/server/versioning";

import { adminClient } from "$lib/supabase";

export const load: PageServerLoad = async () => {
  const { data: articles, error } = await adminClient
    .from("news_articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading articles:", error);
  }

  return {
    articles: articles || [],
  };
};

export const actions: Actions = {
  delete: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) return fail(400, { error: "Article ID required" });

    const { error } = await supabase
      .from("news_articles")
      .delete()
      .eq("id", id);

    if (error) {
      return fail(500, { error: error.message });
    }

    await logActivity(supabase, user.id, "delete", "news_articles", id);

    return { success: true, message: "Article deleted successfully" };
  },

  publish: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) return fail(400, { error: "Article ID required" });

    const { error } = await (supabase as any)
      .from("news_articles")
      .update({
        status: "published",
        published_date: new Date().toISOString(),
        updated_by: user.id,
      })
      .eq("id", id);

    if (error) {
      return fail(500, { error: error.message });
    }

    await logActivity(supabase, user.id, "publish", "news_articles", id);

    return { success: true, message: "Article published successfully" };
  },

  unpublish: async ({ request, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) return fail(400, { error: "Article ID required" });

    const { error } = await (supabase as any)
      .from("news_articles")
      .update({
        status: "draft",
        updated_by: user.id,
      })
      .eq("id", id);

    if (error) {
      return fail(500, { error: error.message });
    }

    await logActivity(supabase, user.id, "unpublish", "news_articles", id);

    return { success: true, message: "Article unpublished successfully" };
  },
};
