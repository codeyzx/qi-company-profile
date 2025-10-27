<script lang="ts">
  import { Gamepad2 } from "lucide-svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { siteConfig } from "$lib/config/meta";
</script>

<footer id="footer" class="container py-24 pb-16 sm:py-32 sm:pb-24">
  <div class="p-10 bg-muted/50 dark:bg-card border-2 border-jgYellow/20 rounded-2xl">
    <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
      <div class="col-span-full xl:col-span-2">
        <a href="/" class="flex font-bold items-center gap-2 mb-4">
          <Gamepad2 class="bg-gradient-to-br from-jgYellow to-jgYellow/80 rounded-lg w-9 h-9 p-1.5 border-2 border-jgPurple text-jgPurple" />
          <h3 class="text-2xl bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text text-transparent">
            {siteConfig.name}
          </h3>
        </a>
        <p class="text-sm text-muted-foreground max-w-xs">
          {siteConfig.description}
        </p>
        <p class="text-sm text-jgYellow font-semibold italic mt-2">
          "{siteConfig.slogan}"
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">Navigasi</h3>
        <div><a href="#home" class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all">Home</a></div>
        <div><a href="#berita" class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all">Berita</a></div>
        <div><a href="#review" class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all">Review</a></div>
        <div><a href="#game-populer" class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all">Game Populer</a></div>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">Kategori</h3>
        <div><span class="opacity-60 hover:opacity-100 cursor-pointer">Action</span></div>
        <div><span class="opacity-60 hover:opacity-100 cursor-pointer">RPG</span></div>
        <div><span class="opacity-60 hover:opacity-100 cursor-pointer">Strategy</span></div>
        <div><span class="opacity-60 hover:opacity-100 cursor-pointer">Indie</span></div>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">Bantuan</h3>
        <div><a href="#contact" class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all">Hubungi Kami</a></div>
        <div><a href="#tentang" class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all">Tentang Kami</a></div>
        <div><button type="button" class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all text-left">Kebijakan Privasi</button></div>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">Sosial Media</h3>
        <div>
          <a 
            href={siteConfig.links.instagram} 
            target="_blank"
            rel="noopener noreferrer"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
          >
            Instagram
          </a>
        </div>
        <div>
          <a 
            href={siteConfig.links.youtube} 
            target="_blank"
            rel="noopener noreferrer"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
          >
            YouTube
          </a>
        </div>
        <div>
          <a 
            href={siteConfig.links.tiktok} 
            target="_blank"
            rel="noopener noreferrer"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
          >
            TikTok
          </a>
        </div>
      </div>
    </div>

    <Separator class="my-6 bg-jgYellow/20" />
    
    <section class="text-center">
      <h3 class="text-sm text-muted-foreground">
        &copy; 2025 <span class="font-bold text-jgYellow">{siteConfig.name}</span> - Portal Berita Game Indonesia
      </h3>
      <p class="text-xs text-muted-foreground mt-2">
        Dibuat dengan ❤️ untuk komunitas gamer Indonesia
      </p>
    </section>
  </div>
</footer>
