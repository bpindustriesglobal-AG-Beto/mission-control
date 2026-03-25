/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRIDGE_URL: string;
  readonly VITE_BRIDGE_TOKEN: string;
  readonly VITE_PREVIEW_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
