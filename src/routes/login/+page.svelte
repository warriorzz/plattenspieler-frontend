<script lang="ts">
    import { goto } from "$app/navigation";
    import Loading from "$lib/Loading.svelte";

    const backendBaseUrl = "https://plattenspieler.bjarn.ee/api";
    let username = "";
    let password = "";

    let usernamer = "";
    let passwordr = "";
    let tokenr = "";

    let test = "";

    let show_error = false;
    let loading_r = false;
    let loading_c = false;

    function login_c() {
        loading_c = true;
        fetch(backendBaseUrl + "/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                user: username,
                password: password,
            }),
        })
            .then((response) => {
                if (response.status >= 300) {
                    return "";
                }
                return response.text();
            })
            .then((token) => {
                if (token === "") {
                    show_error = true;
                    password = "";
                    loading_c = false;
                    return;
                } else {
                    goto("/login?token=" + token);
                }
            });
    }

    function register_c() {
        loading_r = true;
        fetch(backendBaseUrl + "/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: usernamer,
                password: passwordr,
                code: tokenr,
            }),
        })
            .then((response) => {
                loading_r = false;
                if (response.status < 300) {
                    return true;
                }
                return false;
            })
            .then((success) => {
                if (success) {
                    password = passwordr;
                    username = usernamer;
                    login_c();
                } else {
                    show_error = true;
                    passwordr = "";
                }
            });
    }
</script>

{#if show_error}
    <div id="error">
        Unfortunately, an error occured :/. Please try again :).
        <button
            id="berror"
            on:click={(e) => {
                show_error = false;
            }}>x</button
        >
    </div>
{/if}

<h3>Login</h3>
<input bind:value={username} type="text" placeholder="Username" />
<input bind:value={password} type="password" placeholder="Password" />
<button on:click={login_c}>Login</button>
<Loading loading={loading_c} />

<h3>...or Register</h3>
<input bind:value={usernamer} type="text" placeholder="Username" />
<input bind:value={passwordr} type="password" placeholder="Password" />
<input bind:value={tokenr} type="password" placeholder="Token" />
<button on:click={register_c}>Register</button>
<Loading loading={loading_r} />

<style>
    * {
        margin-left: 10px;
    }

    #error {
        margin: 0;
        background-color: #880000;
        height: 30px;
    }

    #berror {
        margin: auto;
        margin-right: 10px;
    }
</style>
