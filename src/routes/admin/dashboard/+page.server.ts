import { adminClient } from "$lib/supabase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Fetch statistics
  const [articlesData, heroData, categoriesData] = await Promise.all([
    adminClient.from("news_articles").select("id, status", { count: "exact" }),
    adminClient.from("hero_content").select("id", { count: "exact" }),
    adminClient.from("game_categories").select("id", { count: "exact" }),
  ]);

  const articles = articlesData.data || [];
  const draftCount = articles.filter((a: any) => a.status === "draft").length;
  const publishedCount = articles.filter(
    (a: any) => a.status === "published"
  ).length;
  const scheduledCount = articles.filter(
    (a: any) => a.status === "scheduled"
  ).length;

  return {
    stats: {
      totalArticles: articlesData.count || 0,
      draftArticles: draftCount,
      publishedArticles: publishedCount,
      scheduledArticles: 0,
      totalHero: heroData.count || 0,
      totalCategories: categoriesData.count || 0,
    },
    recentActivity: [],
  };
};
