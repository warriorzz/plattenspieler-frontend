<script>
    import { Shadow } from "svelte-loading-spinners";
    export let loading;
</script>

{#if loading}
    <div>
        <Shadow size="20" color="lightgrey" unit="px" duration="1s" />
    </div>
{/if}

<style>
    div {
        position: relative;
    }
</style>
