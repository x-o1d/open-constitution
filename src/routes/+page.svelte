<script lang="ts">
  import { onMount } from "svelte";
  import Line from "$lib/components/line.svelte";
  import { getEvent } from "$lib/service/events.js";
  import Input from "$lib/components/input.svelte";

  let showEditor = false;

  export let data;

  if (!data.lines.length) {
    data.lines.push({
      index: "-",
      content: "--------------",
    });
  }

  console.log(data);

  getEvent("insert-line").subscribe(({ index }) => {
    data.lines.splice(index + 1, 0, {
      content: "",
      _editMode: true,
      _localOnly: true,
    });
    data = data;
  });

  getEvent("update-lines").subscribe(async () => {
    const response = await fetch("/api");
    const newData = await response.json();
    data = newData;
  });
</script>

<div class="container">
  <div class="header">
    <p>ජනතා යෝජිත ආණ්ඩුක්‍රම ව්‍යවස්ථාව.</p>
  </div>
  {#each data.lines as line, index}
    {#if line._editMode}
      <Input content={line.content} {index} />
    {:else}
      <Line {line} {index} />
    {/if}
  {/each}
</div>

<style>
  :global(body) {
    --background-color: #f5f5f5;
    --background-color-2: #e8e8e8;
    padding: 0;
    margin: 0;

    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    font-weight: 400;
    font-style: normal;

    background-color: var(--background-color);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;

    height: 100vh;

    background-color: white;
    padding: 0 6px 0 6px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 30px;
  }
</style>
