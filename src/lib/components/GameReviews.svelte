<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Star, ThumbsUp, MessageCircle } from "lucide-svelte";

  interface Review {
    id: number;
    game: string;
    title: string;
    excerpt: string;
    thumbnail: string;
    rating: number;
    author: string;
    likes: number;
    comments: number;
  }

  const reviews: Review[] = [
    {
      id: 1,
      game: "Elden Ring: Shadow of the Erdtree",
      title: "DLC Yang Melebihi Ekspektasi",
      excerpt: "FromSoftware sekali lagi membuktikan keahlian mereka dalam crafting dunia yang kompleks dan challenging...",
      thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop",
      rating: 9.5,
      author: "Ahmad Gaming",
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      game: "Final Fantasy VII Rebirth",
      title: "Remake Yang Lebih Dari Sekedar Nostalgia",
      excerpt: "Square Enix berhasil menghadirkan pengalaman baru yang segar sambil tetap menghormati materi aslinya...",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
      rating: 9.0,
      author: "Siti Gamer",
      likes: 189,
      comments: 32
    },
    {
      id: 3,
      game: "Helldivers 2",
      title: "Co-op Shooter Yang Sangat Adiktif",
      excerpt: "Game co-op yang sempurna untuk dimainkan bersama teman. Gameplay yang solid dan progression system yang memuaskan...",
      thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=400&fit=crop",
      rating: 8.5,
      author: "Budi Reviewer",
      likes: 156,
      comments: 28
    }
  ];

  function getRatingColor(rating: number): string {
    if (rating >= 9) return "text-green-500";
    if (rating >= 7) return "text-jgYellow";
    return "text-orange-500";
  }

  function getRatingLabel(rating: number): string {
    if (rating >= 9) return "Masterpiece";
    if (rating >= 8) return "Excellent";
    if (rating >= 7) return "Great";
    return "Good";
  }
</script>

<section id="review" class="container py-20 md:py-24">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgYellow/50">
      <Star class="size-4 mr-1 text-jgYellow" />
      <span class="text-jgYellow font-semibold">GAME REVIEWS</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      Review <span class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text">Terbaru</span>
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      Review mendalam dan objektif tentang game-game terbaru
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
    <!-- Featured Review (Large) -->
    <div class="lg:col-span-2">
      <article class="group relative overflow-hidden rounded-xl border-2 border-jgYellow/30 bg-card hover:shadow-2xl transition-all duration-300">
        <div class="grid md:grid-cols-2 gap-6 p-6">
          <div class="relative overflow-hidden rounded-lg aspect-video md:aspect-auto">
            <img 
              src={reviews[0].thumbnail} 
              alt={reviews[0].game}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-4 left-4">
              <Badge class="bg-jgYellow text-black font-bold text-lg px-4 py-2">
                Featured Review
              </Badge>
            </div>
          </div>

          <div class="flex flex-col justify-between">
            <div>
              <Badge variant="secondary" class="mb-2">
                {reviews[0].game}
              </Badge>
              <h3 class="font-bold text-2xl mb-3 group-hover:text-jgYellow transition-colors">
                {reviews[0].title}
              </h3>
              <p class="text-muted-foreground mb-4">
                {reviews[0].excerpt}
              </p>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <div class={`text-4xl font-bold ${getRatingColor(reviews[0].rating)}`}>
                    {reviews[0].rating}
                  </div>
                  <div>
                    <div class="flex items-center">
                      {#each Array(5) as _, i}
                        <Star 
                          class={`size-4 ${i < Math.floor(reviews[0].rating / 2) ? 'fill-jgYellow text-jgYellow' : 'text-gray-300'}`}
                        />
                      {/each}
                    </div>
                    <div class={`text-xs font-semibold ${getRatingColor(reviews[0].rating)}`}>
                      {getRatingLabel(reviews[0].rating)}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
                <span class="font-medium">By {reviews[0].author}</span>
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1">
                    <ThumbsUp class="size-4" />
                    {reviews[0].likes}
                  </span>
                  <span class="flex items-center gap-1">
                    <MessageCircle class="size-4" />
                    {reviews[0].comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Other Reviews -->
    {#each reviews.slice(1) as review}
      <article class="group relative overflow-hidden rounded-xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="relative overflow-hidden aspect-video">
          <img 
            src={review.thumbnail} 
            alt={review.game}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute top-4 right-4">
            <div class={`text-2xl font-bold ${getRatingColor(review.rating)} bg-black/70 px-3 py-1 rounded-lg`}>
              {review.rating}
            </div>
          </div>
        </div>

        <div class="p-5">
          <Badge variant="secondary" class="mb-2 text-xs">
            {review.game}
          </Badge>
          <h3 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-jgYellow transition-colors">
            {review.title}
          </h3>
          <p class="text-muted-foreground text-sm line-clamp-2 mb-3">
            {review.excerpt}
          </p>

          <div class="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
            <span class="font-medium">By {review.author}</span>
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1">
                <ThumbsUp class="size-3" />
                {review.likes}
              </span>
              <span class="flex items-center gap-1">
                <MessageCircle class="size-3" />
                {review.comments}
              </span>
            </div>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>
