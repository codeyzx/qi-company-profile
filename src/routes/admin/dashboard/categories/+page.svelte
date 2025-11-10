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
    Layers,
    CheckCircle,
    AlertCircle,
    Loader2,
  } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll } from "$app/navigation";
  import { toast } from "svelte-sonner";
  import type { PageData, ActionData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showCreateDialog = $state(false);
  let editingCategory = $state<any>(null);
  let isSubmitting = $state(false);
  let formElement = $state<HTMLFormElement>();

  // Watch for form success/error and handle accordingly
  $effect(() => {
    if (form?.success) {
      resetForm();
      isSubmitting = false;
      toast.success(form.message || "Category saved successfully!");
    } else if (form?.error) {
      isSubmitting = false;
      toast.error(form.error || "An error occurred. Please try again.");
    }
  });

  function resetForm() {
    showCreateDialog = false;
    editingCategory = null;
    if (formElement) {
      formElement.reset();
    }
  }

  function startEdit(category: any) {
    editingCategory = { ...category };
    showCreateDialog = true;
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open && !isSubmitting) {
      resetForm();
    }
  }

  // Handle keyboard shortcuts
  function handleKeydown(event: KeyboardEvent) {
    // Escape to close dialog
    if (event.key === "Escape" && showCreateDialog && !isSubmitting) {
      resetForm();
      event.preventDefault();
    }
    // Ctrl+S or Cmd+S to save form
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "s" &&
      showCreateDialog
    ) {
      event.preventDefault();
      if (formElement && !isSubmitting) {
        formElement.requestSubmit();
      }
    }
  }

  function handleFormSubmit() {
    return async ({ formElement, formData, action, cancel }: any) => {
      // Basic client-side validation
      const titleId = formData.get("title_id")?.toString().trim();
      const titleEn = formData.get("title_en")?.toString().trim();
      const descriptionId = formData.get("description_id")?.toString().trim();
      const descriptionEn = formData.get("description_en")?.toString().trim();

      if (!titleId || !titleEn || !descriptionId || !descriptionEn) {
        toast.error("Title and description are required in both languages");
        cancel();
        return;
      }

      isSubmitting = true;

      return async ({ result, update }: any) => {
        if (result.type === "success") {
          await invalidateAll();
          await update({ reset: false });
        } else {
          await update();
        }
        isSubmitting = false;
      };
    };
  }
</script>

