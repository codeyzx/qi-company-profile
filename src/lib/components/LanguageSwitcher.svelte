<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Globe } from "lucide-svelte";
  import { locale, setLocale, type Locale } from "$lib/i18n";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  let currentLocale = $state<Locale>("id");

  $effect(() => {
    currentLocale = $locale;
  });

  function switchLocale(newLocale: Locale) {
    setLocale(newLocale);
  }

  const languages = [
    { code: "id" as Locale, name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  ];

  let currentLanguage = $derived(
    languages.find((lang) => lang.code === currentLocale) || languages[0]
  );
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="ghost" size="icon" class="gap-2">
      <Globe class="size-5" />
      <span class="sr-only">Change language</span>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" class="w-48">
    <DropdownMenu.Label>Pilih Bahasa / Language</DropdownMenu.Label>
    <DropdownMenu.Separator />
    {#each languages as lang}
      <DropdownMenu.Item
        onclick={() => switchLocale(lang.code)}
        class={currentLocale === lang.code ? "bg-accent" : ""}
      >
        <span class="mr-2 text-lg">{lang.flag}</span>
        <span>{lang.name}</span>
        {#if currentLocale === lang.code}
          <span class="ml-auto text-jgYellow">✓</span>
        {/if}
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
