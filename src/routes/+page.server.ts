import type { PageServerLoad } from "./$types";
import { adminClient } from "$lib/supabase";

export const load: PageServerLoad = async ({ url, setHeaders }) => {
  const isPreview = url.searchParams.get("preview") === "true";
  const locale = url.searchParams.get("locale") || "id";

  // Set cache headers untuk memastikan data selalu fresh
  setHeaders({
    'cache-control': 'public, max-age=0, must-revalidate'
  });

  // Determine status filter
  const statusFilter = isPreview ? ["draft", "published"] : ["published"];

  // Fetch all content in parallel menggunakan adminClient
  const [
    siteConfigData,
    navbarConfigData,
    heroData,
    articlesData,
    categoriesData,
    aboutData,
    contactData,
  ] = await Promise.all([
    adminClient.from("site_config").select("*").in("status", statusFilter),

    adminClient
      .from("navbar_config")
      .select("*")
      .in("status", statusFilter)
      .limit(1)
      .single(),

    adminClient
      .from("hero_content")
      .select("*")
      .in("status", statusFilter)
      .order("updated_at", { ascending: false })
      .limit(1)
      .single(),

    adminClient
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

    adminClient
      .from("about_content")
      .select("*")
      .in("status", statusFilter)
      .limit(1)
      .single(),

    adminClient
      .from("contact_info")
      .select("*")
      .in("status", statusFilter)
      .limit(1)
      .single(),
  ]);

  // Log hero data untuk debugging
  if (heroData.error) {
    console.error("Error loading hero data:", heroData.error);
  } else {
    console.log("Hero data loaded:", {
      title_id: heroData.data?.title_id,
      title_en: heroData.data?.title_en,
      updated_at: heroData.data?.updated_at,
    });
  }

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
