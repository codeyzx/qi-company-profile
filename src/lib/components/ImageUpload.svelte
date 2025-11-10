<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import { Upload, X, Loader2, Image as ImageIcon } from "lucide-svelte";

  let {
    value = $bindable(""),
    bucket = "article-images",
    folder = "",
    onUpload,
    onDelete,
    disabled = false,
  }: {
    value?: string;
    bucket?: "article-images" | "game-thumbnails" | "site-assets";
    folder?: string;
    onUpload?: (url: string) => void;
    onDelete?: () => void;
    disabled?: boolean;
  } = $props();

  let uploading = $state(false);
  let fileInput: HTMLInputElement;
  let error = $state("");

  async function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    error = "";
    uploading = true;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("folder", folder);

      const response = await fetch("/upload-file", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        value = result.url;
        onUpload?.(result.url);
      } else {
        error = result.error || "Upload failed";
      }
    } catch (err) {
      error = "Upload failed. Please try again.";
      console.error("Upload error:", err);
    } finally {
      uploading = false;
    }
  }

  async function handleDelete() {
    if (!value) return;

    try {
      const response = await fetch("/upload-file", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value, bucket }),
      });

      const result = await response.json();

      if (result.success) {
        value = "";
        onDelete?.();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }
</script>

<div class="space-y-2">
  {#if value}
    <Card class="relative overflow-hidden group">
      <img src={value} alt="Uploaded" class="w-full h-48 object-cover" />
      <div
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
      >
        <Button
          size="sm"
          variant="destructive"
          onclick={handleDelete}
          {disabled}
        >
          <X class="size-4 mr-1" />
          Remove
        </Button>
      </div>
    </Card>
  {:else}
    <button
      type="button"
      onclick={() => fileInput.click()}
      disabled={disabled || uploading}
      class="w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-jgYellow/50 transition-colors flex flex-col items-center justify-center gap-2 hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {#if uploading}
        <Loader2 class="size-8 text-jgYellow animate-spin" />
        <p class="text-sm text-muted-foreground">Uploading...</p>
      {:else}
        <Upload class="size-8 text-muted-foreground" />
        <p class="text-sm text-muted-foreground">Click to upload image</p>
        <p class="text-xs text-muted-foreground">
          PNG, JPG, WebP or GIF (max 5MB)
        </p>
      {/if}
    </button>
  {/if}

  {#if error}
    <p class="text-sm text-red-500">{error}</p>
  {/if}

  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    onchange={handleFileSelect}
    class="hidden"
    disabled={disabled || uploading}
  />
</div>
