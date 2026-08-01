<script lang="ts">
    import Button from './Button.svelte';
    import { authState } from '../auth/auth-state.svelte';
</script>

<header class="jumbo-header">
    <div class="jumbo-header__login">
        {#if authState.isAuthenticated}
            <Button semantic="warning"
                label={`Log out ${authState.currentUser?.username}`}
                onButtonClick={() => authState.logout()}
            />
        {:else}
            <Button semantic="success" label="Login" route="/login" />
        {/if}
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

        background-image: url('/hero.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        overflow: hidden;
    }
</style>
