<script lang="ts">
    import Banner from "../components/Banner.svelte";
    import Button from "../components/Button.svelte";
    import KarateSmurf from "../components/KarateSmurf.svelte";
</script>

<main class="row">
    <div class="col-12 col-md-6">
        <Banner semantic="warning" heading="Important: this is a demo site">
            <p>
                This application uses simulated authentication. Signing in
                changes which actions are available in the interface, but it
                does not provide security for the backend API.
            </p>

            <p>
                In the deployed demo, games and reviews are stored in your
                browser's localStorage. Feel free to explore the available
                features — any changes you make only affect data in your own
                browser.
            </p>

            <p>
                Sign in as an administrator with username <strong>admin</strong>
                and password <strong>admin</strong>, or as a regular user with
                username
                <strong>user</strong> and password <strong>user</strong>.
            </p>
        </Banner>
        <div class="karate-smurf">
            <KarateSmurf></KarateSmurf>
        </div>
    </div>
    <div class="col-12 col-md-6">
        <form class="login-form" onsubmit={(event) => event.preventDefault()}>
            <header class="login-form__header">
                <h2>Sign in</h2>
                <p>Enter one of the demo accounts to continue.</p>
            </header>

            <div class="login-form__field">
                <label for="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autocomplete="username"
                    required
                />
            </div>

            <div class="login-form__field">
                <label for="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                />
            </div>

            <Button
                semantic="success"
                label="Sign in"
                buttonType="submit"
                fullWidth
            />
        </form>
    </div>
</main>

<style>
    .login-form {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        background-color: var(--color-surface);
    }

    .login-form__header {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-divider);
    }

    h2 {
        color: var(--color-primary);
        font-size: 1.5rem;
        line-height: 1.25;
    }

    .login-form__header p {
        margin-top: 0.5rem;
        color: var(--color-text-muted);
        line-height: 1.5;
    }

    .login-form__field {
        display: grid;
        gap: 0.4rem;
        margin-bottom: 1.25rem;
    }

    label {
        color: var(--color-text);
        font-size: 0.875rem;
        font-weight: 700;
    }

    input {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--color-border);
        background-color: var(--color-background);
        color: var(--color-text);
        font: inherit;
        transition:
            background-color 150ms ease-in-out,
            border-color 150ms ease-in-out;
    }

    input:hover {
        border-color: var(--color-text-muted);
        background-color: var(--color-surface);
    }

    input:focus-visible {
        border-color: var(--color-primary);
        outline: 3px solid var(--color-primary);
        outline-offset: 2px;
    }

    .karate-smurf {
        position: relative;
        top: 80px;
    }
</style>
