<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Calendar, Clock, ArrowRight } from "lucide-svelte";
  import { locale } from "$lib/stores/locale";
  import { t } from "$lib/i18n";

  interface Article {
    id: string;
    title_id: string;
    title_en: string;
    excerpt_id: string;
    excerpt_en: string;
    thumbnail_url?: string;
    category_id?: string;
    category_en?: string;
    published_date?: string;
    read_time?: number;
  }

  interface Props {
    articles: Article[];
  }

  let { articles = [] }: Props = $props();

  // Helper function to get localized content
  function getLocalizedText(
    textId?: string,
    textEn?: string,
    fallback?: string
  ): string {
    if ($locale === "en") {
      return textEn || textId || fallback || "";
    }
    return textId || textEn || fallback || "";
  }

  // Helper function to format date
  function formatDate(dateString?: string): string {
    if (!dateString) return "Tanggal tidak tersedia";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Tanggal tidak valid";
    }
  }

  // Helper function to get default thumbnail
  function getDefaultThumbnail(index: number): string {
    const defaultImages = [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=500&fit=crop",
    ];
    return defaultImages[index % defaultImages.length];
  }

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      Review: "bg-jgYellow text-black",
      Berita: "bg-jgPurple text-white",
      Analisis: "bg-blue-500 text-white",
      Rekomendasi: "bg-green-500 text-white",
      Guide: "bg-orange-500 text-white",
    };
    return colors[category] || "bg-gray-500 text-white";
  }
</script>

<section id="berita" class="container py-20 md:py-24">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgYellow/50">
      <span class="text-jgYellow font-semibold">{$t("news.title")}</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      {$t("news.subtitle")}
      <span
        class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text"
        >{$locale === "en" ? "Articles" : "Terbaru"}</span
      >
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      {$t("news.description")}
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each articles as article, index}
      {@const title = getLocalizedText(
        article.title_id,
        article.title_en,
        "Artikel Tanpa Judul"
      )}
      {@const excerpt = getLocalizedText(
        article.excerpt_id,
        article.excerpt_en,
        "Tidak ada ringkasan tersedia."
      )}
      {@const category = getLocalizedText(
        article.category_id,
        article.category_en,
        "Umum"
      )}
      {@const thumbnail = article.thumbnail_url || getDefaultThumbnail(index)}
      {@const readTime = article.read_time
        ? `${article.read_time} min`
        : "5 min"}

      <article
        class="group relative overflow-hidden rounded-lg border bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <!-- Thumbnail -->
        <div class="relative overflow-hidden aspect-video">
          <img
            src={thumbnail}
            alt={title}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          ></div>
          <Badge
            class={`absolute top-4 left-4 ${getCategoryColor(category)} font-semibold`}
          >
            {category}
          </Badge>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-3">
          <h3
            class="font-bold text-xl line-clamp-2 group-hover:text-jgYellow transition-colors"
          >
            {title}
          </h3>

          <p class="text-muted-foreground text-sm line-clamp-3">
            {excerpt}
          </p>

          <div
            class="flex items-center justify-between text-xs text-muted-foreground pt-2"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <Calendar class="size-3" />
                {formatDate(article.published_date)}
              </span>
              <span class="flex items-center gap-1">
                <Clock class="size-3" />
                {readTime}
              </span>
            </div>
          </div>

          <Button
            class="w-full mt-4 group/btn bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold"
          >
            {$t("common.readMore")}
            <ArrowRight
              class="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </article>
    {/each}
  </div>

  <div class="text-center mt-12">
    <Button
      variant="outline"
      size="lg"
      class="border-2 border-jgPurple hover:bg-jgPurple hover:text-white font-bold px-8"
    >
      {$t("news.viewAll")}
      <ArrowRight class="size-5 ml-2" />
    </Button>
  </div>
</section>
