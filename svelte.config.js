import adapter from "svelte-adapter-azure-swa";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Using Azure Static Web Apps adapter for deployment
    adapter: adapter({
      // Ensure correct build structure for Azure SWA
      customStaticWebAppConfig: {
        platform: {
          apiRuntime: "node:20",
        },
        routes: [
          {
            route: "/upload-file",
            allowedRoles: ["authenticated"],
          },
        ],
      },
    }),
  },
};

export default config;
