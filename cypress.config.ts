import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // No special node event hooks needed for e2e; server is started externally via scripts
      return config;
    },
  },
});
