<script lang="ts">
  import { getEvent } from "$lib/service/events";
  import type { _Line } from "$lib/types/types";
  import DeleteIcon from "../../assets/delete.svg";
  import AddIcon from "../../assets/add.svg";
  import Input from "./input.svelte";

  export let line: _Line;
  let newLine: _Line;

  let showAddOptions = false;
  let showAddLine = false;

  const deleteLine = async () => {
    const response = await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({
        _id: line._id,
      }),
    });
    const data = await response.json();
    if (data.success) {
      getEvent("update-lines").trigger();
    }
  };

  const showLineOptions = () => {
    showAddOptions = !showAddOptions;
  };

  const showLineEditor = () => {
    newLine = {
      index: line.index! + 1,
      content: "",
    };
    getEvent("update-index").trigger(line.index);
    showAddOptions = false;
    showAddLine = true;
  };
</script>

{#if showAddLine}
  <Input line={newLine} />
{:else}
  <div class="toolbar">
    <button on:click={deleteLine}>
      <img src={DeleteIcon} alt="delete" height="30" width="30" />
    </button>
    <button on:click={showLineOptions}>
      <img src={AddIcon} alt="delete" height="30" width="30" />
    </button>
  </div>
{/if}
{#if showAddOptions}
  <div class="toolbar-options">
    <div class="option">
      <button on:click={showLineEditor}>වගන්තියක් ඇතුල් කරන්න</button>
    </div>
    <div class="option">
      <button on:click={showLineEditor}>උප වගන්තියක් ඇතුල් කරන්න</button>
    </div>
  </div>
{/if}

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  button {
    display: flex;
    flex-direction: row;
    background-color: white;
    border: none;
    margin-left: 5px;
    padding: 5px;
  }

  .toolbar-options {
    display: flex;
    flex-direction: column;
  }

  .option {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .option > button {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
