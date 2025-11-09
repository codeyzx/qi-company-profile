<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
  import { Loader2, CheckCircle, AlertCircle } from "lucide-svelte";
  import { enhance } from "$app/forms";

  interface FormCardProps {
    title: string;
    description?: string;
    action?: string;
    form?: any;
    loading?: boolean;
    multiLanguage?: boolean;
    children: any;
  }

  let {
    title,
    description,
    action = "?/update",
    form,
    loading = $bindable(false),
    multiLanguage = false,
    children,
  }: FormCardProps = $props();
</script>

<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    {#if description}
      <p class="text-sm text-muted-foreground">{description}</p>
    {/if}
  </CardHeader>
  <CardContent>
    {#if form?.success}
      <Alert class="mb-4 border-green-500 bg-green-50">
        <CheckCircle class="h-4 w-4 text-green-600" />
        <AlertDescription class="text-green-800">
          {form.message || "Changes saved successfully!"}
        </AlertDescription>
      </Alert>
    {/if}

    {#if form?.error}
      <Alert class="mb-4 border-red-500 bg-red-50">
        <AlertCircle class="h-4 w-4 text-red-600" />
        <AlertDescription class="text-red-800">
          {form.error}
        </AlertDescription>
      </Alert>
    {/if}

    <form
      method="POST"
      {action}
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update();
          loading = false;
        };
      }}
    >
      {#if multiLanguage}
        <Tabs value="indonesian" class="w-full">
          <TabsList class="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="indonesian">Indonesian</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
          </TabsList>

          <TabsContent value="indonesian" class="space-y-4">
            {@render children("id", loading)}
          </TabsContent>

          <TabsContent value="english" class="space-y-4">
            {@render children("en", loading)}
          </TabsContent>

          <div class="mt-6">
            {@render children("common", loading)}
          </div>
        </Tabs>
      {:else}
        <div class="space-y-4">
          {@render children("", loading)}
        </div>
      {/if}

      <div class="flex justify-end pt-4">
        <Button type="submit" disabled={loading} class="min-w-32">
          {#if loading}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Saving...
          {:else}
            Save Changes
          {/if}
        </Button>
      </div>
    </form>
  </CardContent>
</Card>
