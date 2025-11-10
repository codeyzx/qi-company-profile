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
  import { Badge } from "$lib/components/ui/badge";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import {
    Plus,
    Edit,
    Trash2,
    FileText,
    CheckCircle,
    AlertCircle,
    Image,
  } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showCreateDialog = $state(false);
  let editingAbout = $state<any>(null);
  let loading = $state(false);

  function resetForm() {
    showCreateDialog = false;
    editingAbout = null;
  }

  function startEdit(about: any) {
    editingAbout = { ...about };
    showCreateDialog = true;
  }
</script>

<svelte:head>
  <title>About Us - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">About Us Content</h1>
      <p class="text-muted-foreground">Manage your about us sections</p>
    </div>

    <Dialog bind:open={showCreateDialog} onOpenChange={resetForm}>
      <DialogTrigger>
        <Button
          class="bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold"
        >
          <Plus class="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingAbout ? "Edit About Section" : "Create New About Section"}
          </DialogTitle>
        </DialogHeader>

        <form
          method="POST"
          action={editingAbout ? "?/update" : "?/create"}
          use:enhance
        >
          {#if editingAbout}
            <input type="hidden" name="id" value={editingAbout.id} />
          {/if}

          <div class="space-y-6">
            <!-- Common Settings -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Settings</h3>

              <div>
                <Label for="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={editingAbout?.image_url || ""}
                  disabled={loading}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <!-- Indonesian Fields -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Indonesian Content</h3>
              <div>
                <Label for="main_title_id">Main Title (Indonesian)</Label>
                <Input
                  id="main_title_id"
                  name="main_title_id"
                  value={editingAbout?.main_title_id || ""}
                  required
                  disabled={loading}
                  placeholder="e.g., Siapa Kami ?"
                />
              </div>

              <div>
                <Label for="main_description_id">Main Description (Indonesian)</Label>
                <Textarea
                  id="main_description_id"
                  name="main_description_id"
                  value={editingAbout?.main_description_id || ""}
                  required
                  disabled={loading}
                  rows={3}
                  placeholder="Short description about your company"
                />
              </div>

              <div>
                <Label for="secondary_description_id">Secondary Description (Indonesian)</Label>
                <Textarea
                  id="secondary_description_id"
                  name="secondary_description_id"
                  value={editingAbout?.secondary_description_id || ""}
                  disabled={loading}
                  rows={4}
                  placeholder="Detailed description about your company"
                />
              </div>

              <div>
                <Label for="slogan_id">Slogan (Indonesian)</Label>
                <Input
                  id="slogan_id"
                  name="slogan_id"
                  value={editingAbout?.slogan_id || ""}
                  disabled={loading}
                  placeholder="e.g., Explore the Game Universe"
                />
              </div>
            </div>

            <!-- English Fields -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">English Content</h3>
              <div>
                <Label for="main_title_en">Main Title (English)</Label>
                <Input
                  id="main_title_en"
                  name="main_title_en"
                  value={editingAbout?.main_title_en || ""}
                  required
                  disabled={loading}
                  placeholder="e.g., Who Are We ?"
                />
              </div>

              <div>
                <Label for="main_description_en">Main Description (English)</Label>
                <Textarea
                  id="main_description_en"
                  name="main_description_en"
                  value={editingAbout?.main_description_en || ""}
                  required
                  disabled={loading}
                  rows={3}
                  placeholder="Short description about your company"
                />
              </div>

              <div>
                <Label for="secondary_description_en">Secondary Description (English)</Label>
                <Textarea
                  id="secondary_description_en"
                  name="secondary_description_en"
                  value={editingAbout?.secondary_description_en || ""}
                  disabled={loading}
                  rows={4}
                  placeholder="Detailed description about your company"
                />
              </div>

              <div>
                <Label for="slogan_en">Slogan (English)</Label>
                <Input
                  id="slogan_en"
                  name="slogan_en"
                  value={editingAbout?.slogan_en || ""}
                  disabled={loading}
                  placeholder="e.g., Explore the Game Universe"
                />
              </div>
            </div>

            <!-- Values (JSON) -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Values (JSON Format)</h3>
              <div>
                <Label for="values">Values JSON</Label>
                <Textarea
                  id="values"
                  name="values"
                  value={editingAbout?.values ? JSON.stringify(editingAbout.values, null, 2) : ""}
                  disabled={loading}
                  rows={10}
                  placeholder={`[
  {
    "icon": "Target",
    "title_id": "Fokus Kualitas",
    "title_en": "Quality Focus",
    "description_id": "Setiap konten kami dibuat dengan riset mendalam",
    "description_en": "Every content we create is made with deep research"
  }
]`}
                />
                <p class="text-xs text-muted-foreground mt-1">
                  Format: Array of objects with icon, title_id, title_en, description_id, description_en
                </p>
              </div>
            </div>

            <!-- Stats (JSON) -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Stats (JSON Format)</h3>
              <div>
                <Label for="stats">Stats JSON</Label>
                <Textarea
                  id="stats"
                  name="stats"
                  value={editingAbout?.stats ? JSON.stringify(editingAbout.stats, null, 2) : ""}
                  disabled={loading}
                  rows={8}
                  placeholder={`[
  {
    "value": "500+",
    "label_id": "Artikel Published",
    "label_en": "Articles Published",
    "color": "jgYellow"
  }
]`}
                />
                <p class="text-xs text-muted-foreground mt-1">
                  Format: Array of objects with value, label_id, label_en, color (jgYellow or jgPurple)
                </p>
              </div>
            </div>

            <div class="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onclick={resetForm}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                class="bg-jgYellow hover:bg-jgYellow/90 text-black"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingAbout
                    ? "Update Section"
                    : "Create Section"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
      <CardTitle class="flex items-center gap-2">
        <FileText class="size-5 text-jgYellow" />
        About Sections ({data.aboutContent.length})
      </CardTitle>
    </CardHeader>
    <CardContent>
      {#if data.aboutContent.length === 0}
        <div class="text-center py-12">
          <FileText class="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p class="mt-4 text-lg font-medium">No about sections yet</p>
          <p class="text-muted-foreground">
            Create your first about section to get started.
          </p>
        </div>
      {:else}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead>Content Preview</TableHead>
              <TableHead>Highlight</TableHead>

              <TableHead>Status</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each data.aboutContent as about}
              <TableRow>
                <TableCell>
                  <div class="flex items-center gap-2">
                    {#if about.image_url}
                      <Image class="h-5 w-5 text-jgYellow" />
                    {:else}
                      <FileText class="h-5 w-5 text-muted-foreground" />
                    {/if}
                    <div>
                      <p class="font-medium">{about.main_title_en}</p>
                      <p class="text-sm text-muted-foreground">
                        {about.main_title_id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p class="text-sm line-clamp-2 max-w-md">
                    {about.main_description_en?.substring(0, 100)}...
                  </p>
                </TableCell>
                <TableCell>
                  {#if about.slogan_en}
                    <Badge variant="outline">{about.slogan_en}</Badge>
                  {:else}
                    -
                  {/if}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={about.status === "published"
                      ? "default"
                      : "secondary"}
                  >
                    {about.status}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onclick={() => startEdit(about)}
                    >
                      <Edit class="h-4 w-4" />
                    </Button>
                    <form method="POST" action="?/delete" use:enhance>
                      <input type="hidden" name="id" value={about.id} />
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        class="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onclick={(e) => {
                          if (
                            !confirm(
                              "Are you sure you want to delete this about section?"
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Trash2 class="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      {/if}
    </CardContent>
  </Card>
</div>
