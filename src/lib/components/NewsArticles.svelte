<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Calendar, Clock, ArrowRight } from "lucide-svelte";

  interface Article {
    id: number;
    title: string;
    excerpt: string;
    thumbnail: string;
    category: string;
    date: string;
    readTime: string;
  }

  const articles: Article[] = [
    {
      id: 1,
      title: "Elden Ring: Shadow of the Erdtree - Review DLC Terbaru FromSoftware",
      excerpt: "DLC terbaru Elden Ring menghadirkan tantangan baru yang lebih brutal dan dunia yang lebih luas untuk dijelajahi. Apakah ini DLC terbaik tahun ini?",
      thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop",
      category: "Review",
      date: "24 Okt 2025",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "GTA 6 Dikonfirmasi Rilis 2025: Inilah Yang Perlu Kamu Tahu",
      excerpt: "Rockstar Games akhirnya mengumumkan tanggal rilis GTA 6. Simak detail lengkap tentang gameplay, setting, dan fitur-fitur baru yang akan hadir.",
      thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=500&fit=crop",
      category: "Berita",
      date: "23 Okt 2025",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "Baldur's Gate 3 Raih Game of the Year - Ini Alasannya",
      excerpt: "Larian Studios membuktikan bahwa RPG klasik masih memiliki tempat di industri game modern. Simak analisis mendalam tentang kesuksesan BG3.",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop",
      category: "Analisis",
      date: "22 Okt 2025",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "10 Game Indie Terbaik 2025 yang Wajib Kamu Coba",
      excerpt: "Dari platformer pixel art hingga narrative adventure yang menyentuh hati, inilah game indie terbaik yang dirilis tahun ini.",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
      category: "Rekomendasi",
      date: "21 Okt 2025",
      readTime: "8 min"
    },
    {
      id: 5,
      title: "Tips & Trik Menguasai Valorant: Guide untuk Pemula",
      excerpt: "Panduan lengkap untuk pemula yang ingin meningkatkan skill di Valorant. Pelajari strategi, agent picks, dan teknik aim yang efektif.",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
      category: "Guide",
      date: "20 Okt 2025",
      readTime: "10 min"
    },
    {
      id: 6,
      title: "Game Lokal Indonesia yang Mendunia di 2025",
      excerpt: "Industri game Indonesia terus berkembang. Kenali game-game buatan developer lokal yang berhasil menembus pasar internasional.",
      thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=500&fit=crop",
      category: "Berita",
      date: "19 Okt 2025",
      readTime: "6 min"
    }
  ];

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      "Review": "bg-jgYellow text-black",
      "Berita": "bg-jgPurple text-white",
      "Analisis": "bg-blue-500 text-white",
      "Rekomendasi": "bg-green-500 text-white",
      "Guide": "bg-orange-500 text-white"
    };
    return colors[category] || "bg-gray-500 text-white";
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
      Update terbaru seputar dunia gaming, dari berita, review, hingga tips & trik
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each articles as article}
      <article class="group relative overflow-hidden rounded-lg border bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <!-- Thumbnail -->
        <div class="relative overflow-hidden aspect-video">
          <img 
            src={article.thumbnail} 
            alt={article.title}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <Badge class={`absolute top-4 left-4 ${getCategoryColor(article.category)} font-semibold`}>
            {article.category}
          </Badge>
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
    >
      Lihat Semua Artikel
      <ArrowRight class="size-5 ml-2" />
    </Button>
  </div>
</section>
