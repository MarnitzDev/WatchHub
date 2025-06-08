import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        build: {
            outDir: "dist",
            sourcemap: true,
        },
        base: "/",
        server: {
            host: env.VITE_SERVER_HOST || "0.0.0.0",
            port: parseInt(env.VITE_SERVER_PORT || "5173"),
            strictPort: true,
            hmr: {
                clientPort: 443,
            },
        },
        preview: {
            host: "0.0.0.0",
            port: 5173,
            strictPort: true,
        },
    };
});
