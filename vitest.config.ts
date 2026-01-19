import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        mockReset: true,
        exclude: ["dist", "main.js"],
    },
    resolve: {
        alias: {
            obsidian: "/tests/mocks/obsidian.ts",
        },
    },
});
