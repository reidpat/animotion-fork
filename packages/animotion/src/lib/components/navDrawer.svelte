<!-- NavDrawer.svelte -->
<script lang="ts">
	import { slide } from 'svelte/transition'
	import { tweened } from 'svelte/motion'

	let isOpen = false
	let hovering = false
	let buttonHeight = 10 // Height of hover button in pixels

	// Control the drawer state
	$: isOpen = hovering

	// Handle mouse events
	function handleMouseEnter() {
		hovering = true
	}

	function handleMouseLeave() {
		hovering = false
	}
</script>

<div
	class="fixed top-0 left-0 z-30 w-full"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<!-- Hover trigger button -->
	<div
		class="bg-primary hover:bg-primary-focus h-[10px] w-full cursor-pointer transition-colors duration-200"
		class:rounded-b-lg={!isOpen}
	/>

	<!-- Drawer content -->
	{#if isOpen}
		<div class="bg-base-200 w-full shadow-lg" transition:slide={{ duration: 300 }}>
			<slot />
		</div>
	{/if}
</div>

<style>
	/* Optional: Add custom styles here if needed */
</style>
