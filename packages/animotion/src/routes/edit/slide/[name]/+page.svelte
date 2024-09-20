<script>
	import { onMount } from 'svelte';
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import Presentation from '$lib/components/presentation.svelte'

	export let data
	let name
	$: name = data.name

	let selectedElement = null;
	let highlightElement = null;

	function handleMouseDown(event) {
		// Prevent default behavior and stop propagation
		event.preventDefault();
		event.stopPropagation();

		// Deselect the previously selected element
		if (selectedElement) {
			selectedElement.style.outline = 'none';
		}

		// Select the new element
		selectedElement = event.target;
		selectedElement.style.outline = '2px solid blue';

		// Log the selected element's details
		console.log('Selected element:', selectedElement);
		console.log('Element tag:', selectedElement.tagName);
		console.log('Element classes:', selectedElement.className);

		// Update the highlight element's position
		updateHighlight();
	}

	function handleMouseMove(event) {
		if (event.target !== selectedElement) {
			event.target.style.outline = '2px solid rgba(255, 0, 0, 0.5)';
			setTimeout(() => {
				event.target.style.outline = 'none';
			}, 500);
		}
	}

	function updateHighlight() {
		if (selectedElement && highlightElement) {
			const rect = selectedElement.getBoundingClientRect();
			highlightElement.style.top = `${rect.top}px`;
			highlightElement.style.left = `${rect.left}px`;
			highlightElement.style.width = `${rect.width}px`;
			highlightElement.style.height = `${rect.height}px`;
			highlightElement.style.display = 'block';
		} else if (highlightElement) {
			highlightElement.style.display = 'none';
		}
	}

	onMount(() => {
		console.log('Component mounted');
		const slidesElement = document.getElementsByClassName('slides')[0];

		if (slidesElement) {
			console.log('Slides element found, adding event listeners');
			slidesElement.addEventListener('mousedown', handleMouseDown, true);
			slidesElement.addEventListener('mousemove', handleMouseMove, true);

			// Create highlight element
			highlightElement = document.createElement('div');
			highlightElement.style.position = 'absolute';
			highlightElement.style.border = '2px solid blue';
			highlightElement.style.pointerEvents = 'none';
			highlightElement.style.display = 'none';
			document.body.appendChild(highlightElement);
		} else {
			console.log('Slides element not found');
		}

		return () => {
			if (slidesElement) {
				slidesElement.removeEventListener('mousedown', handleMouseDown, true);
				slidesElement.removeEventListener('mousemove', handleMouseMove, true);
			}
			if (highlightElement) {
				document.body.removeChild(highlightElement);
			}
		};
	});
</script>

<Presentation options={{ reload: true }}>
	<DynamicSlide slidePath={name} />
</Presentation>

<style>
	:global(.slides * ) {
		transition: outline 0.3s ease-in-out;
	}
</style>