<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import Presentation from '$lib/components/presentation.svelte'
	import Test1 from '$lib/data/slides/Test1.svelte'
	import { onMount } from 'svelte'

	export let data

	onMount(() => {
		console.log(data)
	})
</script>

{#if data?.presentations}
<div class="p-16 prose">
	<h1>Presentations</h1>
	{#each data.presentations as presentation}
		<div>
			<a class="btn btn-primary" href="presentation/{presentation}">{presentation}</a>
			<a class="btn btn-primary btn-outline" href="edit/presentation/{presentation}">edit</a>
		</div>{/each}
	<button class="btn btn-primary mt-10">New Presentation</button>
</div>
{/if}
