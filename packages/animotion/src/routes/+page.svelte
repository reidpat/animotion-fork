<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import { Presentation } from '$lib/index.js'
	import { onMount } from 'svelte'

	let slides = [];

	async function loadSlides() {
		try {
			const timestamp = Date.now()
			slides = [...slides]
		} catch (e) {
			console.error('Failed to load slide: test1.svelte', e)
		}
	}

	onMount(() => {
		loadSlides()
	})
</script>

<Presentation
	options={{ history: true, transition: 'slide', controls: true, progress: true, reload: true, disableLayout: false }}
>	
	{#each slides as slide}
		<DynamicSlide slidePath={slide} />
	{/each}
</Presentation>
