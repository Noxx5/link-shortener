import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.int.test.ts"],
    setupFiles: ["src/test/db-setup.ts"],
    fileParallelism: false,
    isolate: false,
  },
});
