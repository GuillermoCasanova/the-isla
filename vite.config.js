import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    strictPort: false,
    // iCloud / synced Documents folders often break native FS watchers; polling fixes missed HMR.
    watch: {
      usePolling: true,
      interval: 150,
    },
  },
  build: {
    sourcemap: true,
  },
});