<svelte:head>
  <title>Categories - Admin Dashboard</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Game Categories</h1>
      <p class="text-muted-foreground">Manage your game categories</p>
    </div>

    <Dialog bind:open={showCreateDialog} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger>
        <Button
          class="bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold"
          disabled={isSubmitting}
        >
          <Plus class="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Edit Category" : "Create New Category"}
          </DialogTitle>
        </DialogHeader>

        <form
          bind:this={formElement}
          method="POST"
          action={editingCategory ? "?/update" : "?/create"}
          use:enhance={handleFormSubmit()}
        >
          {#if editingCategory}
            <input type="hidden" name="id" value={editingCategory.id} />
          {/if}

          <div class="space-y-6">
            <!-- Indonesian Fields -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Indonesian Content</h3>
              <div>
                <Label for="title_id">Title (Indonesian)</Label>
                <Input
                  id="title_id"
                  name="title_id"
                  value={editingCategory?.title_id || ""}
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., Game Aksi"
                />
              </div>

              <div>
                <Label for="description_id">Description (Indonesian)</Label>
                <Textarea
                  id="description_id"
                  name="description_id"
                  value={editingCategory?.description_id || ""}
                  required
                  disabled={isSubmitting}
                  rows={3}
                  placeholder="Describe the category in Indonesian"
                />
              </div>

              <div>
                <Label for="badge_id">Badge Text (Indonesian)</Label>
                <Input
                  id="badge_id"
                  name="badge_id"
                  value={editingCategory?.badge_id || ""}
                  disabled={isSubmitting}
                  placeholder="e.g., Populer"
                />
              </div>

              <div>
                <Label for="count_text_id">Count Text (Indonesian)</Label>
                <Input
                  id="count_text_id"
                  name="count_text_id"
                  value={editingCategory?.count_text_id || ""}
                  disabled={isSubmitting}
                  placeholder="e.g., Game Tersedia"
                />
              </div>
            </div>

            <!-- English Fields -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">English Content</h3>
              <div>
                <Label for="title_en">Title (English)</Label>
                <Input
                  id="title_en"
                  name="title_en"
                  value={editingCategory?.title_en || ""}
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., Action Games"
                />
              </div>

              <div>
                <Label for="description_en">Description (English)</Label>
                <Textarea
                  id="description_en"
                  name="description_en"
                  value={editingCategory?.description_en || ""}
                  required
                  disabled={isSubmitting}
                  rows={3}
                  placeholder="Describe the category in English"
                />
              </div>

              <div>
                <Label for="badge_en">Badge Text (English)</Label>
                <Input
                  id="badge_en"
                  name="badge_en"
                  value={editingCategory?.badge_en || ""}
                  disabled={isSubmitting}
                  placeholder="e.g., Popular"
                />
              </div>

              <div>
                <Label for="count_text_en">Count Text (English)</Label>
                <Input
                  id="count_text_en"
                  name="count_text_en"
                  value={editingCategory?.count_text_en || ""}
                  disabled={isSubmitting}
                  placeholder="e.g., Games Available"
                />
              </div>
            </div>

            <!-- Common Fields -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Settings</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label for="icon">Icon (Lucide name)</Label>
                  <Input
                    id="icon"
                    name="icon"
                    value={editingCategory?.icon || ""}
                    disabled={isSubmitting}
                    placeholder="e.g., Zap, Gamepad2, Trophy"
                  />
                </div>

                <div>
                  <Label for="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    name="sort_order"
                    type="number"
                    value={editingCategory?.sort_order || 0}
                    disabled={isSubmitting}
                    min="0"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label for="gradient_from">Gradient From</Label>
                  <Input
                    id="gradient_from"
                    name="gradient_from"
                    type="color"
                    value={editingCategory?.gradient_from || "#F5CB3B"}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label for="gradient_to">Gradient To</Label>
                  <Input
                    id="gradient_to"
                    name="gradient_to"
                    type="color"
                    value={editingCategory?.gradient_to || "#322F81"}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onclick={resetForm}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                class="bg-jgYellow hover:bg-jgYellow/90 text-black"
                disabled={isSubmitting}
              >
                {#if isSubmitting}
                  <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                {:else if editingCategory}
                  <Edit class="mr-2 h-4 w-4" />
                  Update Category
                {:else}
                  <Plus class="mr-2 h-4 w-4" />
                  Create Category
                {/if}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>

  <!-- Alerts are now handled by toast notifications -->

  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Layers class="size-5 text-jgYellow" />
        Categories ({data.categories.length})
      </CardTitle>
    </CardHeader>
    <CardContent>
      {#if data.categories.length === 0}
        <div class="text-center py-12">
          <Layers class="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p class="mt-4 text-lg font-medium">No categories yet</p>
          <p class="text-muted-foreground">
            Create your first game category to get started.
          </p>
        </div>
      {:else}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each data.categories as category}
              <TableRow>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style="background: linear-gradient(135deg, {category.gradient_from}, {category.gradient_to})"
                    >
                      {category.icon ? category.icon.slice(0, 2) : "🎮"}
                    </div>
                    <div>
                      <p class="font-medium">{category.title_en}</p>
                      <p class="text-sm text-muted-foreground">
                        {category.title_id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p class="text-sm">{category.description_en}</p>
                </TableCell>
                <TableCell>
                  {#if category.badge_en}
                    <Badge variant="secondary">{category.badge_en}</Badge>
                  {:else}
                    -
                  {/if}
                </TableCell>
                <TableCell>{category.sort_order}</TableCell>
                <TableCell>
                  <Badge
                    variant={category.status === "published"
                      ? "default"
                      : "secondary"}
                  >
                    {category.status}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onclick={() => startEdit(category)}
                    >
                      <Edit class="h-4 w-4" />
                    </Button>
                    <form method="POST" action="?/delete" use:enhance>
                      <input type="hidden" name="id" value={category.id} />
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        class="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onclick={(e) => {
                          if (
                            !confirm(
                              "Are you sure you want to delete this category?"
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
