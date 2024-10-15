<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import { Presentation, Slide } from '$lib/index.js'
	import { onMount } from 'svelte'

	let slides = []

	export let data

	async function loadSlides() {
		slides = data.presentation.slides
		console.log(slides)
	}

	onMount(() => {
		console.log(data)
		loadSlides()
	})
</script>

{#if slides.length}
	<Presentation
		options={{ history: true, transition: 'slide', controls: true, progress: true, reload: true }}
	>
		{#each slides as group}
			<Slide>
				{#each group as slide}
					<DynamicSlide slidePath={slide.path} />
				{/each}
			</Slide>
		{/each}
	</Presentation>
{/if}
