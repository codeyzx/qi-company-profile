<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import { Gamepad2, Loader2, AlertCircle } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();

  let loading = $state(false);
  let isRegisterMode = $state(false);
</script>

<svelte:head>
  <title>Admin Login - Jelajah Game CMS</title>
</svelte:head>

<div
  class="min-h-screen flex items-center justify-center bg-gradient-to-br from-jgPurple/10 via-background to-jgYellow/10 p-4"
>
  <Card class="w-full max-w-md border-2 border-jgYellow/20 shadow-2xl">
    <CardHeader class="space-y-3 text-center">
      <div
        class="mx-auto bg-gradient-to-br from-jgYellow to-jgYellow/80 rounded-2xl w-16 h-16 flex items-center justify-center border-4 border-jgPurple shadow-lg"
      >
        <Gamepad2 class="size-8 text-jgPurple" />
      </div>
      <CardTitle class="text-3xl font-bold">
        <span
          class="bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text text-transparent"
        >
          Jelajah Game
        </span>
      </CardTitle>
      <CardDescription class="text-base">
        {isRegisterMode
          ? "Register Admin Account"
          : "Content Management System"}
      </CardDescription>
    </CardHeader>

    <form
      method="POST"
      action={isRegisterMode ? "?/register" : "?/login"}
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update();
          loading = false;
        };
      }}
    >
      <CardContent class="space-y-4">
        {#if form?.error}
          <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertDescription>
              {form.error}
            </AlertDescription>
          </Alert>
        {/if}

        {#if form?.success}
          <Alert class="border-jgYellow bg-jgYellow/10">
            <AlertDescription class="text-jgYellow font-semibold">
              {form.success}
            </AlertDescription>
          </Alert>
        {/if}

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@jelajahgame.com"
            required
            disabled={loading}
            class="border-2 focus-visible:border-jgYellow"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={loading}
            class="border-2 focus-visible:border-jgYellow"
          />
        </div>
      </CardContent>

      <CardFooter class="flex flex-col gap-4">
        <Button
          type="submit"
          class="w-full bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-bold py-6 text-lg shadow-lg"
          disabled={loading}
        >
          {#if loading}
            <Loader2 class="mr-2 h-5 w-5 animate-spin" />
            {isRegisterMode ? "Creating account..." : "Logging in..."}
          {:else}
            {isRegisterMode ? "Create Admin Account" : "Login to Dashboard"}
          {/if}
        </Button>

        <div class="text-center text-sm text-muted-foreground">
          <p>
            {isRegisterMode
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <button
            type="button"
            class="text-jgYellow hover:text-jgYellow/80 underline-offset-4 hover:underline font-medium"
            onclick={() => {
              isRegisterMode = !isRegisterMode;
            }}
          >
            {isRegisterMode ? "Login instead" : "Register as Admin"}
          </button>
        </div>
      </CardFooter>
    </form>
  </Card>
</div>

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
