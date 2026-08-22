<script lang="ts">
    import { link } from "svelte-spa-router";
    import type { GameResponse } from "../../DTO";
    import { truncateWords } from "../../utils";
    import Icon from "../graphics/Icon.svelte";

    type Props = {
        game: GameResponse;
        selectable?: boolean;
        selected?: boolean;
        onSelectionChange?: (id: number, selected: boolean) => void;
    };

    let {
        game,
        selectable = false,
        selected = false,
        onSelectionChange,
    }: Props = $props();
</script>

<li class="game">
    {#if selectable}
        <div class="game__selectable">
            <input
                type="checkbox"
                id={`game-${game.id}`}
                class="sr-only"
                checked={selected}
                onchange={(e) => {
                    onSelectionChange &&
                        onSelectionChange(game.id, e.currentTarget.checked);
                }}
            />
            {@render gameContent()}

            <label class="game__selection-overlay" for={`game-${game.id}`}>
                <span class="sr-only">Select {game.title}</span>
            </label>
        </div>
    {:else}
        <a class="game__link" href={`/game/${game.id}`} use:link>
            {@render gameContent()}
        </a>
    {/if}
</li>

{#snippet gameContent()}
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

            <p class="game__description">
                {truncateWords(game.description, 15)}
            </p>
        </div>
    </article>
{/snippet}

<style>
    .game {
        margin: 0;
    }

    .game:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }

    /* RESET */
    .game__link {
        display: block;
        color: inherit;
        text-decoration: none;
    }

    .game__link:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }

    .game__selectable {
        position: relative;
    }

    .game__selectable article {
        padding-right: 3.75rem;
    }

    .game__selection-overlay {
        position: absolute;
        z-index: 1;
        inset: 0;
        cursor: pointer;
    }

    .game__selection-overlay::after {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: grid;
        width: 1.4rem;
        height: 1.4rem;
        border: 2px solid var(--color-warning);
        background-color: var(--color-surface);
        content: "";
        place-items: center;
        color: var(--color-primary-text);
        font-size: 0.9rem;
        font-weight: 700;
        line-height: 1;
    }

    .game__selectable input:checked ~ article {
        background-color: var(--color-background);
        box-shadow: inset 4px 0 0 var(--color-warning);
    }

    .game__selectable input:checked ~ .game__selection-overlay::after {
        border-color: var(--color-warning);
        background-color: var(--color-warning);
        content: "\2713";
    }

    .game__selectable input:focus-visible ~ article {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }

    article {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: start;
        padding: 1rem;
        transition: background-color 150ms ease-in-out;
    }

    .game__link:hover article,
    .game__selectable:hover article {
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
