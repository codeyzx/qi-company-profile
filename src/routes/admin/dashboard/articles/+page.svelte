<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Plus, Edit, Trash2, Eye, CheckCircle, Clock } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      draft: "bg-gray-500",
      published: "bg-green-500",
      scheduled: "bg-jgYellow text-black",
      archived: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  }
</script>

<div class="p-8">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-3xl font-bold">Articles Management</h1>
      <p class="text-muted-foreground">Manage your news articles and content</p>
    </div>
    <Button
      href="/admin/dashboard/articles/create"
      class="bg-gradient-to-r from-jgYellow to-jgYellow/90 text-black font-semibold"
    >
      <Plus class="size-4 mr-2" />
      New Article
    </Button>
  </div>

  <div class="grid gap-4">
    {#each data.articles as article}
      <Card class="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <Badge class={getStatusColor((article as any).status)}>
                  {(article as any).status}
                </Badge>
                {#if (article as any).category_id}
                  <Badge variant="outline">{(article as any).category_id}</Badge
                  >
                {/if}
              </div>
              <CardTitle class="text-xl">{(article as any).title_id}</CardTitle>
              <CardDescription class="mt-2 line-clamp-2"
                >{(article as any).excerpt_id}</CardDescription
              >
            </div>
            {#if (article as any).thumbnail_url}
              <img
                src={(article as any).thumbnail_url}
                alt={(article as any).title_id}
                class="w-24 h-24 object-cover rounded ml-4"
              />
            {/if}
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div class="text-sm text-muted-foreground">
              <span
                >By {(article as any).admin_users?.full_name ||
                  (article as any).admin_users?.email}</span
              >
              <span class="mx-2">•</span>
              <span
                >{new Date(
                  (article as any).created_at
                ).toLocaleDateString()}</span
              >
              {#if (article as any).read_time}
                <span class="mx-2">•</span>
                <span>{(article as any).read_time} min read</span>
              {/if}
            </div>
            <div class="flex gap-2">
              <Button
                href="/admin/dashboard/articles/{(article as any).id}"
                variant="outline"
                size="sm"
              >
                <Edit class="size-4 mr-1" />
                Edit
              </Button>
              {#if (article as any).status === "draft"}
                <form method="POST" action="?/publish" use:enhance>
                  <input type="hidden" name="id" value={(article as any).id} />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    class="border-green-500 text-green-500"
                  >
                    <CheckCircle class="size-4 mr-1" />
                    Publish
                  </Button>
                </form>
              {:else if (article as any).status === "published"}
                <form method="POST" action="?/unpublish" use:enhance>
                  <input type="hidden" name="id" value={(article as any).id} />
                  <Button type="submit" variant="outline" size="sm">
                    <Clock class="size-4 mr-1" />
                    Unpublish
                  </Button>
                </form>
              {/if}
              <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="id" value={(article as any).id} />
                <Button type="submit" variant="destructive" size="sm">
                  <Trash2 class="size-4 mr-1" />
                  Delete
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    {:else}
      <Card>
        <CardContent class="py-12 text-center">
          <p class="text-muted-foreground mb-4">
            No articles yet. Create your first article!
          </p>
          <Button
            href="/admin/dashboard/articles/create"
            class="bg-gradient-to-r from-jgYellow to-jgYellow/90 text-black"
          >
            <Plus class="size-4 mr-2" />
            Create Article
          </Button>
        </CardContent>
      </Card>
    {/each}
  </div>
</div>
