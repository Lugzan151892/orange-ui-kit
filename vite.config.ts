import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		outDir: "dist",
		lib: {
			name: "orange-ui-kit",
			entry: path.resolve(__dirname, "src/index.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				compact: true,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
