import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	},
	vitePlugin: {
		// set to true for defaults or customize with object
		inspector: {
			toggleKeyCombo: 'control-shift',
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	},
	server: {
		HMR: { overlay: false }
	}
}

export default config
