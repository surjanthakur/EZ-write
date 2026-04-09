import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === "analyze" &&
      visualizer({
        filename: "dist/bundle-analysis.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("@tiptap") || id.includes("prosemirror")) {
            return "editor-vendor";
          }

          if (
            id.includes("react-markdown") ||
            id.includes("remark-gfm") ||
            id.includes("react-syntax-highlighter")
          ) {
            return "markdown-vendor";
          }

          if (id.includes("react-router-dom")) {
            return "router-vendor";
          }

          if (id.includes("react-hot-toast")) {
            return "toast-vendor";
          }

          if (id.includes("axios")) {
            return "network-vendor";
          }
        },
      },
    },
  },
}));
