import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ base: "/unit-converter/", build: { sourcemap: false }, plugins: [react()] });
