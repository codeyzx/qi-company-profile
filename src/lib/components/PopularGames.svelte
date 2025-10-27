<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Star, TrendingUp, Users } from "lucide-svelte";

  interface PopularGame {
    id: number;
    title: string;
    genre: string;
    thumbnail: string;
    rating: number;
    players: string;
    trending: boolean;
  }

  const popularGames: PopularGame[] = [
    {
      id: 1,
      title: "Elden Ring",
      genre: "Action RPG",
      thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
      rating: 4.9,
      players: "2.5M+",
      trending: true
    },
    {
      id: 2,
      title: "Baldur's Gate 3",
      genre: "RPG",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      rating: 4.8,
      players: "3M+",
      trending: true
    },
    {
      id: 3,
      title: "Valorant",
      genre: "FPS",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      rating: 4.6,
      players: "10M+",
      trending: true
    },
    {
      id: 4,
      title: "Genshin Impact",
      genre: "Action RPG",
      thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
      rating: 4.7,
      players: "8M+",
      trending: false
    },
    {
      id: 5,
      title: "Spider-Man 2",
      genre: "Action Adventure",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      rating: 4.8,
      players: "5M+",
      trending: true
    },
    {
      id: 6,
      title: "Hades II",
      genre: "Roguelike",
      thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop",
      rating: 4.9,
      players: "1.5M+",
      trending: true
    }
  ];
</script>

<section id="game-populer" class="container py-20 md:py-24 bg-muted/30">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgPurple/50">
      <TrendingUp class="size-4 mr-1 text-jgPurple" />
      <span class="text-jgPurple font-semibold">TRENDING NOW</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      Game <span class="text-transparent bg-gradient-to-r from-jgPurple to-jgYellow bg-clip-text">Populer</span>
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      Game paling banyak dimainkan dan dibicarakan oleh komunitas gamer
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each popularGames as game}
      <div class="group relative overflow-hidden rounded-xl border-2 border-transparent hover:border-jgYellow bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <!-- Thumbnail -->
        <div class="relative overflow-hidden aspect-video">
          <img 
            src={game.thumbnail} 
            alt={game.title}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          {#if game.trending}
            <Badge class="absolute top-4 right-4 bg-jgYellow text-black font-bold animate-pulse">
              <TrendingUp class="size-3 mr-1" />
              Trending
            </Badge>
          {/if}

          <!-- Info Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <Badge variant="secondary" class="mb-2 text-xs">
              {game.genre}
            </Badge>
            <h3 class="font-bold text-xl text-white mb-2">
              {game.title}
            </h3>
            <div class="flex items-center justify-between text-white text-sm">
              <div class="flex items-center gap-1">
                <Star class="size-4 fill-jgYellow text-jgYellow" />
                <span class="font-semibold">{game.rating}</span>
              </div>
              <div class="flex items-center gap-1">
                <Users class="size-4" />
                <span>{game.players} players</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="text-center mt-12">
    <Button 
      size="lg"
      class="bg-gradient-to-r from-jgPurple to-jgPurple/90 hover:from-jgPurple/90 hover:to-jgPurple text-white font-bold px-8"
    >
      Lihat Semua Game
    </Button>
  </div>
</section>
