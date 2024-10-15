import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import svelteInspector from './svelte-inspector';

export default defineConfig({
  plugins: [svelteInspector(),
  sveltekit(),
  tailwindcss(),
  ]
});