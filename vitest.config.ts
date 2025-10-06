import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./test/setup.ts', './vitest.setup.ts'],
		css: true,
		deps: {
          inline: ['next-auth'],
        },
	},
	resolve: {
		alias: { '@': path.resolve(__dirname, './src') },
	},
})