<script>
	export let data
	let mapData

	import MapEditor from '$lib/components/MapEditor.svelte'
	import Presentation from '$lib/components/presentation.svelte'
	import Slide from '$lib/components/slide.svelte'
	import { onMount } from 'svelte'

	onMount(() => {
		console.log(data)
		mapData = data.presentation.slides
	})

	function saveMapData() {
		console.log(mapData);
		console.log('save')
	}
</script>

<Presentation>
	<Slide>
		<MapEditor bind:mapData {saveMapData} />
	</Slide>
</Presentation>
