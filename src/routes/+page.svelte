<script>
    let showOptions= false;
</script>

<div class="container">
    <div class="header">
        <p>ජනතා යෝජිත ආණ්ඩුක්‍රම ව්‍යවස්ථාව.</p>
    </div>
    <button class="add-content" on:click={() => {
        showOptions=!showOptions;
    }}>
        +
    </button>
    {#if showOptions}
    <button class="add-line">වගන්තියක් ඇතුලත් කරන්න.</button>
    <button class="add-section">අණු කණ්ඩයක් ඇතුලත් කරන්න.</button>
    {/if}
</div>

<style>
    :global(body) {
        background-color: #bebebe;
        padding: 0;
        margin: 0;
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

        font-weight: bold;
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