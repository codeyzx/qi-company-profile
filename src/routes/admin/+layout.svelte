<script lang="ts">
  import DashboardSidebar from "$lib/components/admin/DashboardSidebar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import type { LayoutData } from "./$types";

  let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<!-- Sidebar is fixed, so it's outside the flow -->
<DashboardSidebar />

<!-- Main content with margin to account for fixed sidebar -->
<div class="admin-main">
  <main class="admin-content">
    {@render children()}
  </main>
</div>

<style>
  .admin-main {
    min-height: 100vh;
    overflow-x: hidden;
  }

  .admin-content {
    padding: 1.5rem;
    padding-top: 4rem;
    min-height: 100vh;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .admin-main {
      margin-left: 16rem; /* Width of sidebar */
      /* Don't set width, let it be auto (100% - margin) */
    }
    
    .admin-content {
      padding-top: 1.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  /* Ensure proper layout on mobile */
  @media (max-width: 767px) {
    .admin-main {
      margin-left: 0;
    }
  }
</style>
<Toaster />
