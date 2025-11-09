<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Target, Users, Zap, Heart } from "lucide-svelte";
  import { siteConfig } from "$lib/config/meta";
  import { locale } from "$lib/stores/locale";
  import { t } from "$lib/i18n";

  interface AboutData {
    main_title_id: string;
    main_title_en: string;
    main_description_id: string;
    main_description_en: string;
    secondary_description_id?: string;
    secondary_description_en?: string;
    slogan_id?: string;
    slogan_en?: string;
    image_url?: string;
    values?: Array<{
      icon: string;
      title_id: string;
      title_en: string;
      description_id: string;
      description_en: string;
    }>;
    stats?: Array<{
      value: string;
      label_id: string;
      label_en: string;
      color?: string;
    }>;
  }

  interface Props {
    aboutData?: AboutData;
  }

  let { aboutData }: Props = $props();

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

  // Default values if no data from database
  const defaultValues = [
    {
      icon: "Target",
      title_id: "Fokus Kualitas",
      title_en: "Quality Focus",
      description_id:
        "Setiap konten kami dibuat dengan riset mendalam dan standar jurnalisme yang tinggi",
      description_en:
        "Every content we create is made with deep research and high journalistic standards",
    },
    {
      icon: "Users",
      title_id: "Komunitas First",
      title_en: "Community First",
      description_id:
        "Kami mendengarkan feedback komunitas dan terus berkembang bersama",
      description_en:
        "We listen to community feedback and continue to grow together",
    },
    {
      icon: "Zap",
      title_id: "Update Cepat",
      title_en: "Fast Updates",
      description_id:
        "Berita gaming terkini langsung di ujung jari Anda, update setiap hari",
      description_en:
        "Latest gaming news right at your fingertips, updated daily",
    },
    {
      icon: "Heart",
      title_id: "Made with Passion",
      title_en: "Made with Passion",
      description_id:
        "Dibuat oleh gamer, untuk gamer. Passion kami adalah gaming",
      description_en: "Made by gamers, for gamers. Gaming is our passion",
    },
  ];

  const defaultStats = [
    {
      value: "500+",
      label_id: "Artikel Published",
      label_en: "Articles Published",
      color: "jgYellow",
    },
    {
      value: "100+",
      label_id: "Game Reviewed",
      label_en: "Games Reviewed",
      color: "jgPurple",
    },
    {
      value: "50K+",
      label_id: "Active Readers",
      label_en: "Active Readers",
      color: "jgYellow",
    },
    {
      value: "24/7",
      label_id: "News Coverage",
      label_en: "News Coverage",
      color: "jgPurple",
    },
  ];

  const mainTitle = $derived(
    aboutData
      ? getLocalizedText(
          aboutData.main_title_id,
          aboutData.main_title_en,
          "Siapa Kami ?"
        )
      : "Siapa Kami ?"
  );
  const mainDescription = $derived(
    aboutData
      ? getLocalizedText(
          aboutData.main_description_id,
          aboutData.main_description_en,
          `${siteConfig.name} adalah portal berita game terpercaya yang didedikasikan untuk komunitas gamer Indonesia`
        )
      : `${siteConfig.name} adalah portal berita game terpercaya yang didedikasikan untuk komunitas gamer Indonesia`
  );
  const secondaryDescription = $derived(
    aboutData
      ? getLocalizedText(
          aboutData.secondary_description_id,
          aboutData.secondary_description_en,
          "Kami adalah tim yang passionate tentang dunia gaming. Sejak didirikan, kami berkomitmen untuk menghadirkan konten berkualitas tinggi yang mencakup berita terkini, review mendalam, dan panduan lengkap tentang game lokal dan internasional."
        )
      : "Kami adalah tim yang passionate tentang dunia gaming. Sejak didirikan, kami berkomitmen untuk menghadirkan konten berkualitas tinggi yang mencakup berita terkini, review mendalam, dan panduan lengkap tentang game lokal dan internasional."
  );
  const slogan = $derived(
    aboutData
      ? getLocalizedText(
          aboutData.slogan_id,
          aboutData.slogan_en,
          siteConfig.slogan
        )
      : siteConfig.slogan
  );
  const imageUrl = $derived(
    aboutData?.image_url ||
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
  );
  const values = $derived(aboutData?.values || defaultValues);
  const stats = $derived(aboutData?.stats || defaultStats);

  // Helper function to get icon component
  function getIconComponent(iconName: string) {
    const iconMap = {
      Target: Target,
      Users: Users,
      Zap: Zap,
      Heart: Heart,
    };
    return iconMap[iconName as keyof typeof iconMap] || Target;
  }
</script>

<section id="tentang" class="container py-20 md:py-24">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgPurple/50">
      <span class="text-jgPurple font-semibold">{$t("about.badge")}</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      <span
        class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text"
        >{mainTitle}</span
      >
    </h2>
    <p class="text-muted-foreground text-lg max-w-3xl mx-auto">
      {mainDescription}
    </p>
  </div>

  <div class="max-w-6xl mx-auto">
    <!-- Main Description -->
    <div
      class="bg-card rounded-2xl p-8 md:p-12 border-2 border-jgYellow/20 mb-12 shadow-lg"
    >
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 class="text-2xl md:text-3xl font-bold mb-4">
            <span class="text-jgYellow">Portal Game</span> untuk Gen Z
          </h3>
          <p class="text-muted-foreground mb-4 leading-relaxed">
            {secondaryDescription}
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Dengan gaya penulisan yang modern dan relatable untuk Gen Z, kami
            berusaha menjadi sumber informasi terpercaya bagi komunitas gamer
            Indonesia.
          </p>
          <div class="mt-6">
            <p class="text-jgYellow font-bold text-xl italic">"{slogan}"</p>
          </div>
        </div>

        <div class="relative">
          <img
            src={imageUrl}
            alt="Gaming Community"
            class="rounded-xl shadow-2xl border-4 border-jgYellow/30"
          />
          <div
            class="absolute -bottom-4 -right-4 bg-jgYellow text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg"
          >
            Est. 2023
          </div>
        </div>
      </div>
    </div>

    <!-- Values Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each values as value, index}
        {@const IconComponent = getIconComponent(value.icon)}
        {@const isYellow = index % 2 === 0}
        {@const colorClass = isYellow ? "jgYellow" : "jgPurple"}

        <div
          class="bg-card rounded-xl p-6 border hover:border-{colorClass} transition-all hover:shadow-lg group"
        >
          <div
            class="bg-{colorClass}/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-{colorClass}/20 transition-colors"
          >
            {#if IconComponent}
              {@const Icon = IconComponent}
              <Icon class="size-6 text-{colorClass}" />
            {/if}
          </div>
          <h4 class="font-bold text-lg mb-2">
            {getLocalizedText(value.title_id, value.title_en)}
          </h4>
          <p class="text-sm text-muted-foreground">
            {getLocalizedText(value.description_id, value.description_en)}
          </p>
        </div>
      {/each}
    </div>

    <!-- Stats -->
    <div
      class="mt-12 bg-gradient-to-r from-jgYellow/10 via-jgPurple/10 to-jgYellow/10 rounded-2xl p-8 border-2 border-jgYellow/20"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {#each stats as stat}
          <div>
            <div
              class="text-4xl font-bold text-{stat.color || 'jgYellow'} mb-2"
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
