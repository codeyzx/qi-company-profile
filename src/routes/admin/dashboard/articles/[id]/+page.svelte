<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
  import * as Select from "$lib/components/ui/select";
  import { ArrowLeft, Save, Eye } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import ImageUpload from "$lib/components/ImageUpload.svelte";

  let { data }: { data: PageData } = $props();

  // Create a reactive copy to handle null article
  let article = $state(data.article || ({} as any));

  $effect(() => {
    article = data.article || ({} as any);
  });

  let saving = $state(false);

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "scheduled", label: "Scheduled" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
</script>

<div class="p-8">
  <div class="flex items-center gap-4 mb-6">
    <Button href="/admin/dashboard/articles" variant="outline" size="icon">
      <ArrowLeft class="size-4" />
    </Button>
    <div>
      <h1 class="text-3xl font-bold">
        {data.isNew ? "Create" : "Edit"} Article
      </h1>
      <p class="text-muted-foreground">Fill in the details for your article</p>
    </div>
  </div>

  <form
    method="POST"
    action="?/save"
    use:enhance={() => {
      saving = true;
      return async ({ update }) => {
        await update();
        saving = false;
      };
    }}
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <Tabs value="indonesian" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="indonesian">🇮🇩 Indonesian</TabsTrigger>
            <TabsTrigger value="english">🇺🇸 English</TabsTrigger>
          </TabsList>

          <TabsContent value="indonesian" class="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content (Indonesian)</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div>
                  <Label for="title_id">Title</Label>
                  <Input
                    id="title_id"
                    name="title_id"
                    value={article.title_id || ""}
                    required
                    onblur={(e) => {
                      const slugInput = document.getElementById(
                        "slug_id"
                      ) as HTMLInputElement;
                      if (slugInput && !slugInput.value) {
                        slugInput.value = generateSlug(e.currentTarget.value);
                      }
                    }}
                  />
                </div>

                <div>
                  <Label for="slug_id">Slug</Label>
                  <Input
                    id="slug_id"
                    name="slug_id"
                    value={article.slug_id || ""}
                    required
                  />
                </div>

                <div>
                  <Label for="excerpt_id">Excerpt</Label>
                  <Textarea
                    id="excerpt_id"
                    name="excerpt_id"
                    value={article.excerpt_id || ""}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label for="content_id">Content</Label>
                  <Textarea
                    id="content_id"
                    name="content_id"
                    value={article.content_id || ""}
                    rows={12}
                    required
                  />
                </div>

                <div>
                  <Label for="category_id">Category</Label>
                  <Input
                    id="category_id"
                    name="category_id"
                    value={article.category_id || ""}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="english" class="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content (English)</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div>
                  <Label for="title_en">Title</Label>
                  <Input
                    id="title_en"
                    name="title_en"
                    value={article.title_en || ""}
                    required
                  />
                </div>

                <div>
                  <Label for="slug_en">Slug</Label>
                  <Input
                    id="slug_en"
                    name="slug_en"
                    value={article.slug_en || ""}
                    required
                  />
                </div>

                <div>
                  <Label for="excerpt_en">Excerpt</Label>
                  <Textarea
                    id="excerpt_en"
                    name="excerpt_en"
                    value={article.excerpt_en || ""}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label for="content_en">Content</Label>
                  <Textarea
                    id="content_en"
                    name="content_en"
                    value={article.content_en || ""}
                    rows={12}
                    required
                  />
                </div>

                <div>
                  <Label for="category_en">Category</Label>
                  <Input
                    id="category_en"
                    name="category_en"
                    value={article.category_en || ""}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <!-- SEO Section -->
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <Tabs value="seo-id" class="w-full">
              <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="seo-id">Indonesian</TabsTrigger>
                <TabsTrigger value="seo-en">English</TabsTrigger>
              </TabsList>

              <TabsContent value="seo-id" class="space-y-4">
                <div>
                  <Label for="seo_meta_title_id">Meta Title</Label>
                  <Input
                    id="seo_meta_title_id"
                    name="seo_meta_title_id"
                    value={article.seo_meta_title_id || ""}
                  />
                </div>
                <div>
                  <Label for="seo_meta_description_id">Meta Description</Label>
                  <Textarea
                    id="seo_meta_description_id"
                    name="seo_meta_description_id"
                    value={article.seo_meta_description_id || ""}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="seo-en" class="space-y-4">
                <div>
                  <Label for="seo_meta_title_en">Meta Title</Label>
                  <Input
                    id="seo_meta_title_en"
                    name="seo_meta_title_en"
                    value={article.seo_meta_title_en || ""}
                  />
                </div>
                <div>
                  <Label for="seo_meta_description_en">Meta Description</Label>
                  <Textarea
                    id="seo_meta_description_en"
                    name="seo_meta_description_en"
                    value={article.seo_meta_description_en || ""}
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div>
              <Label>OG Image</Label>
              <input
                type="hidden"
                name="seo_og_image_url"
                value={article.seo_og_image_url || ""}
              />
              <ImageUpload
                bind:value={article.seo_og_image_url}
                bucket="article-images"
                folder="og-images"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <Label for="status">Status</Label>
              <select
                name="status"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {#each statusOptions as option}
                  <option
                    value={option.value}
                    selected={article.status === option.value}
                  >
                    {option.label}
                  </option>
                {/each}
              </select>
            </div>

            <div>
              <Label for="scheduled_publish_at">Schedule Publish</Label>
              <Input
                id="scheduled_publish_at"
                name="scheduled_publish_at"
                type="datetime-local"
                value={article.scheduled_publish_at || ""}
              />
            </div>

            <div>
              <Label for="read_time">Read Time (minutes)</Label>
              <Input
                id="read_time"
                name="read_time"
                type="number"
                value={article.read_time || ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="hidden"
              name="thumbnail_url"
              value={article.thumbnail_url || ""}
            />
            <ImageUpload
              bind:value={article.thumbnail_url}
              bucket="article-images"
              folder="thumbnails"
            />
          </CardContent>
        </Card>

        <div class="flex flex-col gap-2">
          <Button
            type="submit"
            class="w-full bg-gradient-to-r from-jgYellow to-jgYellow/90 text-black font-semibold"
            disabled={saving}
          >
            <Save class="size-4 mr-2" />
            {saving ? "Saving..." : "Save Article"}
          </Button>

          <Button type="button" variant="outline" class="w-full">
            <Eye class="size-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  </form>
</div>
