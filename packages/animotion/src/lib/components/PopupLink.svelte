<script>
    import { onMount } from "svelte";
    // import DynamicComponentLoader from "$lib/components/DynamicLoader.svelte";
    import { scale } from "svelte/transition";
	import DynamicSlide from "./DynamicSlide.svelte"

    export let fileName;
    export let linkText;
    let showPopup = false;

    export let classlist = "";

    // This function is triggered when hovering over the link
    let popupStyle = "";

    function handleMouseEnter(event) {
        showPopup = true;
        const popupWidth = 500; // Adjust based on your popup's expected width
        const popupHeight = 500; // Adjust based on your popup's expected height
        const offsetX = popupWidth / 2;
        const offsetY = popupHeight / 2;

        // Calculate position to center the popup on the cursor
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        // Apply calculated position
        popupStyle = `left: ${x}px; top: ${y}px;`;
    }

    function handleMouseLeave() {
        showPopup = false;
    }
</script>

<span
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    class="link link-primary {classlist}"
>
{linkText}
    {#if showPopup}
    <div style={popupStyle} class="popup-box modal-box" transition:scale>
        <DynamicSlide slidePath={fileName} />
    </div>
    {/if}
</span>

<style>
    /* Add your styles here */
    span {
        cursor: pointer;
    }
    span::before{
        content: "📄";
    }

    .popup-box {
        cursor: auto;
        position: absolute;
        border-radius: 5px;
        width: 600px;
        height: 450px;
        z-index: 1000;
    }
</style>
