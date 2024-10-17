<script>
    import { onMount } from "svelte";

    export let slidePath;

    let SlideComponent = null;
    let error = null;

    export let id;


    async function loadSlide() {
        console.log(`Loading slide: ${slidePath}`);
        try {
            // console.log(`Loading slide: ${slidePath}`);
            // Force re-import by appending a timestamp
            const timestamp = Date.now();
            const module = await import(
                /* @vite-ignore */ `../data/slides/${slidePath}?t=${timestamp}`
            );
            SlideComponent = module.default;
            // console.log(`Slide loaded successfully: ${slidePath}`);
        } catch (e) {
            console.error(`Failed to load slide: ${slidePath}`, e);
            error = e;
        }
    }

    onMount(() => {
        loadSlide();
    });
</script>

{#if SlideComponent}
    <svelte:component this={SlideComponent} id={id} />
{/if}
