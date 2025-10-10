import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // No special node event hooks needed for e2e; server is started externally via scripts
      return config;
    },
  },
});
