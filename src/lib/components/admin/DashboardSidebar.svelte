<script lang="ts">
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import {
    LayoutDashboard,
    FileText,
    Home,
    FolderOpen,
    Users,
    Phone,
    Settings,
    LogOut,
    Menu,
    X,
  } from "lucide-svelte";

  let isOpen = $state(false);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Hero Section", href: "/admin/dashboard/hero", icon: Home },
    { name: "Articles", href: "/admin/dashboard/articles", icon: FileText },
    {
      name: "Categories",
      href: "/admin/dashboard/categories",
      icon: FolderOpen,
    },
    { name: "About Us", href: "/admin/dashboard/about", icon: Users },
    { name: "Contact Info", href: "/admin/dashboard/contact", icon: Phone },
    { name: "Navigation Menu", href: "/admin/dashboard/navbar", icon: Menu },
    { name: "Site Config", href: "/admin/dashboard/config", icon: Settings },
  ];

  function isActive(href: string) {
    return (
      $page.url.pathname === href ||
      ($page.url.pathname.startsWith(href) && href !== "/admin/dashboard")
    );
  }
</script>

<!-- Mobile menu button -->
<div class="md:hidden fixed top-2 left-2 z-50">
  <Button
    variant="outline"
    size="sm"
    onclick={() => (isOpen = !isOpen)}
    class="bg-background shadow-lg"
  >
    {#if isOpen}
      <X class="h-4 w-4" />
    {:else}
      <Menu class="h-4 w-4" />
    {/if}
  </Button>
</div>

<!-- Sidebar -->
<div
  class="sidebar
  {isOpen ? 'translate-x-0' : '-translate-x-full'} 
  md:translate-x-0
"
>
  <div class="flex h-full flex-col overflow-y-auto">
    <!-- Logo -->
    <div class="flex h-16 items-center border-b px-6">
      <h1
        class="text-xl font-bold bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text text-transparent"
      >
        Jelajah Game
      </h1>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 px-3 py-4">
      {#each navigation as item}
        <a
          href={item.href}
          class="
            group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
            {isActive(item.href)
            ? 'bg-jgYellow/10 text-jgYellow border-r-2 border-jgYellow'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}
          "
          onclick={() => (isOpen = false)}
        >
          <item.icon class="mr-3 h-4 w-4 flex-shrink-0" />
          {item.name}
        </a>
      {/each}
    </nav>

    <Separator />

    <!-- User section -->
    <div class="p-4">
      <form action="/admin/logout" method="POST">
        <Button
          type="submit"
          variant="ghost"
          class="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut class="mr-3 h-4 w-4" />
          Logout
        </Button>
      </form>
    </div>
  </div>
</div>

<!-- Overlay for mobile -->
{#if isOpen}
  <button
    class="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
    onclick={() => (isOpen = false)}
    onkeydown={(e) => e.key === "Escape" && (isOpen = false)}
    aria-label="Close sidebar"
  ></button>
{/if}

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 16rem;
    z-index: 40;
    background-color: hsl(var(--background));
    border-right: 1px solid hsl(var(--border));
    transform: translateX(-100%);
    transition: transform 200ms ease-in-out;
  }

  @media (min-width: 768px) {
    .sidebar {
      position: fixed;
      transform: translateX(0);
      height: 100vh;
    }
  }
</style>
