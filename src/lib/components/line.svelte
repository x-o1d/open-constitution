<script lang="ts">
  import { toDisplayIndex } from "$lib/helpers/line";
  import { getEvent } from "$lib/service/events";
  import type { _FDLine } from "$lib/types/types";
  import Tools from "./tools.svelte";

  export let line: _FDLine;

  let selected = false;

  const showToolbar = () => {
    selected = !selected;
    getEvent("select-line").trigger(line.id);
  };

  getEvent("select-line").subscribe((id) => {
    if (id !== line.id) {
      selected = false;
    }
  });

  getEvent("close-tools").subscribe(() => {
    selected = false;
  });
</script>

<div class="line">
  <button class="content" on:click={showToolbar}>
    <div class="index">{toDisplayIndex(line.index)}.</div>
    {line.content}
  </button>
  <Tools {line} showTools={selected} />
</div>

<style>
  .line {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;
    margin-bottom: 5px;
    font-size: 1rem;
  }

  button {
    display: flex;
    flex-direction: row;
    background-color: white;
    border: none;

    font-family: inherit;

    text-align: left;
  }

  .content {
    padding: 5px 0 5px 0;
    font-size: 14px;
  }

  .index {
    margin-top: 1px;
    margin-right: 5px;
    margin-left: 3px;
  }
</style>
