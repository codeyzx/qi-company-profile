<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Card } from "$lib/components/ui/card";
  import { Newspaper, ListOrdered, Lightbulb, Video, ArrowRight, Sparkles } from "lucide-svelte";

  interface Category {
    id: number;
    title: string;
    description: string;
    icon: any;
    gradient: string;
    borderColor: string;
    iconBg: string;
    badge: string;
    count: string;
  }

  const categories: Category[] = [
    {
      id: 1,
      title: "News",
      description: "Berita terkini seputar dunia game — dari perilisan judul baru, patch update, event esports, hingga tren industri gaming global. Cepat, akurat, dan selalu update.",
      icon: Newspaper,
      gradient: "from-jgYellow/20 to-jgYellow/5",
      borderColor: "border-jgYellow/50 hover:border-jgYellow",
      iconBg: "bg-jgYellow/20",
      badge: "Breaking",
      count: "500+ Artikel"
    },
    {
      id: 2,
      title: "List Game",
      description: "Rekomendasi pilihan game terbaik dengan tema menarik — \"Top 10 Games of the Month\", \"Best Indie Games\", hingga \"Game Lokal Wajib Coba\". Panduan praktis untuk temukan game favoritmu.",
      icon: ListOrdered,
      gradient: "from-jgPurple/20 to-jgPurple/5",
      borderColor: "border-jgPurple/50 hover:border-jgPurple",
      iconBg: "bg-jgPurple/20",
      badge: "Curated",
      count: "100+ Lists"
    },
    {
      id: 3,
      title: "Fact",
      description: "Fakta unik, trivia seru, dan insight mendalam dari jagat gaming — sejarah game legendaris, easter egg tersembunyi, hingga data statistik industri. Pengetahuan ringan tapi berbobot.",
      icon: Lightbulb,
      gradient: "from-orange-500/20 to-orange-500/5",
      borderColor: "border-orange-500/50 hover:border-orange-500",
      iconBg: "bg-orange-500/20",
      badge: "Insights",
      count: "200+ Facts"
    },
    {
      id: 4,
      title: "Clip Viral",
      description: "Kumpulan video pendek dan klip viral dari komunitas gamer — momen epic, gameplay luar biasa, hingga kejadian tak terduga. Konten seru yang bikin kamu pengen share!",
      icon: Video,
      gradient: "from-pink-500/20 to-pink-500/5",
      borderColor: "border-pink-500/50 hover:border-pink-500",
      iconBg: "bg-pink-500/20",
      badge: "Trending",
      count: "300+ Clips"
    }
  ];
</script>

<section id="kategori" class="container py-20 md:py-24 bg-muted/30">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgPurple/50">
      <Sparkles class="size-4 mr-1 text-jgPurple" />
      <span class="text-jgPurple font-semibold">KONTEN PILIHAN</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      Jelajahi <span class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text">Kategori Konten</span>
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      Temukan berbagai jenis konten gaming yang sesuai dengan minatmu — dari berita terkini hingga klip viral yang seru!
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
    {#each categories as category}
      <Card class={`group relative overflow-hidden border-2 ${category.borderColor} bg-gradient-to-br ${category.gradient} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}>
        <div class="p-8">
          <!-- Icon & Badge -->
          <div class="flex items-start justify-between mb-4">
            <div class={`${category.iconBg} rounded-xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <svelte:component this={category.icon} class="size-8 text-foreground" />
            </div>
            <Badge class="bg-background/80 text-foreground font-semibold">
              {category.badge}
            </Badge>
          </div>

          <!-- Title -->
          <h3 class="font-bold text-2xl mb-3 group-hover:text-jgYellow transition-colors">
            {category.title}
          </h3>

          <!-- Description -->
          <p class="text-muted-foreground text-sm leading-relaxed mb-4">
            {category.description}
          </p>

          <!-- Stats & CTA -->
          <div class="flex items-center justify-between pt-4 border-t border-border/50">
            <span class="text-sm font-semibold text-muted-foreground">
              {category.count}
            </span>
            <div class="flex items-center gap-2 text-sm font-semibold text-jgYellow group-hover:gap-3 transition-all">
              Lihat Konten
              <ArrowRight class="size-4" />
            </div>
          </div>
        </div>

        <!-- Decorative Element -->
        <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-jgYellow/10 to-jgPurple/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
      </Card>
    {/each}
  </div>

  <!-- CTA Section -->
  <div class="text-center mt-12">
    <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-jgYellow/10 to-jgPurple/10 border border-jgYellow/30">
      <Sparkles class="size-5 text-jgYellow animate-pulse" />
      <span class="font-semibold">1000+ Konten Berkualitas Menantimu!</span>
    </div>
  </div>
</section>
