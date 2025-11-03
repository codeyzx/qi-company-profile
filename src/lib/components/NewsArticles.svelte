<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Calendar, Clock, ArrowRight, Loader2, AlertCircle } from "lucide-svelte";
  import { onMount } from "svelte";

  interface Article {
    id: string;
    title: string;
    excerpt: string;
    thumbnail: string;
    category: string;
    date: string;
    readTime: string;
    permalink?: string;
    mediaType?: string;
  }

  let articles: Article[] = [];
  let loading = true;
  let error = false;
  
  // Fallback data jika API gagal atau untuk development
  const fallbackArticles: Article[] = [
    {
      id: "1",
      title: "Elden Ring: Shadow of the Erdtree - Review DLC Terbaru FromSoftware",
      excerpt: "DLC terbaru Elden Ring menghadirkan tantangan baru yang lebih brutal dan dunia yang lebih luas untuk dijelajahi.",
      thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop",
      category: "Review",
      date: "24 Okt 2025",
      readTime: "5 min"
    },
    {
      id: "2",
      title: "GTA 6 Dikonfirmasi Rilis 2025: Inilah Yang Perlu Kamu Tahu",
      excerpt: "Rockstar Games akhirnya mengumumkan tanggal rilis GTA 6. Simak detail lengkap tentang gameplay dan fitur baru.",
      thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=500&fit=crop",
      category: "Berita",
      date: "23 Okt 2025",
      readTime: "7 min"
    },
    {
      id: "3",
      title: "10 Game Indie Terbaik 2025 yang Wajib Kamu Coba",
      excerpt: "Dari platformer pixel art hingga narrative adventure yang menyentuh hati, inilah game indie terbaik tahun ini.",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
      category: "List Game",
      date: "21 Okt 2025",
      readTime: "8 min"
    },
    {
      id: "4",
      title: "Fakta Menarik Tentang Game Legendaris",
      excerpt: "Temukan rahasia dan trivia seru dari game-game yang mengubah industri gaming selamanya.",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop",
      category: "Fact",
      date: "20 Okt 2025",
      readTime: "4 min"
    },
    {
      id: "5",
      title: "Clip Viral: Momen Epic di Tournament Valorant",
      excerpt: "Saksikan aksi luar biasa dari pro player yang bikin komunitas gaming terkejut!",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
      category: "Clip Viral",
      date: "19 Okt 2025",
      readTime: "2 min"
    },
    {
      id: "6",
      title: "Game Lokal Indonesia yang Mendunia di 2025",
      excerpt: "Industri game Indonesia terus berkembang. Kenali game buatan developer lokal yang sukses global.",
      thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=500&fit=crop",
      category: "Berita",
      date: "18 Okt 2025",
      readTime: "6 min"
    }
  ];

  onMount(async () => {
    try {
      const response = await fetch('/api/instagram');
      
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      
      const data = await response.json();
      
      if (data.success && data.articles.length > 0) {
        articles = data.articles;
      } else {
        // Gunakan fallback jika tidak ada data
        articles = fallbackArticles;
      }
      
      loading = false;
    } catch (err) {
      console.error('Error loading articles:', err);
      // Gunakan fallback data
      articles = fallbackArticles;
      loading = false;
      error = false; // Set false karena kita punya fallback
    }
  });

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      "Review": "bg-jgYellow text-black",
      "Berita": "bg-jgPurple text-white",
      "List Game": "bg-green-500 text-white",
      "Fact": "bg-orange-500 text-white",
      "Clip Viral": "bg-pink-500 text-white"
    };
    return colors[category] || "bg-jgPurple text-white";
  }

  function handleArticleClick(article: Article) {
    if (article.permalink) {
      window.open(article.permalink, '_blank');
    }
  }
</script>

<section id="berita" class="container py-20 md:py-24">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgYellow/50">
      <span class="text-jgYellow font-semibold">BERITA TERKINI</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      Artikel <span class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text">Terbaru</span>
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      Update terbaru dari Instagram kami - Review, Berita, List Game, Fakta, dan Clip Viral
    </p>
  </div>

  {#if loading}
    <!-- Loading State -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _, i}
        <div class="rounded-lg border bg-card overflow-hidden animate-pulse">
          <div class="aspect-video bg-muted"></div>
          <div class="p-6 space-y-3">
            <div class="h-4 bg-muted rounded w-20"></div>
            <div class="h-6 bg-muted rounded w-3/4"></div>
            <div class="h-4 bg-muted rounded w-full"></div>
            <div class="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if error}
    <!-- Error State -->
    <div class="flex flex-col items-center justify-center py-12 space-y-4">
      <AlertCircle class="w-16 h-16 text-destructive" />
      <h3 class="text-xl font-semibold">Gagal Memuat Artikel</h3>
      <p class="text-muted-foreground">Terjadi kesalahan saat memuat artikel. Silakan coba lagi nanti.</p>
      <Button on:click={() => window.location.reload()} variant="outline">
        Muat Ulang
      </Button>
    </div>
  {:else}
    <!-- Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each articles as article}
        <article 
          class="group relative overflow-hidden rounded-lg border bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          on:click={() => handleArticleClick(article)}
          on:keydown={(e) => e.key === 'Enter' && handleArticleClick(article)}
          role="button"
          tabindex="0"
        >
          <!-- Thumbnail -->
          <div class="relative overflow-hidden aspect-video">
            <img 
              src={article.thumbnail} 
              alt={article.title}
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <Badge class={`absolute top-4 left-4 ${getCategoryColor(article.category)} font-semibold`}>
              {article.category}
            </Badge>

            {#if article.mediaType === 'VIDEO'}
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            {/if}
          </div>

          <!-- Content -->
          <div class="p-6 space-y-3">
            <h3 class="font-bold text-xl line-clamp-2 group-hover:text-jgYellow transition-colors">
              {article.title}
            </h3>
            
            <p class="text-muted-foreground text-sm line-clamp-3">
              {article.excerpt}
            </p>

            <div class="flex items-center justify-between text-xs text-muted-foreground pt-2">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1">
                  <Calendar class="size-3" />
                  {article.date}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="size-3" />
                  {article.readTime}
                </span>
              </div>
            </div>

            <Button 
              class="w-full mt-4 group/btn bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold"
            >
              Baca Selengkapnya
              <ArrowRight class="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
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
        on:click={() => window.open('https://www.instagram.com/jelajahgame.id', '_blank')}
      >
        Lihat Semua Artikel
        <ArrowRight class="size-5 ml-2" />
      </Button>
    </div>
  {/if}
</section>
