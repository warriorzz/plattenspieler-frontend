<script lang="ts">
    import { goto } from "$app/navigation";
    import Message from "$lib/Message.svelte";

    export let data;

    let id = data.plattenspieler.id;
    let ssid = "";
    let password = "";

    function submit() {
        goto(
            "/plattenspieler/" +
                id +
                "?ssid=" +
                encodeURIComponent(ssid) +
                "&password=" +
                encodeURIComponent(password),
        );
        ssid = "";
        password = "";
    }
</script>

<div id="main">
    <h1>plattenspieler ID {id}</h1>
    <p>
        Last Active: {data.plattenspieler.lastActive != -1
            ? new Date(data.plattenspieler.lastActive).toLocaleString("de-DE")
            : "never"}
    </p>
    <p>Change wifi:</p>
    <input type="text" bind:value={ssid} placeholder="SSID" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={submit}>Submit</button>
    <br />
</div>
<Message {data} />
