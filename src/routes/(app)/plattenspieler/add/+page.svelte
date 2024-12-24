<script>
    import { goto } from "$app/navigation";
    let auth;

    function submit() {
        goto("/plattenspieler/add?auth=" + auth);
    }
</script>

<div id="main">
    <p>Add a new plattenspieler:</p>
    <label for="auth">Enter the id of your plattenspieler:</label>
    <input type="text" bind:value={auth} id="auth" />
    <button on:click={submit}>Add</button>
</div>
