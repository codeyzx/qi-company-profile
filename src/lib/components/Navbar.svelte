<script lang="ts">
  import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "$lib/components/ui/sheet";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { Menu, Gamepad2 } from "lucide-svelte";
  import ToggleTheme from "$lib/components/ToggleTheme.svelte";
  import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
  import { siteConfig } from "$lib/config/meta";
  import { locale } from "$lib/stores/locale";
  import { t } from "$lib/i18n";

  interface RouteProps {
    href: string;
    label: string;
  }

  interface SiteConfigItem {
    key: string;
    value_id: string;
    value_en: string;
  }

  interface NavbarConfig {
    menu_items?: Array<{
      href: string;
      label_id: string;
      label_en: string;
      order: number;
    }>;
  }

  interface Props {
    siteConfig?: SiteConfigItem[];
    navbarConfig?: NavbarConfig;
  }

  let { siteConfig: dbSiteConfig = [], navbarConfig }: Props = $props();

  // Helper function to get config value
  function getConfigValue(key: string, fallback?: string): string {
    const config = dbSiteConfig.find((c) => c.key === key);
    return config?.value_id || fallback || siteConfig.name;
  }

  // Helper function to get localized menu text
  function getLocalizedMenuText(textId: string, textEn: string): string {
    if ($locale === "en") {
      return textEn || textId;
    }
    return textId || textEn;
  }

  // Dynamic menu items or fallback
  const dynamicMenuItems = $derived(
    navbarConfig?.menu_items || [
      { href: "#home", label_id: "Home", label_en: "Home", order: 1 },
      { href: "#berita", label_id: "Berita", label_en: "News", order: 2 },
      {
        href: "#kategori",
        label_id: "Kategori",
        label_en: "Categories",
        order: 3,
      },
      {
        href: "#tentang",
        label_id: "Tentang Kami",
        label_en: "About Us",
        order: 4,
      },
      { href: "#contact", label_id: "Kontak", label_en: "Contact", order: 5 },
    ]
  );

  const routeList = $derived(
    dynamicMenuItems
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        href: item.href,
        label: getLocalizedMenuText(item.label_id, item.label_en),
      }))
  );

  let isOpen = $state(false);

  const siteName = $derived(getConfigValue("site_name", siteConfig.name));
</script>

<header
  class="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md dark:shadow-dark shadow-light"
>
  <a
    href="/"
    class="font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
  >
    <img 
      src="/Logo Jelajah Game Instagram.jpg" 
      alt="Jelajah Game Logo"
      class="w-9 h-9 rounded-lg object-cover border-2 border-jgPurple"
    />
    <span class="logo-text-gradient h-6 w-auto inline-block">
      <img 
        src="/Text Only_Jelajah Game.png" 
        alt="Jelajah Game"
        class="h-6 object-contain"
      />
    </span>
  </a>

  <!-- Mobile -->
  <div class="flex items-center lg:hidden">
    <Sheet bind:open={isOpen}>
      <SheetTrigger>
        <Menu on:click={() => (isOpen = true)} class="cursor-pointer" />
      </SheetTrigger>

      <SheetContent
        side="left"
        class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card"
      >
        <div>
          <SheetHeader class="mb-4 ml-4">
            <SheetTitle class="flex items-center gap-2">
              <a href="/" class="flex items-center gap-2">
                <Gamepad2
                  class="bg-gradient-to-br from-jgYellow to-jgYellow/80 rounded-lg size-9 p-1.5 border-2 border-jgPurple text-jgPurple"
                />
                <span
                  class="bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text text-transparent font-bold"
                >
                  {siteName}
                </span>
              </a>
            </SheetTitle>
          </SheetHeader>

          <div class="flex flex-col gap-2">
            {#each routeList as { href, label }}
              <a onclick={() => (isOpen = false)} {href}>
                <Button variant="ghost" class="justify-start text-base w-full">
                  {label}
                </Button>
              </a>
            {/each}
          </div>
        </div>

        <SheetFooter class="flex-col sm:flex-col justify-start items-start">
          <Separator class="mb-2" />
          <div class="flex gap-2 w-full">
            <LanguageSwitcher />
            <ToggleTheme />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>

  <!-- Desktop Navigation -->
  <div class="hidden lg:flex items-center gap-1">
    {#each routeList as { href, label }}
      <a {href} class={buttonVariants({ variant: "ghost", size: "default" })}>
        {label}
      </a>
    {/each}
  </div>

  <div class="hidden lg:flex items-center gap-2">
    <LanguageSwitcher />
    <ToggleTheme />
  </div>
</header>

<style>
  .shadow-light {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
  }

  .shadow-dark {
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
  }

  /* Logo Text Static Gradient - Kuning ke Biru (TANPA animasi) */
  :global(.logo-text-gradient) {
    display: inline-block;
    background: linear-gradient(90deg, #fbbf24 0%, #322F81 100%);
    -webkit-mask: url('/Text Only_Jelajah Game.png') no-repeat center;
    -webkit-mask-size: contain;
    mask: url('/Text Only_Jelajah Game.png') no-repeat center;
    mask-size: contain;
  }
  
  :global(.logo-text-gradient img) {
    opacity: 0;
  }
</style>
