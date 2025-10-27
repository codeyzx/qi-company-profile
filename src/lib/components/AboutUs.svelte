<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Target, Users, Zap, Heart } from "lucide-svelte";
  import { siteConfig } from "$lib/config/meta";
</script>

<section id="tentang" class="container py-20 md:py-24 bg-muted/30">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgPurple/50">
      <span class="text-jgPurple font-semibold">TENTANG KAMI</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      Siapa Kami <span class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text">?</span>
    </h2>
    <p class="text-muted-foreground text-lg max-w-3xl mx-auto">
      {siteConfig.name} adalah portal berita game terpercaya yang didedikasikan untuk komunitas gamer Indonesia
    </p>
  </div>

  <div class="max-w-6xl mx-auto">
    <!-- Main Description -->
    <div class="bg-card rounded-2xl p-8 md:p-12 border-2 border-jgYellow/20 mb-12 shadow-lg">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 class="text-2xl md:text-3xl font-bold mb-4">
            <span class="text-jgYellow">Portal Game</span> untuk Gen Z
          </h3>
          <p class="text-muted-foreground mb-4 leading-relaxed">
            Kami adalah tim yang passionate tentang dunia gaming. Sejak didirikan, kami berkomitmen untuk menghadirkan konten berkualitas tinggi yang mencakup berita terkini, review mendalam, dan panduan lengkap tentang game lokal dan internasional.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Dengan gaya penulisan yang modern dan relatable untuk Gen Z, kami berusaha menjadi sumber informasi terpercaya bagi komunitas gamer Indonesia.
          </p>
          <div class="mt-6">
            <p class="text-jgYellow font-bold text-xl italic">"{siteConfig.slogan}"</p>
          </div>
        </div>

        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
            alt="Gaming Community"
            class="rounded-xl shadow-2xl border-4 border-jgYellow/30"
          />
          <div class="absolute -bottom-4 -right-4 bg-jgYellow text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg">
            Est. 2023
          </div>
        </div>
      </div>
    </div>

    <!-- Values Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-card rounded-xl p-6 border hover:border-jgYellow transition-all hover:shadow-lg group">
        <div class="bg-jgYellow/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-jgYellow/20 transition-colors">
          <Target class="size-6 text-jgYellow" />
        </div>
        <h4 class="font-bold text-lg mb-2">Fokus Kualitas</h4>
        <p class="text-sm text-muted-foreground">
          Setiap konten kami dibuat dengan riset mendalam dan standar jurnalisme yang tinggi
        </p>
      </div>

      <div class="bg-card rounded-xl p-6 border hover:border-jgPurple transition-all hover:shadow-lg group">
        <div class="bg-jgPurple/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-jgPurple/20 transition-colors">
          <Users class="size-6 text-jgPurple" />
        </div>
        <h4 class="font-bold text-lg mb-2">Komunitas First</h4>
        <p class="text-sm text-muted-foreground">
          Kami mendengarkan feedback komunitas dan terus berkembang bersama
        </p>
      </div>

      <div class="bg-card rounded-xl p-6 border hover:border-jgYellow transition-all hover:shadow-lg group">
        <div class="bg-jgYellow/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-jgYellow/20 transition-colors">
          <Zap class="size-6 text-jgYellow" />
        </div>
        <h4 class="font-bold text-lg mb-2">Update Cepat</h4>
        <p class="text-sm text-muted-foreground">
          Berita gaming terkini langsung di ujung jari Anda, update setiap hari
        </p>
      </div>

      <div class="bg-card rounded-xl p-6 border hover:border-jgPurple transition-all hover:shadow-lg group">
        <div class="bg-jgPurple/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-jgPurple/20 transition-colors">
          <Heart class="size-6 text-jgPurple" />
        </div>
        <h4 class="font-bold text-lg mb-2">Made with Passion</h4>
        <p class="text-sm text-muted-foreground">
          Dibuat oleh gamer, untuk gamer. Passion kami adalah gaming
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-12 bg-gradient-to-r from-jgYellow/10 via-jgPurple/10 to-jgYellow/10 rounded-2xl p-8 border-2 border-jgYellow/20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div class="text-4xl font-bold text-jgYellow mb-2">500+</div>
          <div class="text-sm text-muted-foreground">Artikel Published</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-jgPurple mb-2">100+</div>
          <div class="text-sm text-muted-foreground">Game Reviewed</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-jgYellow mb-2">50K+</div>
          <div class="text-sm text-muted-foreground">Active Readers</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-jgPurple mb-2">24/7</div>
          <div class="text-sm text-muted-foreground">News Coverage</div>
        </div>
      </div>
    </div>
  </div>
</section>
