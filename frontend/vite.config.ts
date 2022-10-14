import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
export default defineConfig({
	server: {
		host: true,
		hmr: {
			port: 8080,
		},
	},
	build: {
		outDir: 'build',
	},
	plugins: [
		react(),
		ViteAliases({
			prefix: '@',
			createLog: true,
			deep: true,
			logPath: 'src/logs',
			useConfig: true,
			useTypescript: true,
		}),
	],
})
