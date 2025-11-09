<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
  import { CheckCircle, AlertCircle } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let loading = $state(false);
</script>

<svelte:head>
  <title>Hero Content - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold">Hero Content</h1>
    <p class="text-muted-foreground">
      Manage your homepage hero section content
    </p>
  </div>

  {#if form?.success}
    <Alert class="border-green-500 bg-green-50">
      <CheckCircle class="h-4 w-4 text-green-600" />
      <AlertDescription class="text-green-800">
        {form.message}
      </AlertDescription>
    </Alert>
  {/if}

  {#if form?.error}
    <Alert class="border-red-500 bg-red-50">
      <AlertCircle class="h-4 w-4 text-red-600" />
      <AlertDescription class="text-red-800">
        {form.error}
      </AlertDescription>
    </Alert>
  {/if}

  <Card>
    <CardHeader>
      <CardTitle>Edit Hero Content</CardTitle>
    </CardHeader>
    <CardContent>
      <form
        method="POST"
        action="?/update"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            await update();
            loading = false;
          };
        }}
      >
        <Tabs value="indonesian" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="indonesian">Indonesian</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
          </TabsList>

          <TabsContent value="indonesian" class="space-y-4">
            <div>
              <Label for="title_id">Title (Indonesian)</Label>
              <Input
                id="title_id"
                name="title_id"
                value={data.heroContent?.title_id || ""}
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label for="description_id">Description (Indonesian)</Label>
              <Textarea
                id="description_id"
                name="description_id"
                value={data.heroContent?.description_id || ""}
                required
                disabled={loading}
                rows={3}
              />
            </div>

            <div>
              <Label for="badge_text_id">Badge Text (Indonesian)</Label>
              <Input
                id="badge_text_id"
                name="badge_text_id"
                value={data.heroContent?.badge_text_id || ""}
                disabled={loading}
              />
            </div>

            <div>
              <Label for="cta_primary_text_id"
                >Primary CTA Text (Indonesian)</Label
              >
              <Input
                id="cta_primary_text_id"
                name="cta_primary_text_id"
                value={data.heroContent?.cta_primary_text_id || ""}
                disabled={loading}
                placeholder="Baca Berita Terbaru"
              />
            </div>

            <div>
              <Label for="cta_secondary_text_id"
                >Secondary CTA Text (Indonesian)</Label
              >
              <Input
                id="cta_secondary_text_id"
                name="cta_secondary_text_id"
                value={data.heroContent?.cta_secondary_text_id || ""}
                disabled={loading}
                placeholder="Explore Game Populer"
              />
            </div>
          </TabsContent>

          <TabsContent value="english" class="space-y-4">
            <div>
              <Label for="title_en">Title (English)</Label>
              <Input
                id="title_en"
                name="title_en"
                value={data.heroContent?.title_en || ""}
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label for="description_en">Description (English)</Label>
              <Textarea
                id="description_en"
                name="description_en"
                value={data.heroContent?.description_en || ""}
                required
                disabled={loading}
                rows={3}
              />
            </div>

            <div>
              <Label for="badge_text_en">Badge Text (English)</Label>
              <Input
                id="badge_text_en"
                name="badge_text_en"
                value={data.heroContent?.badge_text_en || ""}
                disabled={loading}
              />
            </div>

            <div>
              <Label for="cta_primary_text_en">Primary CTA Text (English)</Label
              >
              <Input
                id="cta_primary_text_en"
                name="cta_primary_text_en"
                value={data.heroContent?.cta_primary_text_en || ""}
                disabled={loading}
                placeholder="Read Latest News"
              />
            </div>

            <div>
              <Label for="cta_secondary_text_en"
                >Secondary CTA Text (English)</Label
              >
              <Input
                id="cta_secondary_text_en"
                name="cta_secondary_text_en"
                value={data.heroContent?.cta_secondary_text_en || ""}
                disabled={loading}
                placeholder="Explore Popular Games"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div class="mt-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label for="cta_primary_url">Primary CTA URL</Label>
              <Input
                id="cta_primary_url"
                name="cta_primary_url"
                value={data.heroContent?.cta_primary_url || ""}
                disabled={loading}
                placeholder="#berita"
              />
            </div>

            <div>
              <Label for="cta_secondary_url">Secondary CTA URL</Label>
              <Input
                id="cta_secondary_url"
                name="cta_secondary_url"
                value={data.heroContent?.cta_secondary_url || ""}
                disabled={loading}
                placeholder="#kategori"
              />
            </div>
          </div>

          <div>
            <Label for="stats">Stats (JSON format)</Label>
            <Textarea
              id="stats"
              name="stats"
              value={typeof data.heroContent?.stats === "string"
                ? data.heroContent.stats
                : JSON.stringify(data.heroContent?.stats || [], null, 2)}
              disabled={loading}
              rows={6}
              placeholder={`[{"value": "500+", "label_id": "Artikel Game", "label_en": "Game Articles"}]`}
            />
            <p class="text-xs text-muted-foreground mt-1">
              Format: Array of objects with value, label_id, and label_en
              properties
            </p>
          </div>

          <Button type="submit" disabled={loading} class="w-full sm:w-auto">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>
