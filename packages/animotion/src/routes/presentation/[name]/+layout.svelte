<script lang="ts">
	import '../../../styles/app.css'

	let { children, data } = $props()
    import {page} from '$app/stores'
    
</script>

<svelte:head>
	<title>{$page.params.name}</title>
</svelte:head>

{@render children()}