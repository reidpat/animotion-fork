<script>
    import { onMount } from 'svelte';
    import DynamicSlide from '$lib/components/DynamicSlide.svelte'
    import Presentation from '$lib/components/presentation.svelte'

    export let data;
    let name;
    $: name = data.name;

    
</script>

<Presentation options={{ reload: true }}>
    <DynamicSlide slidePath={name} />
</Presentation>

<style>
</style>
