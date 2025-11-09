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
    Settings,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff,
  } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";
  import type { Database } from "$lib/database.types";

  type SiteConfig = Database["public"]["Tables"]["site_config"]["Row"];

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showCreateDialog = $state(false);
  let editingConfig = $state<SiteConfig | null>(null);
  let loading = $state(false);

  // Group configs by category (derived from key prefix)
  const groupedConfigs = $derived(() => {
    const groups: Record<string, SiteConfig[]> = {};

    data.siteConfig.forEach((config) => {
      const category = config.key.split("_")[0] || "general";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(config);
    });

    return groups;
  });

  // Helper functions
  function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      site: "Site Settings",
      company: "Company Info",
      contact: "Contact Info",
      social: "Social Media",
      seo: "SEO Settings",
      general: "General",
    };
    return (
      labels[category] || category.charAt(0).toUpperCase() + category.slice(1)
    );
  }

  function getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      text: "Text",
      email: "Email",
      url: "URL",
      number: "Number",
      boolean: "Boolean",
      color: "Color",
      textarea: "Long Text",
    };
    return labels[type] || "Text";
  }

  function resetForm() {
    showCreateDialog = false;
    editingConfig = null;
  }

  function startEdit(config: SiteConfig) {
    editingConfig = { ...config };
    showCreateDialog = true;
  }
</script>

<svelte:head>
  <title>Site Configuration - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Site Configuration</h1>
      <p class="text-muted-foreground">
        Manage your site settings and configurations
      </p>
    </div>

    <Dialog bind:open={showCreateDialog} onOpenChange={resetForm}>
      <DialogTrigger>
        <Button
          class="bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold"
        >
          <Plus class="mr-2 h-4 w-4" />
          Add Config
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingConfig ? "Edit Configuration" : "Create New Configuration"}
          </DialogTitle>
        </DialogHeader>

        <form
          method="POST"
          action={editingConfig ? "?/update" : "?/create"}
          use:enhance
        >
          {#if editingConfig}
            <input type="hidden" name="id" value={editingConfig.id} />
          {/if}

          <div class="space-y-6">
            <!-- Basic Information -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Basic Information</h3>
              <div>
                <Label for="config_key">Configuration Key</Label>
                <Input
                  id="config_key"
                  name="config_key"
                  value={editingConfig?.key || ""}
                  required
                  disabled={loading}
                  placeholder="e.g., site_title, company_email"
                />
              </div>

              <div>
                <Label for="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editingConfig?.description || ""}
                  disabled={loading}
                  rows={2}
                  placeholder="What does this configuration control?"
                />
              </div>
            </div>

            <!-- Configuration Value -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Value</h3>
              <div>
                <Label for="config_value">Configuration Value</Label>
                <Input
                  id="config_value"
                  name="config_value"
                  value={editingConfig?.value_en ||
                    editingConfig?.value_id ||
                    ""}
                  disabled={loading}
                  placeholder="Enter configuration value"
                />
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
                  : editingConfig
                    ? "Update Config"
                    : "Create Config"}
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

  {#if data.siteConfig.length === 0}
    <Card>
      <CardContent class="py-12">
        <div class="text-center">
          <Settings class="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p class="mt-4 text-lg font-medium">No configurations yet</p>
          <p class="text-muted-foreground">
            Create your first site configuration to get started.
          </p>
        </div>
      </CardContent>
    </Card>
  {:else}
    {#each Object.entries(groupedConfigs()) as [category, configs]}
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Settings class="size-5 text-jgYellow" />
            {getCategoryLabel(category)} ({configs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Configuration</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each configs as config}
                <TableRow>
                  <TableCell>
                    <div>
                      <p class="font-medium">{config.key}</p>
                      {#if config.description}
                        <p class="text-sm text-muted-foreground">
                          {config.description}
                        </p>
                      {/if}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="max-w-xs truncate">
                      {config.value_en || config.value_id || "No value"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Text</Badge>
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center gap-1">
                      {#if config.status === "published"}
                        <Eye class="h-4 w-4 text-green-600" />
                        <span class="text-sm text-green-600">Published</span>
                      {:else}
                        <EyeOff class="h-4 w-4 text-muted-foreground" />
                        <span class="text-sm text-muted-foreground">Draft</span>
                      {/if}
                    </div>
                  </TableCell>
                  <TableCell class="text-right">
                    <div class="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onclick={() => startEdit(config)}
                      >
                        <Edit class="h-4 w-4" />
                      </Button>
                      <form method="POST" action="?/delete" use:enhance>
                        <input type="hidden" name="id" value={config.id} />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          class="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onclick={(e) => {
                            if (
                              !confirm(
                                "Are you sure you want to delete this configuration?"
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
        </CardContent>
      </Card>
    {/each}
  {/if}
</div>
