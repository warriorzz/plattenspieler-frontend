<script lang="ts">
    import Message from "$lib/Message.svelte";
    import { goto } from "$app/navigation";

    export let data;
    let ndevice = data.selected;

    function select() {
        if (ndevice === undefined) return;
        goto("/device?device=" + ndevice);
    }

    function onChange(event) {
        ndevice = event.currentTarget.value;
    }
</script>

<div id="main">
    <h3>Please select a new device:</h3>
    <fieldset>
        {#each data.devices as device}
            <input
                type="radio"
                on:change={onChange}
                id={device.id}
                value={device.id}
                name="device"
                selected={ndevice === device.id}
            />
            <label for={device.id}>{device.name}</label>
            <br />
        {/each}
        <input
            type="radio"
            id="any-device-plattenspieler-this-is-a-random-string-why-are-you-looking-at-this"
            name="device"
            value="any"
            on:change={onChange}
        />
        <label
            for="any-device-plattenspieler-this-is-a-random-string-why-are-you-looking-at-this"
            >Any Device</label
        >
        <br /><br />
        {#if data.devices.length == 0}
            <p>
                It seems like there are no active devices right now. Please
                start playback on your selected device and reload the page or
                select 'Any Device' to continue.
            </p>
        {:else}
            Please select your specific device or select 'Any Device'.
        {/if}
    </fieldset>
    <br />
    <button on:click={select}>Select Device</button>
</div>
<Message {data} />
