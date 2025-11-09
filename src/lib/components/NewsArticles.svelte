<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Calendar, Clock, ArrowRight, ExternalLink, Heart, MessageCircle } from "lucide-svelte";
  import { locale } from "$lib/stores/locale";
  import { t } from "$lib/i18n";
  import { onMount } from "svelte";

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

  // Instagram feed from Juicer.io
  interface InstagramPost {
    id: string;
    message: string;
    full_url: string;
    image: string;
    poster_name: string;
    poster_url: string;
    poster_image: string;
    source: {
      source: string;
      id: string;
    };
    external_created_at: string;
    like_count?: number;
    comment_count?: number;
  }

  let instagramPosts: InstagramPost[] = $state([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let instagramProfileUrl = $state('https://www.instagram.com/jelajahgame.id'); // Default fallback
  let instagramUsername = $state('jelajahgame.id');
  let instagramProfileImage = $state('/Logo Jelajah Game Instagram.jpg'); // Default logo dari project

  // Fetch Instagram posts from Juicer.io API
  onMount(async () => {
    try {
      // Juicer.io public API endpoint - ganti 'jelajahgame-id' dengan feed ID yang benar
      const response = await fetch('https://www.juicer.io/api/feeds/jelajahgame-id');
      
      if (!response.ok) {
        throw new Error('Failed to fetch Instagram feed');
      }
      
      const data = await response.json();
      instagramPosts = data.posts?.items?.slice(0, 6) || [];
      
      // Get profile info from first post or feed data
      if (instagramPosts.length > 0) {
        const firstPost = instagramPosts[0];
        instagramProfileUrl = firstPost.poster_url || 'https://www.instagram.com/jelajahgame.id';
        instagramUsername = firstPost.poster_name || 'jelajahgame.id';
        instagramProfileImage = firstPost.poster_image || '/Logo Jelajah Game Instagram.jpg';
      }
      
      isLoading = false;
    } catch (err) {
      console.error('Error loading Instagram feed:', err);
      error = 'Tidak dapat memuat feed Instagram';
      isLoading = false;
    }
  });

  // Format date
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat($locale === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  // Truncate text and strip HTML tags
  function truncateText(text: string, maxLength: number = 150): string {
    if (!text) return '';
    // Strip HTML tags
    const withoutHtml = text.replace(/<[^>]*>/g, '');
    // Decode HTML entities
    const withoutEntities = withoutHtml
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    
    if (withoutEntities.length <= maxLength) return withoutEntities;
    return withoutEntities.slice(0, maxLength) + '...';
  }

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
      {$locale === "en" ? "Instagram" : "Postingan"}
      <span
        class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text"
        >{$locale === "en" ? "Posts" : "Instagram"}</span
      >
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      {$t("news.description")}
    </p>
  </div>

  <!-- Instagram Feed -->
  <div class="instagram-feed-container mb-12">
    {#if isLoading}
      <!-- Loading State -->
      <div class="flex flex-col items-center justify-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-jgYellow mb-4"></div>
        <p class="text-muted-foreground">Memuat postingan Instagram...</p>
      </div>
    {:else if error}
      <!-- Error State -->
      <div class="text-center py-16 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <p class="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">{error}</p>
        <p class="text-sm text-muted-foreground">Feed Instagram tidak dapat dimuat. Coba refresh halaman.</p>
      </div>
    {:else if instagramPosts.length > 0}
      <!-- Instagram Posts Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each instagramPosts as post}
          <article class="instagram-post group">
            <a 
              href={post.full_url} 
              target="_blank" 
              rel="noopener noreferrer"
              class="block bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <!-- Post Header -->
              <div class="flex items-center gap-3 p-4 border-b">
                <img 
                  src={post.poster_image || instagramProfileImage} 
                  alt={post.poster_name}
                  class="w-10 h-10 rounded-full border-2 border-jgYellow object-cover"
                  on:error={(e) => (e.currentTarget.src = '/Logo Jelajah Game Instagram.jpg')}
                />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm truncate">{post.poster_name}</p>
                  <p class="text-xs text-muted-foreground">{formatDate(post.external_created_at)}</p>
                </div>
                <svg class="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>

              <!-- Post Image -->
              <div class="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={post.image} 
                  alt={truncateText(post.message, 50)}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <!-- Post Content -->
              <div class="p-4 space-y-3">
                <!-- Caption -->
                <p class="text-sm line-clamp-3 text-foreground/90">
                  {truncateText(post.message, 120)}
                </p>

                <!-- Meta Info -->
                <div class="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                  {#if post.like_count}
                    <span class="flex items-center gap-1">
                      <Heart class="size-4" />
                      {post.like_count}
                    </span>
                  {/if}
                  {#if post.comment_count}
                    <span class="flex items-center gap-1">
                      <MessageCircle class="size-4" />
                      {post.comment_count}
                    </span>
                  {/if}
                  <span class="ml-auto flex items-center gap-1 text-jgYellow font-medium group-hover:gap-2 transition-all">
                    Lihat di Instagram
                    <ExternalLink class="size-3" />
                  </span>
                </div>
              </div>
            </a>
          </article>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <div class="text-center py-16">
        <p class="text-muted-foreground">Belum ada postingan tersedia.</p>
      </div>
    {/if}
  </div>

  <!-- Optional: Keep original articles section if needed -->
  {#if articles.length > 0}
  <div class="mt-16">
    <h3 class="text-2xl font-bold text-center mb-8">
      {$locale === "en" ? "Latest Articles" : "Artikel Terbaru"}
    </h3>
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
  </div>
  {/if}

  <div class="text-center mt-12">
    <a 
      href={instagramProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="outline"
        size="lg"
        class="border-2 border-jgPurple hover:bg-jgPurple hover:text-white font-bold px-8"
      >
        {$locale === "en" ? "View All Posts" : "Lihat Semua Postingan"}
        <ArrowRight class="size-5 ml-2" />
      </Button>
    </a>
  </div>
</section>

<style>
  /* Custom Instagram-like styling */
  .instagram-post {
    position: relative;
  }

  /* Responsive grid adjustments */
  @media (max-width: 640px) {
    .instagram-feed-container :global(.grid) {
      grid-template-columns: 1fr !important;
    }
  }

  /* Dark mode support for images */
  :global(.dark) .instagram-post img {
    opacity: 0.95;
  }

  :global(.dark) .instagram-post:hover img {
    opacity: 1;
  }
</style>
