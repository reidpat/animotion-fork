import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()]
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deck: any; // Adjust the type as needed
  }