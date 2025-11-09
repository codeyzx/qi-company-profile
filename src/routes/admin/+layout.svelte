<script lang="ts">
  import DashboardSidebar from "$lib/components/admin/DashboardSidebar.svelte";
  import type { LayoutData } from "./$types";

  let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<div class="min-h-screen bg-background flex">
  <DashboardSidebar />

  <!-- Main content -->
  <div class="flex-1 md:ml-0">
    <main class="p-6 pt-16 md:pt-6">
      {@render children()}
    </main>
  </div>
</div>
