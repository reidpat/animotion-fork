<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import Presentation from '$lib/components/presentation.svelte'
	import 'reveal.js/dist/reveal.css'

	if (import.meta.hot) {
		import.meta.hot.on('vite:beforeUpdate', () => {
			// location.reload();
			console.log('Before update')
			// deck.sync()
			// location.reload()
		})
	}
</script>

<div
	class="reveal"
>
	<div class="">
		<DynamicSlide slidePath={'test1.svelte'} />
	</div>
	<div class="backgrounds">
		<div class="slide-background-content"></div>
		<div
			class="slide-background present h-full place-content-center place-items-center"
			data-loaded="true"
			style="display: block;"
		>
			<div class="slide-background-content"></div>
		</div>
	</div>
</div>
