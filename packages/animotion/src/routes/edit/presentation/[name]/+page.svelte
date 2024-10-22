<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'

	export let data
	let mapData

	import Editor from '$lib/components/editor.svelte'
	import NavDrawer from '$lib/components/navDrawer.svelte'
	import MapEditor from '$lib/components/MapEditor.svelte'
	import Presentation from '$lib/components/presentation.svelte'
	import { getPresentation } from '$lib/store/deck.svelte.js'
	import Slide from '$lib/components/slide.svelte'
	import { onMount } from 'svelte'

	let presentation

	onMount(() => {
		console.log(data)
		mapData = data.presentation.slides
		presentation = getPresentation()
		setTimeout(() => {
			presentation.slides.sync()
		}, 500)
	})

	async function saveMapData() {
		console.log(mapData)
		console.log(data.name)
		// let copy = mapData;
		// mapData = null;
		presentation.slides.sync()
		// setTimeout(()=>{mapData = copy;}, 50)
		setTimeout(() => {
			presentation.slides.sync()
		}, 100)
		setTimeout(() => {
			presentation.slides.sync()
		}, 1000)

		let pres = data.presentation
		pres.slides = mapData
		try {
			const response = await fetch(`/edit/presentation/${data.name}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(pres)
			})

			if (!response.ok) {
				throw new Error('Failed to save map data')
			}
		} catch (error) {
			console.error(error)
		}
		console.log('save')
	}

	function navigateToIndex(x, y) {
		presentation.slides.slide(x, y)
		// console.log(x,y);
	}

	let showPresentationMap = false
</script>

<Editor>
	{#if mapData?.length}
		<NavDrawer>
			<div class="absolute top-0 left-0 z-20 bg-base-200">
				<MapEditor bind:mapData {saveMapData} bind:navigateToIndex />
			</div>
		</NavDrawer>
		<Presentation
			options={{
				history: true,
				transition: 'slide',
				controls: true,
				progress: true,
				reload: true,
				disableLayout: false
			}}
		>
			{#each mapData as group, groupIndex (groupIndex)}
				<Slide>
					{#each group as slide, slideIndex (slide.path + '-' + slideIndex)}
						<DynamicSlide slidePath={slide.path} />
					{/each}
				</Slide>
			{/each}
		</Presentation>
	{/if}
</Editor>
