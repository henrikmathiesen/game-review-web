<script lang="ts">
    import Icon from "../graphics/Icon.svelte";
</script>

<article class="game-not-created">
    <div class="game__icon">
        <Icon name="game" />
    </div>

    <div class="game__content">
        <header>
            <h2>???</h2>
            <span class="game__rating">Not rated</span>
        </header>

        <p class="game__metadata">
            ???
            <span aria-hidden="true">&middot;</span>
            ???
            <span aria-hidden="true">&middot;</span>
            ???
        </p>

        <p class="game__description">
            <span class="d-block">???</span>
            <span class="d-block hidden" aria-hidden="true">???</span>
        </p>
    </div>
</article>

<style>
    .game-not-created {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: start;
        margin: 0;
        padding: 1rem;
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

    .game__description .hidden {
        margin-top: 1rem;
    }

    @media (max-width: 479px) {
        .game-not-created {
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
