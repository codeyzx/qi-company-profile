<script lang="ts">
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import NewsArticles from "$lib/components/NewsArticles.svelte";
  import PopularGames from "$lib/components/PopularGames.svelte";
  import AboutUs from "$lib/components/AboutUs.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Navbar
  siteConfig={data.siteConfig || []}
  navbarConfig={data.navbarConfig || undefined}
/>
<Hero heroData={data.hero || undefined} />
<NewsArticles articles={data.articles || []} />
<PopularGames categories={data.categories || []} />
<AboutUs aboutData={data.about || undefined} />
<Contact contactData={data.contact || undefined} />
<Footer
  siteConfig={data.siteConfig || []}
  contactData={data.contact || undefined}
  categories={data.categories || []}
/>
