<script>
    import Message from "$lib/Message.svelte";

    export let data;
</script>

<div id="main">
    <h3>Your plattenspielers:</h3>
    {#if true}
        {#each data.plattenspieler.plattenspieler as plattenspieler}
            <a href={"/plattenspieler/" + plattenspieler.id}
                >Plattenspieler ID {plattenspieler.id}, last active: {plattenspieler.lastActive !=
                -1
                    ? new Date(plattenspieler.lastActive).toLocaleString(
                          "de-DE",
                      )
                    : "never"}</a
            >
            <br />
        {/each}
    {:else}
        No plattenspielers registered yet.
    {/if}

    <br />
    <p>
        Add a new plattenspieler: click <a href="/plattenspieler/add">here</a>
    </p>
</div>
<Message {data} />
