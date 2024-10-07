<script lang="ts">
  import { onMount } from "svelte";
  import Input from "$lib/components/input.svelte";
  import Line from "$lib/components/line.svelte";
  import { getEvent } from "$lib/service/events.js";

  let showOptions = false;
  let showEditor = false;

  let line = "type here";

  let lines: { content: string }[] = [];

  export let data;

  const addLine = async () => {
    showEditor = !showEditor;
  };

  onMount(async () => {
    // const response = await fetch("/api");
    // const data = await response.json();
    // console.log(data);
  });

  getEvent("update-lines").subscribe(async () => {
    const response = await fetch("/api");
    const newData = await response.json();
    data = newData;
  });

  getEvent("update-index").subscribe((start) => {
    for (let i = start; i < data.lines.length; i++) {
      data.lines[i].index = i + 2;
    }
    data = data;
  });
</script>

<div class="container">
  <div class="header">
    <p>ජනතා යෝජිත ආණ්ඩුක්‍රම ව්‍යවස්ථාව.</p>
  </div>
  {#each data.lines as line}
    <Line {line} />
  {/each}
</div>

<style>
  :global(body) {
    background-color: #bebebe;
    padding: 0;
    margin: 0;

    font-family: "Abhaya Libre", serif;
    font-weight: 400;
    font-style: normal;
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
    padding: 10px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 30px;
  }

  button {
    width: 100%;

    padding: 10px;

    border: 1px solid black;
    border-radius: 5px;

    font-size: 1rem;
    font-weight: bold;

    margin-bottom: 5px;
  }

  .add-content {
    background-color: gray;
  }
  .add-line {
    background-color: rgb(88, 119, 124);
  }
  .add-section {
    background-color: #587c68;
  }
</style>
