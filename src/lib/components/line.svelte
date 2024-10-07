<script lang="ts">
  import type { _Line } from "$lib/types/types";
  import Tools from "./tools.svelte";

  export let line: _Line;
  let showTools = false;

  const showToolbar = () => (showTools = !showTools);
</script>

<div class="line">
  <button class="content" on:click={showToolbar}>
    <div class="index">{line.index}.</div>
    {line.content}
  </button>
  {#if showTools}
    <Tools {line} />
  {/if}
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
  }

  .index {
    margin-right: 5px;
    font-size: 12px;
  }
</style>
