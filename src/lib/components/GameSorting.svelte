<script module lang="ts">
    export type GameSort =
        | 'name'
        | 'platform'
        | 'genre'
        | 'releaseYear'
        | 'rating';
</script>

<script lang="ts">
    type SortOption = {
        value: GameSort;
        label: string;
    };

    const sortOptions: SortOption[] = [
        { value: 'name', label: 'Sort Games by Name' },
        { value: 'platform', label: 'Sort Games by Platform' },
        { value: 'genre', label: 'Sort Games by Genre' },
        { value: 'releaseYear', label: 'Sort Games by Year' },
        { value: 'rating', label: 'Sort Games by Rating' },
    ];

    export let activeSort: GameSort;
    export let onSortChange: (sort: GameSort) => void;
</script>

<div class="game-sorting">
    <label class="sr-only" for="game-sorting">Sort games</label>

    <select
        id="game-sorting"
        class="sort-select"
        value={activeSort}
        onchange={(event) =>
            onSortChange(event.currentTarget.value as GameSort)}
    >
        {#each sortOptions as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
</div>

<style>
    .game-sorting {
        position: relative;
        width: 100%;
        max-width: 18rem;
    }

    .game-sorting::after {
        position: absolute;
        inset-block-start: 50%;
        inset-inline-end: 1rem;
        color: var(--color-accent);
        content: "▼";
        font-size: 0.75rem;
        pointer-events: none;
        transform: translateY(-50%);
    }

    .sort-select {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.625rem 2.75rem 0.625rem 0.875rem;
        border: 1px solid var(--color-accent);
        background-color: var(--color-surface);
        color: var(--color-accent);
        appearance: none;
        font: inherit;
        font-weight: 700;
        line-height: 1.2;
        cursor: pointer;
        transition:
            background-color 150ms ease-in-out,
            border-color 150ms ease-in-out,
            color 150ms ease-in-out;
    }

    .sort-select:hover {
        border-color: var(--color-accent-hover);
        color: var(--color-accent-hover);
    }

    .sort-select:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }
</style>
