import type { PageServerLoad } from "./$types";
import { adminClient } from "$lib/supabase";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  const isPreview = url.searchParams.get("preview") === "true";
  const locale = url.searchParams.get("locale") || "id";

  // Determine status filter
  const statusFilter = isPreview ? ["draft", "published"] : ["published"];

  // Fetch all content in parallel
  const [
    siteConfigData,
    navbarConfigData,
    heroData,
    articlesData,
    categoriesData,
    aboutData,
    contactData,
  ] = await Promise.all([
    supabase.from("site_config").select("*").in("status", statusFilter),

    supabase
      .from("navbar_config")
      .select("*")
      .in("status", statusFilter)
      .limit(1)
      .single(),

    supabase
      .from("hero_content")
      .select("*")
      .in("status", statusFilter)
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),

    supabase
      .from("news_articles")
      .select("*")
      .in("status", statusFilter)
      .order("published_date", { ascending: false })
      .limit(6),

    adminClient
      .from("game_categories")
      .select("*")
      .in("status", statusFilter)
      .order("sort_order", { ascending: true }),

    supabase
      .from("about_content")
      .select("*")
      .in("status", statusFilter)
      .limit(1)
      .single(),

    supabase
      .from("contact_info")
      .select("*")
      .in("status", statusFilter)
      .limit(1)
      .single(),
  ]);

  return {
    siteConfig: siteConfigData.data || [],
    navbarConfig: navbarConfigData.data || null,
    hero: heroData.data || null,
    articles: articlesData.data || [],
    categories: categoriesData.data || [],
    about: aboutData.data || null,
    contact: contactData.data || null,
    locale,
    isPreview,
  };
};
