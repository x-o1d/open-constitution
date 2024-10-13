<script lang="ts">
  import { getEvent } from "$lib/service/events";
  import type { _Line } from "$lib/types/types";
  import { onMount } from "svelte";
  import DoneIcon from "../../assets/done.svg";
  import CancelIcon from "../../assets/cancel.svg";

  export let index: number;
  export let content: string;

  let editable: any;

  const addLine = async () => {
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        index,
        line: content,
      }),
    });
    const data = await response.json();
    if (data.success) {
      getEvent("update-lines").trigger();
    }
  };

  const cancel = async () => {};

  const textAreaAdjust = () => {
    editable.style.height = "1px";
    editable.style.height = 20 + editable.scrollHeight + "px";
  };

  onMount(() => {
    textAreaAdjust();
    editable.focus();
  });
</script>

<div class="editor">
  <div class="index">{index + 1}.</div>
  <textarea
    on:keyup={textAreaAdjust}
    bind:value={content}
    bind:this={editable}
  />
</div>
<div class="editor-tools">
  <button on:click={addLine}>
    <img src={DoneIcon} alt="done" height="25" width="25" />
  </button>
  <button on:click={addLine}>
    <img src={CancelIcon} alt="done" height="25" width="25" />
  </button>
</div>

<style>
  .editor {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    width: 100%;

    margin-top: 10px;

    border-radius: 3px;
    background-color: var(--background-color);

    padding: 3px 0 5px 0;
    font-size: 14px;
  }

  .index {
    margin-right: 5px;
    margin-left: 3px;
  }

  textarea {
    width: 100%;
    border: none;
    border-radius: 3px;
    padding: 0;
    margin: 0;

    font-size: 14px;
    font-family: inherit;
    background-color: var(--background-color);
  }

  textarea:focus {
    outline: none !important;
    border: 0px solid #ece0e0;
  }

  .editor-tools {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    margin-bottom: 5px;

    width: 100%;
  }

  button {
    display: flex;
    flex-direction: row;
    background-color: var(--background-color);
    border: none;
    margin-left: 2px;
    margin-top: 2px;
    padding: 10px;
  }
</style>
