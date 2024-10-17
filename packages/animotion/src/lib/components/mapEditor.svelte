<script>
    import { createEventDispatcher, onMount } from "svelte";
    import FrameSearchCreate from "$lib/components/FrameSearchCreate.svelte";
	import DynamicSlide from "./DynamicSlide.svelte"
	import PopupLink from "./PopupLink.svelte"
    import { getPresentation } from "$lib/store/deck.svelte.js";

    let { saveMapData, mapData = $bindable() } = $props();
    let presentation = $state();

    onMount(() => {
        console.log(mapData);
        presentation = getPresentation();
    });

    function handleColumnChange(column, index) {}
    function handleItemChange(item, index) {}

    function handleColumnAdd(index, item) {
        console.log("handleColumnAdd ", index, item);
        mapData.splice(index, 0, [{ ...item }]);
        mapData = [...mapData];
        saveMapData();
    }

    function handleRowAdd(columnIndex, index, item) {
        console.log("handleRowAdd ", columnIndex, index, item);
        mapData[columnIndex].splice(index, 0, { ...item });
        mapData = [...mapData];
        saveMapData();
    }

    let show = $state(false);
    let dir = $state(""); // Direction of the new item
    let currX = $state();
    let currY = $state();

    let draggedItem = null;

    function handleDragStart(e, x, y) {
        // Store the dragged item's initial position
        draggedItem = { x, y };
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDrop(e, x, y) {
        e.preventDefault();
        if (draggedItem) {
            const item = mapData[draggedItem.x][draggedItem.y];
            mapData[draggedItem.x].splice(draggedItem.y, 1); // Remove from old position
            mapData[x].splice(y, 0, item); // Insert at new position
            mapData = mapData.map((col) => [...col]); // Trigger reactivity
            saveMapData();
            draggedItem = null;
            presentation.slides.sync();
        }
    }

    function openModal(_dir, x, y) {
        show = true;
        dir = _dir;
        currX = x;
        currY = y;
    }

    function handleAdd(item) {
        console.log("handleAdd ", item);
        if (dir === "column") {
            handleColumnAdd(currX, item);
        } else if (dir === "row") {
            handleRowAdd(currX, currY, item);
        }
    }
    let vsCodePath = $state(`C:/Coding/frames`);

    function handleContextMenu(e, x, y) {
        e.preventDefault(); // Stop the browser's context menu from opening
        console.log("handleContextMenu", x, y)
        contextMenuVisible = true;
        contextMenuX = e.clientX;
        contextMenuY = e.clientY;
        contextMenuIndex = { x, y }; // Store indices of the item to be potentially deleted
    }

    function deleteItem() {
        if (contextMenuIndex.x !== -1 && contextMenuIndex.y !== -1) {
            mapData[contextMenuIndex.x].splice(contextMenuIndex.y, 1); // Remove the item
            mapData = mapData.map((col) => [...col]); // Trigger reactivity
            saveMapData();
        }
        contextMenuVisible = false; // Hide the context menu
    }

    function closeModal() {
        contextMenuVisible = false;
    }

    let contextMenuVisible = $state(false);
    let contextMenuX = $state(0);
    let contextMenuY = $state(0);
    let contextMenuIndex = $state({ x: -1, y: -1 });
</script>

<input
    class="input input-primary top-0 left-0"
    type="text"
    placeholder="Vs Code Project Filepath"
    bind:value={vsCodePath}
/>
<div class="flex m-10">
    {#if mapData}
        {#each mapData as column, x}
            <div class="flex flex-col">
                {#each column as item, y}
                    <div
                        class="btn btn-primary"
                        draggable="true"
                        on:dragstart={(e) => handleDragStart(e, x, y)}
                        on:dragover={(e) => e.preventDefault()}
                        on:drop={(e) => handleDrop(e, x, y)}
                        on:contextmenu={(e) => handleContextMenu(e, x, y)}
                        on:hover={(e)=>handleHover(e)}
                    >
                        
                        <a
                            href="vscode://file/{vsCodePath}\src\lib\frames\{item.path}.svelte"
                            >{item.path}</a
                        >
                        <!-- <PopupLink linkText={item.path} fileName={item.path}/> -->
                        <!-- <DynamicSlide slidePath={item.path} className={"hover:visible hidden"} /> -->
                    </div>
                {/each}
                <button
                    on:click={() => openModal("row", x, column.length)}
                    class="btn btn-primary btn-outline">+</button
                >
            </div>
            <button
                on:click={() => openModal("column", x + 1, 0)}
                class="btn btn-primary btn-outline">+</button
            >
        {/each}

        {#if contextMenuVisible}
            <div
                style="position: absolute; top: {contextMenuY}px; left: {contextMenuX}px;"
                class="menu z-50"
            >
                <button class="btn btn-error" on:click={deleteItem}
                    >Delete</button
                >
            </div>
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<!-- <FrameSearchCreate bind:show {handleAdd} /> -->

<style>
    :global(.droppable) {
        outline: 0.1rem solid blue;
        outline-offset: 0.25rem;
    }
</style>
