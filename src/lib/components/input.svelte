<script lang="ts">
  import { getEvent } from "$lib/service/events";
  import type { _FDLine } from "$lib/types/types";
  import { onMount } from "svelte";
  import DoneIcon from "../../assets/done.svg";
  import CancelIcon from "../../assets/cancel.svg";
  import { toDisplayIndex } from "$lib/helpers/line";

  export let line: _FDLine;

  let editable: any;

  const addLine = async () => {
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        index: line.index,
        line: line.content,
      }),
    });
    const data = await response.json();
    if (data.success) {
      getEvent("update-lines").trigger();
    }
  };

  const cancel = async () => {
    getEvent("cancel-insert").trigger(line.index);
  };

  const textAreaAdjust = () => {
    editable.style.height = "1px";
    editable.style.height = 20 + editable.scrollHeight + "px";
  };

  onMount(() => {
    textAreaAdjust();
    editable.focus();
  });

  const showHide = (node: any, duration: number) => {
    const style = getComputedStyle(node);
    const height = parseInt(style.height.split("px")[0]);

    return {
      duration: 100,
      css: (t: number) => {
        const e = t;
        return `
					max-height: ${height * e}px;
          overflow: 'hidden';
        `;
      },
    };
  };
</script>

<div class="input" in:showHide={200} out:showHide={200}>
  <div class="editor">
    <div class="index">
      {toDisplayIndex(line.index)}.
    </div>
    <textarea
      on:keyup={textAreaAdjust}
      bind:value={line.content}
      bind:this={editable}
    />
  </div>
  <div class="editor-tools">
    <button on:click={addLine}>
      <img src={DoneIcon} alt="done" height="25" width="25" />
    </button>
    <button on:click={cancel}>
      <img src={CancelIcon} alt="done" height="25" width="25" />
    </button>
  </div>
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;

    width: 100%;
  }
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
