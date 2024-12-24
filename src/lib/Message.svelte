<script>
    export let data;
</script>

{#if data.success !== undefined && data.success !== null}
    <div id="wrapper">
        {#if data.success}
            <div id="message" class="success">
                Success! {data.successm !== undefined ? data.successm : ""}
            </div>
        {:else}
            <div id="message" class="error">
                Error! {data.successm !== undefined ? data.successm : ""}
            </div>
        {/if}
    </div>
{/if}

<style>
    #wrapper {
        position: absolute;
        width: 100%;
        bottom: 10px;
        margin: 0;
        padding: 0;
    }

    #message {
        margin-left: auto;
        margin-right: auto;
        border-radius: 0px;
        padding: 10px;
        font-size: 20px;
        width: fit-content;
    }

    .success {
        border: 3px solid green;
    }

    .error {
        border: 3px solid red;
    }
</style>
