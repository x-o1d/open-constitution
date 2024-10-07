<script lang="ts">
  import { getEvent } from "$lib/service/events";
  import type { _Line } from "$lib/types/types";
  import { onMount } from "svelte";
  import DoneIcon from "../../assets/done.svg";

  export let line: _Line;

  let editable: any;

  const addLine = async () => {
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        line: line.content,
      }),
    });
    const data = await response.json();
    getEvent("update-lines").trigger();
    line.content = "";
  };

  onMount(() => {
    editable.focus();
  });
</script>

<div class="editor">
  <div class="index">{line.index}.</div>
  <textarea bind:value={line.content} bind:this={editable} />
</div>
<div class="editor-tools">
  <button on:click={addLine}>
    <img src={DoneIcon} alt="done" height="30" width="30" />
  </button>
</div>

<style>
  .editor {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    width: calc(100% - 10px);

    padding-left: 3px;
    padding-right: 3px;
    margin-top: 10px;
    margin-right: 10px;

    border: 1px solid #cccccc;
    border-radius: 3px;
  }

  .index {
    margin-top: 7px;
    margin-right: 5px;
    font-size: 12px;
  }

  textarea {
    width: 100%;
    border: none;
    border-radius: 3px;
    padding: 5px;
    margin-left: -5px;

    font-size: 1rem;
    font-family: "Abhaya Libre", serif;
    font-weight: 400;
    font-style: normal;
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
  }

  button {
    display: flex;
    flex-direction: row;
    background-color: white;
    border: none;
    margin-left: 5px;
  }
  /* input {
    width: calc(100% - 22px);
    height: 2rem;
    border: 1px solid black;
    border-radius: 5px;

    font-size: 1rem;
    font-weight: bold;
    padding: 10px;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  } */
</style>
