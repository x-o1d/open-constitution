<script lang="ts">
  import { getEvent } from "$lib/service/events";
  import type { _FDLine } from "$lib/types/types";
  import DeleteIcon from "../../assets/delete.svg";
  import AddIcon from "../../assets/add.svg";
  import EditIcon from "../../assets/edit.svg";

  export let line: _FDLine;
  export let showTools = false;

  let showOption: number | undefined;
  let showAddLine = false;

  interface _toolsConfig {
    icon: string;
    options: {
      option: string;
      callback: () => void;
    }[];
  }

  const editLine = async () => {
    getEvent("edit-line").trigger(line.index);
  };

  const deleteLine = async () => {
    const response = await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({
        id: line.id,
      }),
    });
    const data = await response.json();
    if (data.success) {
      getEvent("update-lines").trigger();
      getEvent("close-tools").trigger();
    }
  };

  const insertLine = () => {
    getEvent("insert-line").trigger(line.index);
    getEvent("close-tools").trigger();
  };

  const insertSubLine = () => {
    getEvent("insert-sub-line").trigger(line.index);
    getEvent("close-tools").trigger();
  };

  getEvent("close-tools").subscribe(() => {
    showAddLine = false;
    showOption = undefined;
  });

  const toolsConfig: _toolsConfig[] = [
    {
      icon: EditIcon,
      options: [{ option: "මෙම වගන්තිය වෙනස් කරන්න.", callback: editLine }],
    },
    {
      icon: DeleteIcon,
      options: [{ option: "මෙම වගන්තිය ඉවත් කරන්න.", callback: deleteLine }],
    },
    {
      icon: AddIcon,
      options: [
        { option: "වගන්තියක් ඇතුල් කරන්න.", callback: insertLine },
        { option: "උප වගන්තියක් ඇතුල් කරන්න", callback: insertSubLine },
      ],
    },
  ];

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

{#if showTools}
  <div class="tools" in:showHide={200} out:showHide={200}>
    <div class="toolbar">
      {#each toolsConfig as config, index}
        <button
          on:click={() => {
            if (showOption === index) {
              showOption = undefined;
            } else {
              showOption = index;
            }
          }}
          class:selected-button={index === showOption}
        >
          <img src={config.icon} alt="delete" height="25" width="25" />
        </button>
      {/each}
    </div>
    {#each toolsConfig as config, index}
      {#if showOption === index}
        <div class="toolbar-options" in:showHide={200} out:showHide={200}>
          {#each config.options as sub}
            <div class="option">
              <button on:click={sub.callback}>{sub.option}</button>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
{/if}

<style>
  .tools {
    /* max-height: 0; */
    overflow: hidden;
    transition: max-height 200ms ease-in-out;
  }

  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    border-top: 4px solid var(--background-color);
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

  .selected-button {
    background-color: var(--background-color-2);
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

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
</style>
