<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import StatsCard from "$lib/components/admin/StatsCard.svelte";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import {
    FileText,
    Home,
    Edit3,
    Clock,
    CheckCircle,
    Calendar,
    TrendingUp,
    Eye,
    Layers,
    Plus,
    ArrowRight,
  } from "lucide-svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const quickActions = [
    {
      icon: Plus,
      label: "Create New Article",
      href: "/admin/dashboard/articles/new",
      primary: true,
    },
    {
      icon: Home,
      label: "Edit Hero Section",
      href: "/admin/dashboard/hero",
    },
    {
      icon: Layers,
      label: "Manage Categories",
      href: "/admin/dashboard/categories",
    },
    {
      icon: Eye,
      label: "Preview Site",
      href: "/",
      external: true,
    },
  ];

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  }

  function getActionColor(action: string) {
    const colors: Record<string, string> = {
      create: "bg-green-500",
      update: "bg-blue-500",
      delete: "bg-red-500",
      publish: "bg-jgYellow",
      unpublish: "bg-gray-500",
    };
    return colors[action] || "bg-gray-500";
  }
</script>

<svelte:head>
  <title>Admin Dashboard - Jelajah Game CMS</title>
</svelte:head>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold mb-2">Dashboard Overview</h1>
    <p class="text-muted-foreground">
      Welcome back! Here's what's happening with your content.
    </p>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatsCard
      title="Total Articles"
      value={data.stats.totalArticles}
      description="All time"
      icon={FileText}
      color="success"
    />

    <StatsCard
      title="Published"
      value={data.stats.publishedArticles}
      description="Live articles"
      icon={CheckCircle}
      color="success"
    />

    <StatsCard
      title="Drafts"
      value={data.stats.draftArticles}
      description="In progress"
      icon={Edit3}
      color="warning"
    />

    <StatsCard
      title="Scheduled"
      value={data.stats.scheduledArticles}
      description="Auto-publish queue"
      icon={Calendar}
      color="default"
    />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Quick Actions -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <TrendingUp class="size-5 text-jgYellow" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common tasks to get started</CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        {#each quickActions as action}
          {@const Icon = action.icon}
          <Button
            href={action.href}
            class="w-full justify-between group {action.primary
              ? 'bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold'
              : 'variant-outline'}"
            target={action.external ? "_blank" : undefined}
          >
            <div class="flex items-center gap-2">
              <Icon class="size-4" />
              {action.label}
            </div>
            <ArrowRight
              class="size-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
        {/each}
      </CardContent>
    </Card>

    <!-- Recent Activity -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Clock class="size-5 text-jgPurple" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest changes in your CMS</CardDescription>
      </CardHeader>
      <CardContent>
        {#if data.recentActivity.length === 0}
          <p class="text-sm text-muted-foreground text-center py-8">
            No activity yet
          </p>
        {:else}
          <div class="space-y-4">
            {#each data.recentActivity.slice(0, 5) as activity}
              {@const act = activity as any}
              <div class="flex gap-3">
                <div
                  class={`w-2 h-2 rounded-full mt-2 ${getActionColor(act.action)}`}
                ></div>
                <div class="flex-1">
                  <p class="text-sm">
                    <span class="font-semibold capitalize">{act.action}</span>
                    {" "}on{" "}
                    <span class="text-jgYellow">{act.table_name}</span>
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {formatDate(act.created_at)}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </CardContent>
    </Card>
  </div>

  <!-- Content Summary -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <StatsCard
      title="Hero Section"
      value={data.stats.totalHero}
      description="Active hero content"
      icon={Home}
      color="warning"
    />

    <StatsCard
      title="Categories"
      value={data.stats.totalCategories}
      description="Game categories"
      icon={Layers}
      color="default"
    />

    <StatsCard
      title="Total Content"
      value={data.stats.totalArticles +
        data.stats.totalHero +
        data.stats.totalCategories}
      description="All content pieces"
      icon={FileText}
      color="success"
    />
  </div>
</div>
