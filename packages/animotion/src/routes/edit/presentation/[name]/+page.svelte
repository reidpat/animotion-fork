<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'

	export let data
	let mapData

	import Editor from '$lib/components/editor.svelte'
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
	})

	async function saveMapData() {
		console.log(mapData)
		let copy = mapData;
		mapData = null;
		presentation.slides.sync();
		setTimeout(()=>{mapData = copy;}, 50)
		setTimeout(()=>{ presentation.slides.sync()}, 0)	
		setTimeout(()=>{ presentation.slides.sync()}, 1000)		
		console.log('save')
	}
</script>

<div class="absolute top-0 left-0 z-20">
	<MapEditor bind:mapData {saveMapData} />
</div>
<Editor>
	{#if mapData?.length}
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
