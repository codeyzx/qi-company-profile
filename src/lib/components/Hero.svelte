<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight, Gamepad2, Trophy, Zap } from "lucide-svelte";
  import { siteConfig } from "$lib/config/meta";
  import { locale } from "$lib/stores/locale";
  import { t } from "$lib/i18n";

  interface HeroData {
    id?: string;
    title_id: string;
    title_en: string;
    subtitle_id?: string;
    subtitle_en?: string;
    description_id: string;
    description_en: string;
    badge_text_id?: string;
    badge_text_en?: string;
    cta_primary_text_id?: string;
    cta_primary_text_en?: string;
    cta_primary_url?: string;
    cta_secondary_text_id?: string;
    cta_secondary_text_en?: string;
    cta_secondary_url?: string;
    stats?:
      | Array<{
          value: string;
          label_id: string;
          label_en: string;
        }>
      | string; // JSON string from database
    status?: "draft" | "published";
    version?: number;
    created_at?: string;
    updated_at?: string;
    updated_by?: string;
  }

  interface Props {
    heroData?: HeroData;
  }

  let { heroData }: Props = $props();

  // Helper function to get localized content with proper fallbacks
  function getLocalizedText(
    textId?: string,
    textEn?: string,
    fallbackKey?: string,
    defaultFallback?: string
  ): string {
    if ($locale === "en") {
      return (
        textEn ||
        textId ||
        (fallbackKey ? $t(fallbackKey) : "") ||
        defaultFallback ||
        ""
      );
    }
    return (
      textId ||
      textEn ||
      (fallbackKey ? $t(fallbackKey) : "") ||
      defaultFallback ||
      ""
    );
  }

  // Helper function to parse stats from database
  function parseStats(
    statsData?: Array<any> | string
  ): Array<{ value: string; label_id: string; label_en: string }> {
    if (!statsData) return getDefaultStats();

    if (typeof statsData === "string") {
      try {
        return JSON.parse(statsData);
      } catch {
        return getDefaultStats();
      }
    }

    return Array.isArray(statsData) ? statsData : getDefaultStats();
  }

  // Default stats if no data available
  function getDefaultStats() {
    return [
      { value: "500+", label_id: "Artikel Game", label_en: "Game Articles" },
      { value: "100+", label_id: "Game Reviews", label_en: "Game Reviews" },
      { value: "50K+", label_id: "Pembaca Aktif", label_en: "Active Readers" },
    ];
  }

  // Computed values with proper fallbacks and i18n integration
  const title = $derived(
    getLocalizedText(
      heroData?.title_id,
      heroData?.title_en,
      "hero.explore",
      "Jelajahi Dunia Game Bersama Kami"
    )
  );

  const description = $derived(
    getLocalizedText(
      heroData?.description_id,
      heroData?.description_en,
      undefined,
      siteConfig.description
    )
  );

  const badgeText = $derived(
    getLocalizedText(
      heroData?.badge_text_id,
      heroData?.badge_text_en,
      "hero.badge",
      "Portal Game Terkini untuk Gen Z"
    )
  );

  const ctaPrimaryText = $derived(
    getLocalizedText(
      heroData?.cta_primary_text_id,
      heroData?.cta_primary_text_en,
      "hero.readLatestNews",
      "Baca Berita Terbaru"
    )
  );

  const ctaSecondaryText = $derived(
    getLocalizedText(
      heroData?.cta_secondary_text_id,
      heroData?.cta_secondary_text_en,
      "hero.exploreGames",
      "Explore Game Populer"
    )
  );

  // URLs with sensible defaults
  const ctaPrimaryUrl = $derived(heroData?.cta_primary_url || "#berita");
  const ctaSecondaryUrl = $derived(heroData?.cta_secondary_url || "#kategori");

  // Stats with proper parsing and fallbacks
  const stats = $derived(parseStats(heroData?.stats));

  // Check if we have valid hero data
  const hasHeroData = $derived(
    Boolean(heroData && heroData.title_id && heroData.title_en)
  );
</script>

<section id="home" class="container">
  <div
    class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32"
  >
    <div class="text-center space-y-8">
      <Badge
        variant="outline"
        class="text-sm py-2 border-jgYellow/50 hover:bg-jgYellow/10 transition-all duration-300"
      >
        <span class="mr-2">
          <Badge
            class="bg-gradient-to-r from-jgYellow to-jgPurple text-black font-semibold"
          >
            <Zap class="size-3 mr-1" />
            {$t("hero.trending")}
          </Badge>
        </span>
        <span>{badgeText}</span>
      </Badge>

      <div
        class="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold"
      >
        <h1 class="leading-tight">
          <span class="inline-flex items-center gap-3 mb-2">
            <span class="hero-logo-animated h-16 md:h-24 w-auto inline-block">
              <img 
                src="/Logo Jelajah Game + Text.png" 
                alt="Jelajah Game"
                class="h-16 md:h-24 object-contain"
              />
            </span>
          </span>
          <br />
          <span
            class="text-transparent bg-gradient-to-r from-jgYellow via-jgPurple to-jgYellow bg-clip-text animate-gradient"
          >
            {title}
          </span>
        </h1>
      </div>

      <p
        class="max-w-screen-sm mx-auto text-xl text-muted-foreground font-medium"
      >
        {description}
        <span class="block mt-2 text-jgYellow font-semibold italic"
          >"{siteConfig.slogan}"</span
        >
      </p>

      {#if !hasHeroData}
        <div class="text-sm text-muted-foreground/70 italic">
          <!-- Fallback content indicator for development -->
          <span class="sr-only">Using default content</span>
        </div>
      {/if}

      <div class="flex flex-wrap gap-4 justify-center items-center">
        <a href={ctaPrimaryUrl}>
          <Button
            class="px-8 py-6 text-lg font-bold group/arrow bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black shadow-lg hover:shadow-xl transition-all"
          >
            <Trophy class="size-5 mr-2" />
            {ctaPrimaryText}
            <ArrowRight
              class="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform"
            />
          </Button>
        </a>

        <a href={ctaSecondaryUrl}>
          <Button
            variant="outline"
            class="px-8 py-6 text-lg font-bold border-2 border-jgPurple hover:bg-jgPurple hover:text-white transition-all"
          >
            <Gamepad2 class="size-5 mr-2" />
            {ctaSecondaryText}
          </Button>
        </a>
      </div>

      <!-- Stats -->
      <div class="flex flex-wrap justify-center gap-8 pt-8">
        {#each stats as stat, index}
          <div class="text-center">
            <div
              class="text-3xl font-bold {index % 2 === 0
                ? 'text-jgYellow'
                : 'text-jgPurple'}"
            >
              {stat.value}
            </div>
            <div class="text-sm text-muted-foreground">
              {getLocalizedText(stat.label_id, stat.label_en)}
            </div>
          </div>
        {/each}
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
      border-color: #f5cb3b33;
    }

    to {
      border-color: #322f8166;
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

  /* Hero Logo Animation - SAMA PERSIS dengan text gradient menggunakan mask */
  :global(.hero-logo-animated) {
    display: inline-block;
    background: linear-gradient(90deg, #fbbf24 0%, #322F81 50%, #fbbf24 100%);
    background-size: 200% 100%;
    animation: gradient 3s linear infinite;
    -webkit-mask: url('/Logo Jelajah Game + Text.png') no-repeat center;
    -webkit-mask-size: contain;
    mask: url('/Logo Jelajah Game + Text.png') no-repeat center;
    mask-size: contain;
  }
  
  :global(.hero-logo-animated img) {
    opacity: 0;
  }
</style>
