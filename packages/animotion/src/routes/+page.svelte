<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import Presentation from '$lib/components/presentation.svelte'
	import Test1 from '$lib/data/slides/Test1.svelte'
	import { onMount } from 'svelte'

	export let data

	onMount(() => {
		console.log(data)
	})

	let presentationName

	async function newPresentation() {
		try {
			let response = await fetch(`/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: presentationName })
			})
			if (!response.ok) {
				throw new Error('Failed to save map data')
			}
		} catch (error) {
			console.error(error)
		}
		window.location.reload();
	}
</script>

{#if data?.presentations}
	<div class="prose p-16">
		<h1>Presentations</h1>
		{#each data.presentations as presentation}
			<div>
				<a class="btn btn-primary" href="presentation/{presentation}">{presentation}</a>
				<a class="btn btn-primary btn-outline" href="edit/presentation/{presentation}">edit</a>
			</div>{/each}

		<div>
			<input
				class="input input-bordered"
				type="text"
				bind:value={presentationName}
				placeholder="name"
			/>
			<button class="btn btn-primary mt-10" on:click={newPresentation}>New Presentation</button>
		</div>
	</div>
{/if}
