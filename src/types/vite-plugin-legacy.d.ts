declare module "@vitejs/plugin-legacy" {
  import { Plugin } from "vite";
  type LegacyOptions = any;
  const legacyPlugin: (options?: LegacyOptions) => Plugin;
  export default legacyPlugin;
}
