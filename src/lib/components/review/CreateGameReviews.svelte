<script lang="ts">
    import Button from "../Button.svelte";
    import { authState } from "../../auth/auth-state.svelte";

    export let gameId: number;
</script>

<div class="create-game-reviews">
    {#if authState.canCreateReviews}
        <Button semantic="success" label="Create a review" route={`/game/${gameId}/create-review`} />
    {:else}
        <p>Login to create a review</p>
    {/if}
</div>

<style>
    .create-game-reviews {
        display: flex;
        justify-content: end;
        padding-right: 3rem;
        padding-bottom: 3rem;

        p {
            color: var(--color-text-muted);
            font-size: 0.875rem;
        }
    }
</style>
