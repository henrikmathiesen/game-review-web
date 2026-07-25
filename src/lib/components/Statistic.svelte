<script lang="ts">
    import Icon from './Icon.svelte';
    export let nrOfGames = 0;
    export let nrOfReviews = 0;
    export let nrOfUsers = 0;
</script>

<div class="statistics" aria-label="Site statistics">
    <div class="statistics__item">
        <Icon name="game"></Icon>
        <span class="sr-only">Games:</span>
        { nrOfGames } st
    </div>
    <div class="statistics__item">
        <Icon name="review"></Icon>
        <span class="sr-only">Reviews:</span>
        { nrOfReviews } st
    </div>
    <div class="statistics__item statistics__item--users">
        <Icon name="user"></Icon>
        <span class="sr-only">Users:</span>
        { nrOfUsers } st
    </div>
</div>

<style>
    .statistics {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        background-color: var(--color-surface);
    }

    .statistics__item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--color-text-muted);
        font-size: 1.25rem;
        white-space: nowrap;
    }

    .statistics__item--users {
        margin-inline-start: auto;
    }
</style>
