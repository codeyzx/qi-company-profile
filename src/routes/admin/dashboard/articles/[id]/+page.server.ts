import { redirect, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { saveVersion, logActivity } from "$lib/server/versioning";

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
}) => {
  if (params.id === "create") {
    return { article: null, isNew: true };
  }

  const { data: article, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    throw redirect(303, "/admin/dashboard/articles");
  }

  return { article, isNew: false };
};

export const actions: Actions = {
  save: async ({ request, params, locals: { supabase, user } }) => {
    if (!user) return fail(401, { error: "Unauthorized" });

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const articleData = {
      title_id: data.title_id as string,
      title_en: data.title_en as string,
      slug_id: data.slug_id as string,
      slug_en: data.slug_en as string,
      excerpt_id: data.excerpt_id as string,
      excerpt_en: data.excerpt_en as string,
      content_id: data.content_id as string,
      content_en: data.content_en as string,
      category_id: data.category_id as string,
      category_en: data.category_en as string,
      thumbnail_url: data.thumbnail_url as string,
      read_time: parseInt(data.read_time as string) || null,
      status: (data.status as string) || "draft",
      scheduled_publish_at: (data.scheduled_publish_at as string) || null,
      seo_meta_title_id: (data.seo_meta_title_id as string) || null,
      seo_meta_title_en: (data.seo_meta_title_en as string) || null,
      seo_meta_description_id: (data.seo_meta_description_id as string) || null,
      seo_meta_description_en: (data.seo_meta_description_en as string) || null,
      seo_og_image_url: (data.seo_og_image_url as string) || null,
      author_id: user.id,
      updated_by: user.id,
    };

    if (params.id === "create") {
      // Create new article
      const { data: newArticle, error } = (await supabase
        .from("news_articles")
        .insert(articleData as any)
        .select()
        .single()) as any;

      if (error) {
        return fail(500, { error: error.message });
      }

      await logActivity(
        supabase,
        user.id,
        "create",
        "news_articles",
        newArticle.id
      );

      throw redirect(
        303,
        `/admin/dashboard/articles/${(newArticle as any).id}`
      );
    } else {
      // Update existing article
      // Get current article for versioning
      const { data: current } = await supabase
        .from("news_articles")
        .select("*")
        .eq("id", params.id!)
        .single();

      if (current) {
        await saveVersion(
          supabase,
          "news_articles",
          params.id!,
          current,
          user.id,
          "Manual save"
        );
      }

      const { error } = await (supabase as any)
        .from("news_articles")
        .update(articleData)
        .eq("id", params.id!);

      if (error) {
        return fail(500, { error: error.message });
      }

      await logActivity(
        supabase,
        user.id,
        "update",
        "news_articles",
        params.id
      );

      return { success: true, message: "Article saved successfully" };
    }
  },
};
