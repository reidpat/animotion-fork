<script>
	import Presentation from '$lib/components/Presentation.svelte'
	import Slide from '$lib/components/Slide.svelte'
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import { invalidateAll } from '$app/navigation'
	import Test1 from '$lib/slides/Test1.svelte'
	import { onMount } from 'svelte'
	import { deckStore } from '$lib/store/deck.svelte.js'

	let deck = $state()
	deckStore.subscribe((value) => {
		deck = value
		console.log(deck)
	})
	let { data } = $props()
	let slides = $state([])
	let isLoading = $state(true)
	let error = $state(null)
	let updateCounter = $state(0)

	let presentationComponent

	let i = $state(0)

	$effect(() => {
		// console.log('Effect triggered, loading slides')

		loadSlides(data?.presentation)
	})

	onMount(() => {
		console.log(Presentation)
	})

	function loadSlides(presentationData) {
		isLoading = true
		error = null
		try {
			// console.log('Loading slides from presentation data')
			if (!presentationData?.slides) {
				slides = []
				console.log('No slides found in presentation data')
			} else {
				slides = presentationData.slides
				// console.log(`Loaded ${slides.length} slide groups`)
			}
		} catch (e) {
			console.error('Error loading slides:', e)
			error = e
		} finally {
			isLoading = false
		}
	}

	function ready() {
		console.log('Presentation ready')
	}

	import { tick } from 'svelte'
	// Additional HMR handling for the main component
	// if (import.meta.hot) {
	// 	import.meta.hot.on('vite:afterUpdate', () => {
	// 		// location.reload();
	// 		console.log('Before update')
	// 		// loadSlides(data?.presentation);
	// 		unique = {};
	// 		deck.sync();
	// 		// presentationRef.init();

	// 		// slides = slides;
	// 		// let currentSlide = deck.getCurrentSlide()
	// 		// console.log(currentSlide)
	// 		// deck.syncSlide(currentSlide)
	// 		// deck.layout();

	// 		// presentationRef.init();

	// 		// presentationRef.init();
	// 		// invalidateAll();
	// 	})
	// }

	let unique = $state({})

	let presentationRef = $state()
</script>

{#if error}
	<p>An error occurred: {error.message}</p>
{:else if isLoading}
	<p>Loading presentation...</p>
{:else if slides.length}
	{#key unique}
	<Presentation
		options={{ hash: true, transition: 'slide', reload: true }}
		bind:this={presentationRef}
	>
		{#each slides as group, groupIndex}
			<Slide>
				{#each group as slide, slideIndex}
					<DynamicSlide slidePath={slide.path}  />
				{/each}
			</Slide>
		{/each}
	</Presentation>
	{/key}
{:else}
	<p>No slides available</p>
{/if}
