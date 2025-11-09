<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Badge } from "$lib/components/ui/badge";
  import { Trash2, Plus, GripVertical, Menu } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import type { PageData, ActionData } from "./$types";

  interface MenuItem {
    href: string;
    label_id: string;
    label_en: string;
    order: number;
  }

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let menuItems: MenuItem[] = $state(
    data.navbarConfig?.menu_items ? [...data.navbarConfig.menu_items] : []
  );

  let isSubmitting = $state(false);

  // Add new menu item
  function addMenuItem() {
    const newOrder =
      menuItems.length > 0
        ? Math.max(...menuItems.map((item) => item.order)) + 1
        : 1;
    menuItems.push({
      href: "#new-section",
      label_id: "Menu Baru",
      label_en: "New Menu",
      order: newOrder,
    });
  }

  // Remove menu item
  function removeMenuItem(index: number) {
    menuItems.splice(index, 1);
    // Reorder items
    menuItems.forEach((item, idx) => {
      item.order = idx + 1;
    });
  }

  // Move item up
  function moveUp(index: number) {
    if (index > 0) {
      [menuItems[index], menuItems[index - 1]] = [
        menuItems[index - 1],
        menuItems[index],
      ];
      // Update order
      menuItems.forEach((item, idx) => {
        item.order = idx + 1;
      });
    }
  }

  // Move item down
  function moveDown(index: number) {
    if (index < menuItems.length - 1) {
      [menuItems[index], menuItems[index + 1]] = [
        menuItems[index + 1],
        menuItems[index],
      ];
      // Update order
      menuItems.forEach((item, idx) => {
        item.order = idx + 1;
      });
    }
  }

  // Show toast based on form result
  $effect(() => {
    if (form?.success) {
      toast.success(form.message || "Configuration updated successfully!");
    } else if (form?.message) {
      toast.error(form.message);
    }
  });
</script>

<svelte:head>
  <title>Navbar Configuration - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Navbar Configuration</h1>
      <p class="text-muted-foreground">
        Manage navigation menu items and their order
      </p>
    </div>
    <Badge variant="outline" class="gap-2">
      <Menu class="size-4" />
      Navigation Menu
    </Badge>
  </div>

  <Card>
    <CardHeader>
      <CardTitle>Menu Items</CardTitle>
      <p class="text-sm text-muted-foreground">
        Configure the navigation menu items that appear in the header
      </p>
    </CardHeader>
    <CardContent>
      <form
        method="POST"
        action="?/update"
        use:enhance={() => {
          isSubmitting = true;
          return async ({ update }) => {
            await update();
            isSubmitting = false;
          };
        }}
        class="space-y-6"
      >
        <input
          type="hidden"
          name="menu_items"
          value={JSON.stringify(menuItems)}
        />

        <div class="space-y-4">
          {#each menuItems as item, index}
            <div
              class="flex items-center gap-4 p-4 border rounded-lg bg-muted/50"
            >
              <div class="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  class="h-8 w-8 p-0"
                  onclick={() => moveUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  class="h-8 w-8 p-0"
                  onclick={() => moveDown(index)}
                  disabled={index === menuItems.length - 1}
                >
                  ↓
                </Button>
              </div>

              <GripVertical class="size-5 text-muted-foreground" />

              <div class="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label for="href-{index}">Link (href)</Label>
                  <Input
                    id="href-{index}"
                    bind:value={item.href}
                    placeholder="#section"
                    class="mt-1"
                  />
                </div>

                <div>
                  <Label for="label-id-{index}">Label (Indonesia)</Label>
                  <Input
                    id="label-id-{index}"
                    bind:value={item.label_id}
                    placeholder="Menu Indonesia"
                    class="mt-1"
                  />
                </div>

                <div>
                  <Label for="label-en-{index}">Label (English)</Label>
                  <Input
                    id="label-en-{index}"
                    bind:value={item.label_en}
                    placeholder="English Menu"
                    class="mt-1"
                  />
                </div>

                <div class="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onclick={() => removeMenuItem(index)}
                    class="w-full"
                  >
                    <Trash2 class="size-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          {/each}

          {#if menuItems.length === 0}
            <div class="text-center py-8 text-muted-foreground">
              <Menu class="size-12 mx-auto mb-4" />
              <p>No menu items configured. Add your first menu item below.</p>
            </div>
          {/if}
        </div>

        <div class="flex justify-between items-center pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onclick={addMenuItem}
            class="gap-2"
          >
            <Plus class="size-4" />
            Add Menu Item
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting || menuItems.length === 0}
            class="gap-2"
          >
            {#if isSubmitting}
              <div
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
              ></div>
            {/if}
            Save Configuration
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>

  <!-- Preview Section -->
  {#if menuItems.length > 0}
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <p class="text-sm text-muted-foreground">
          This is how your navigation menu will appear
        </p>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
          {#each menuItems.sort((a, b) => a.order - b.order) as item}
            <Badge
              variant="secondary"
              class="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {item.label_id}
            </Badge>
          {/each}
        </div>
      </CardContent>
    </Card>
  {/if}
</div>
