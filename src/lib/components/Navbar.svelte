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
  import { siteConfig } from "$lib/config/meta";

  interface RouteProps {
    href: string;
    label: string;
  }

  const routeList: RouteProps[] = [
    { href: "#home", label: "Home" },
    { href: "#berita", label: "Berita" },
    { href: "#review", label: "Review" },
    { href: "#game-populer", label: "Game Populer" },
    { href: "#tentang", label: "Tentang Kami" },
    { href: "#contact", label: "Kontak" },
  ];

  let isOpen = false;
</script>

<header
  class="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md dark:shadow-dark shadow-light"
>
  <a href="/" class="font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-opacity">
    <Gamepad2 class="bg-gradient-to-br from-jgYellow to-jgYellow/80 rounded-lg w-9 h-9 p-1.5 border-2 border-jgPurple text-jgPurple" />
    <span class="bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text text-transparent font-bold">
      {siteConfig.name}
    </span>
  </a>

  <!-- Mobile -->
  <div class="flex items-center lg:hidden">
    <Sheet bind:open={isOpen}>
      <SheetTrigger>
        <Menu on:click={() => (isOpen = true)} class="cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card">
        <div>
          <SheetHeader class="mb-4 ml-4">
            <SheetTitle class="flex items-center gap-2">
              <a href="/" class="flex items-center gap-2">
                <Gamepad2 class="bg-gradient-to-br from-jgYellow to-jgYellow/80 rounded-lg size-9 p-1.5 border-2 border-jgPurple text-jgPurple" />
                <span class="bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text text-transparent font-bold">
                  {siteConfig.name}
                </span>
              </a>
            </SheetTitle>
          </SheetHeader>

          <div class="flex flex-col gap-2">
            {#each routeList as { href, label }}
              <a on:click={() => (isOpen = false)} {href}>
                <Button variant="ghost" class="justify-start text-base w-full">
                  {label}
                </Button>
              </a>
            {/each}
          </div>
        </div>

        <SheetFooter class="flex-col sm:flex-col justify-start items-start">
          <Separator class="mb-2" />
          <ToggleTheme />
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
</style>
