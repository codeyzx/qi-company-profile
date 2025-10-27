<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight, Gamepad2, Trophy, Zap } from "lucide-svelte";
  import { siteConfig } from "$lib/config/meta";
</script>

<section id="home" class="container">
  <div
    class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32"
  >
    <div class="text-center space-y-8">
      <Badge variant="outline" class="text-sm py-2 border-jgYellow/50 hover:bg-jgYellow/10">
        <span class="mr-2">
          <Badge class="bg-gradient-to-r from-jgYellow to-jgPurple text-black font-semibold">
            <Zap class="size-3 mr-1" />
            Trending
          </Badge>
        </span>
        <span>Portal Game Terkini untuk Gen Z</span>
      </Badge>

      <div
        class="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold"
      >
        <h1 class="leading-tight">
          <span class="inline-flex items-center gap-3 mb-2">
            <Gamepad2 class="size-12 md:size-16 text-jgYellow animate-pulse" />
          </span>
          <br />
          Jelajahi Dunia Game
          <span
            class="text-transparent bg-gradient-to-r from-jgYellow via-jgPurple to-jgYellow bg-clip-text animate-gradient"
          >
            Bersama Kami
          </span>
        </h1>
      </div>

      <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground font-medium">
        {siteConfig.description}
        <span class="block mt-2 text-jgYellow font-semibold italic">"{siteConfig.slogan}"</span>
      </p>

      <div class="flex flex-wrap gap-4 justify-center items-center">
        <Button class="px-8 py-6 text-lg font-bold group/arrow bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black shadow-lg hover:shadow-xl transition-all">
          <Trophy class="size-5 mr-2" />
          Baca Berita Terbaru
          <ArrowRight
            class="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform"
          />
        </Button>

        <Button variant="outline" class="px-8 py-6 text-lg font-bold border-2 border-jgPurple hover:bg-jgPurple hover:text-white transition-all">
          <Gamepad2 class="size-5 mr-2" />
          Explore Game Populer
        </Button>
      </div>

      <!-- Stats -->
      <div class="flex flex-wrap justify-center gap-8 pt-8">
        <div class="text-center">
          <div class="text-3xl font-bold text-jgYellow">500+</div>
          <div class="text-sm text-muted-foreground">Artikel Game</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-jgPurple">100+</div>
          <div class="text-sm text-muted-foreground">Game Reviews</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-jgYellow">50K+</div>
          <div class="text-sm text-muted-foreground">Pembaca Aktif</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .animate-gradient {
    background-size: 200% auto;
    animation: gradient 3s linear infinite;
  }

  @keyframes img-shadow-animation {
    from {
      opacity: 0.3;
      transform: translateY(30px);
    }

    to {
      opacity: 0.6;
      transform: translateY(0px);
    }
  }

  @keyframes img-border-animation {
    from {
      border-color: #F5CB3B33;
    }

    to {
      border-color: #322F8166;
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% center;
    }
    50% {
      background-position: 100% center;
    }
    100% {
      background-position: 0% center;
    }
  }
</style>
