	<script>
		import DynamicSlide from '$lib/components/DynamicSlide.svelte'
		import { Presentation } from '$lib/index.js'
		import Test1 from '$lib/slides/Test1.svelte'
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


	<Test1 />

	<!-- <Presentation
		options={{ history: true, transition: 'slide', controls: true, progress: true, reload: true, disableLayout: false }}
	>	
		{#each slides as slide}
			<DynamicSlide slidePath={slide} />
		{/each}
	</Presentation> -->
