<!-- Open the modal using ID.showModal() method -->

<script>
  import { onMount } from "svelte";

  export let show = false;

  export let handleAdd;

  export let name = "";
  import Select from "svelte-select";

  function close() {
    show = false;
    console.log(selectedFrame);
    selectOpen = true;
  }

  function save() {
    console.log(name);
    close();
  }

  function remove() {
    console.log("remove");
    close();
  }

  function selectFrame(event) {
    selectedFrame = event.detail.value;
    console.log(selectedFrame);
    handleAdd({ name: selectedFrame });
    close();
  }

  let framesList;

  onMount(async () => {
    let res = await fetch(`/editor`);
    let json = await res.json();
    framesList = json.frames;
    // console.log("framesList: ", framesList)
  });

  let filteredFrames = []; // List of frames filtered by search
  let frameSearch = ""; // Search query entered by the user
  let selectedFrame; // Currently selected frame

  let newItem = false;

  let filterText = "";
  $: {
    if (filterText.length) {
      frameSearch = filterText;
    }
  }

  let modalHeight = "200px";
  let selectOpen = true;
  $:{
    modalHeight = selectOpen ? '400px' : 'auto';
  }

  async function createNewFile() {
    console.log("createNewFile", frameSearch);
    let res = await fetch(`/editor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: frameSearch }),
    });
    console.log(res);
  }

  async function handleNew() {
    await createNewFile();
    handleAdd({ name: frameSearch });
    close();
  }
</script>

{#if show}
  <div class="modal modal-open">
    <div class="modal-box flex-row" style="height: {modalHeight}; top: 100px; position: absolute;">
      <form on:submit|preventDefault={save}>
        <div class="flex max-w-full">
          <button
            type="submit"
            class="btn btn-primary {frameSearch.length &&
            !framesList.includes(frameSearch)
              ? ''
              : 'btn-disabled'} "
            on:click={handleNew}>Create New</button
          >
          <button type="button" class="btn self-end" on:click={close}>Cancel</button>
        </div>
        <div class="form-control mt-4 overflow-y-visible">
          <Select
            class="select select-bordered min-w-full max-w-xs"
            inputStyles="background-color: oklch(var(--b1));"
            --list-background="oklch(var(--b1))"
            --background="oklch(var(--b1))"
            placeholder="Select a Frame"
            items={framesList}
            bind:listOpen={selectOpen}
            focused={true}
            on:change={selectFrame}
            bind:filterText
          />
        </div>
      </form>
    </div>
    <div class="modal-overlay z-50" on:click={close}></div>
  </div>
{/if}
