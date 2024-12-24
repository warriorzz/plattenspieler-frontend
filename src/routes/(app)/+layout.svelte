<script>
    import { goto } from "$app/navigation";

    function home() {
        goto("/");
    }
</script>

<div id="headline">
    <div id="wrap">
        <h1>Plattenspieler</h1>
        <div id="bwrap">
            <button id="home" on:click={home}>Home</button>
        </div>
    </div>
</div>
<slot></slot>

<style>
    #headline {
        background-color: #000504;
        margin-left: 20px;
        margin-right: 20px;
    }

    #wrap {
        width: 100%;
        display: flex;
    }

    #home {
        height: fit-content;
        margin-top: auto;
        margin-bottom: auto;
    }

    #bwrap {
        display: grid;
        margin-left: auto;
    }
</style>
