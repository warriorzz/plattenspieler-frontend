<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Message from "$lib/Message.svelte";

    export let data;
</script>

<div id="main">
    <h3>Welcome, {data.account.name}!</h3>

    {#if !data.account.spotify}
        <p>
            It seems like you haven't connected your Spotify Account yet! Please
            click <button
                on:click={(e) => {
                    goto("/connect");
                }}>here</button
            > to connect your account.
        </p>
    {:else}
        {#if data.account.device !== ""}
            You've currently selected a device with the id '{data.account
                .device}'. To switch, press
            <button
                on:click={(e) => {
                    goto("/device");
                }}>here</button
            >.
        {:else}
            You haven't selected a device yet - which means that playback will
            start on your last playback device. To select a specific device,
            press <button
                on:click={(e) => {
                    goto("/device");
                }}>here</button
            >.
        {/if}
        <p>
            To add a record, click <button
                on:click={(e) => {
                    goto("/record/add");
                }}>here</button
            >.
        </p>
        <p>
            To view your plattenspieler, click <button
                on:click={(e) => {
                    goto("/plattenspieler");
                }}>here</button
            >.
        </p>
    {/if}
</div>
<Message {data} />
