<script lang="ts">
    import { link } from "svelte-spa-router";
    import Button from "../Button.svelte";
    import { authState } from "../../auth/auth-state.svelte";
</script>

<header class="jumbo-header">
    <div class="jumbo-header__login">
        <div>
            {#if authState.isAuthenticated}
                <Button
                    semantic="warning"
                    label={`Log out ${authState.currentUser?.username}`}
                    onButtonClick={() => authState.logout()}
                />
            {:else}
                <Button semantic="success" label="Login" route="/login" />
            {/if}
        </div>
        <div
            class="jumbo-header__login__links"
            class:spacing-row-t={authState.canCreateGames || authState.canDeleteGames || authState.canDeleteReviews}>
            {#if authState.canCreateGames}
                <div>
                    <a href="/" use:link>Create Game</a>
                </div>
            {/if}
            {#if authState.canDeleteGames}
                <div>
                    <a href="/" use:link>Delete Games</a>
                </div>
            {/if}
            {#if authState.canDeleteReviews}
                <div>
                    <a href="/" use:link>Delete Reviews</a>
                </div>
            {/if}
        </div>
    </div>
    <div class="jumbo-header__content">
        <h1 class="sr-only">Gaming is the Opium - Games and Reviews</h1>
    </div>
</header>

<style>
    .jumbo-header {
        position: relative;
        display: flex;
        justify-content: end;
    }

    .jumbo-header__login {
        position: absolute;
        inset-block-start: 1rem;
        inset-inline-start: 0;
        z-index: 1;
    }

    .jumbo-header__content {
        width: 75%;
        aspect-ratio: 3 / 2;

        background-image: url("/hero.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        overflow: hidden;
    }
    .jumbo-header__login__links {
        div + div {
            margin-top: 0.25rem;
        }
    }

    a {
        color: var(--color-link);
    }

    a:hover {
        color: var(--color-link-hover);
    }
</style>
