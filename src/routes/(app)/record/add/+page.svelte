<script lang="ts">
    import Message from "$lib/Message.svelte";
    import { goto } from "$app/navigation";

    export let data;

    let track;

    function add() {
        goto("/record/add?track=" + track.split("?")[0].split("track/")[1]);
        track = "";
    }
</script>

<div id="main">
    <p>Add a record:</p>
    <label for="tracki">Spotify Link/ID:</label>
    <input bind:value={track} id="tracki" />
    <button on:click={add}>Add track</button>
</div>
<Message {data} />
