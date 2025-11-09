<script lang="ts">
  import { Gamepad2 } from "lucide-svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { siteConfig } from "$lib/config/meta";
  import { locale } from "$lib/stores/locale";
  import { t } from "$lib/i18n";

  interface SiteConfigItem {
    key: string;
    value_id: string;
    value_en: string;
  }

  interface ContactData {
    social_links?: {
      instagram?: string;
      youtube?: string;
      tiktok?: string;
      twitter?: string;
      discord?: string;
    };
  }

  interface Category {
    id: string;
    title_id: string;
    title_en: string;
  }

  interface Props {
    siteConfig?: SiteConfigItem[];
    contactData?: ContactData;
    categories?: Category[];
  }

  let {
    siteConfig: dbSiteConfig = [],
    contactData,
    categories = [],
  }: Props = $props();

  // Helper function to get config value
  function getConfigValue(key: string, fallback?: string): string {
    const config = dbSiteConfig.find((c) => c.key === key);
    return config?.value_id || fallback || siteConfig.name;
  }

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

  const siteName = $derived(getConfigValue("site_name", siteConfig.name));
  const siteDescription = $derived(
    getConfigValue("site_description_id", siteConfig.description)
  );
  const siteSlogan = $derived(getConfigValue("site_slogan", siteConfig.slogan));
  const socialLinks = $derived(
    contactData?.social_links || {
      instagram: siteConfig.links.instagram,
      youtube: siteConfig.links.youtube,
      tiktok: siteConfig.links.tiktok,
    }
  );
  const topCategories = $derived(categories.slice(0, 4)); // Show first 4 categories
</script>

<footer id="footer" class="container py-24 pb-16 sm:py-32 sm:pb-24">
  <div
    class="p-10 bg-muted/50 dark:bg-card border-2 border-jgYellow/20 rounded-2xl"
  >
    <div
      class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8"
    >
      <div class="col-span-full xl:col-span-2">
        <a href="/" class="flex font-bold items-center gap-2 mb-4">
          <Gamepad2
            class="bg-gradient-to-br from-jgYellow to-jgYellow/80 rounded-lg w-9 h-9 p-1.5 border-2 border-jgPurple text-jgPurple"
          />
          <h3
            class="text-2xl bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text text-transparent"
          >
            {siteName}
          </h3>
        </a>
        <p class="text-sm text-muted-foreground max-w-xs">
          {siteDescription}
        </p>
        <p class="text-sm text-jgYellow font-semibold italic mt-2">
          "{siteSlogan}"
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">
          {$t("footer.navigation")}
        </h3>
        <div>
          <a
            href="#home"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >{$t("nav.home")}</a
          >
        </div>
        <div>
          <a
            href="#berita"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >{$t("nav.news")}</a
          >
        </div>
        <div>
          <a
            href="#kategori"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >{$t("nav.categories")}</a
          >
        </div>
        <div>
          <a
            href="#tentang"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >{$t("nav.about")}</a
          >
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">
          {$t("footer.categories")}
        </h3>
        {#each topCategories as category}
          <div>
            <span class="opacity-60 hover:opacity-100 cursor-pointer">
              {getLocalizedText(category.title_id, category.title_en)}
            </span>
          </div>
        {/each}
        {#if topCategories.length === 0}
          <!-- Fallback categories if no data -->
          <div>
            <span class="opacity-60 hover:opacity-100 cursor-pointer"
              >Action</span
            >
          </div>
          <div>
            <span class="opacity-60 hover:opacity-100 cursor-pointer">RPG</span>
          </div>
          <div>
            <span class="opacity-60 hover:opacity-100 cursor-pointer"
              >Strategy</span
            >
          </div>
          <div>
            <span class="opacity-60 hover:opacity-100 cursor-pointer"
              >Indie</span
            >
          </div>
        {/if}
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">{$t("footer.help")}</h3>
        <div>
          <a
            href="#contact"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >{$t("footer.contact")}</a
          >
        </div>
        <div>
          <a
            href="#tentang"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >{$t("footer.about")}</a
          >
        </div>
        <div>
          <button
            type="button"
            class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all text-left"
            >{$t("footer.privacy")}</button
          >
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-bold text-lg text-jgYellow">{$t("footer.social")}</h3>
        {#if socialLinks.instagram}
          <div>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >
              Instagram
            </a>
          </div>
        {/if}
        {#if socialLinks.youtube}
          <div>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >
              YouTube
            </a>
          </div>
        {/if}
        {#if socialLinks.tiktok}
          <div>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              class="opacity-60 hover:opacity-100 hover:text-jgYellow transition-all"
            >
              TikTok
            </a>
          </div>
        {/if}
      </div>
    </div>

    <Separator class="my-6 bg-jgYellow/20" />

    <section class="text-center">
      <h3 class="text-sm text-muted-foreground">
        &copy; 2025 <span class="font-bold text-jgYellow">{siteName}</span> - {$t(
          "footer.tagline"
        )}
      </h3>
      <p class="text-xs text-muted-foreground mt-2">
        {$t("footer.madeWith")}
      </p>
    </section>
  </div>
</footer>
