import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "/",
  build: {
    outDir: 'dist/',
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        listings: resolve(__dirname, "./listings/index.html"),
        createPost: resolve(__dirname, "./listings/create/index.html"),
      },
      output: {
        dir: 'dist',
        format: 'es',
      },
    },
  },
});
