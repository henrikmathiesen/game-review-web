<script lang="ts">
    import type { GameResponse } from '../DTO';
    import Icon from './Icon.svelte';

    export let game: GameResponse;
</script>

<li class="game">
    <article>
        <div class="game__icon">
            <Icon name="game" />
        </div>

        <div class="game__content">
            <header>
                <h2>{game.title}</h2>

                <span class="game__rating">
                    {#if game.averageRating === null}
                        Not rated
                    {:else}
                        {game.averageRating.toFixed(1)} / 10
                    {/if}
                </span>
            </header>

            <p class="game__metadata">
                {game.genre}
                <span aria-hidden="true">&middot;</span>
                {game.platform}
                <span aria-hidden="true">&middot;</span>
                {game.releaseYear}
            </p>

            <p class="game__description">{game.description}</p>
        </div>
    </article>
</li>

<style>
    .game {
        margin: 0;
    }

    .game:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }

    article {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: start;
        padding: 1rem;
        transition: background-color 150ms ease-in-out;
    }

    article:hover {
        background-color: var(--color-background);
    }

    .game__icon {
        display: flex;
        color: var(--color-primary);
        font-size: 1.25rem;
    }

    header {
        display: flex;
        gap: 1rem;
        align-items: baseline;
        justify-content: space-between;
    }

    h2 {
        min-width: 0;
        font-size: 1.35rem;
        line-height: 1.2;
    }

    .game__rating {
        flex-shrink: 0;
        color: var(--color-primary);
        font-size: 0.875rem;
        font-weight: 700;
        white-space: nowrap;
    }

    .game__metadata {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-top: 0.35rem;
        color: var(--color-text-muted);
        font-size: 0.8rem;
    }

    .game__description {
        margin-top: 0.75rem;
        color: var(--color-text);
        font-size: 0.95rem;
        line-height: 1.5;
    }

    @media (max-width: 479px) {
        article {
            grid-template-columns: 1fr;
        }

        .game__icon {
            display: none;
        }

        header {
            align-items: flex-start;
        }
    }
</style>
