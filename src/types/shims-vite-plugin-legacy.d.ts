declare module "@vitejs/plugin-legacy" {
  import type { Plugin } from "vite";

  // Minimal option shape to satisfy TS without depending on package types
  interface LegacyOptions {
    targets?: string | string[];
    renderLegacyChunks?: boolean;
    modernPolyfills?: boolean | string[];
    additionalLegacyPolyfills?: string[];
    polyfills?: string[] | false;
    [key: string]: unknown;
  }

  export default function legacy(options?: LegacyOptions): Plugin;
}
