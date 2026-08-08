<script lang="ts">
    export let searchTerm: string;
    export let onSearchChange: (searchTerm: string) => void;
    export let isFullWidth = true;
</script>

<div class="game-searching" class:game-searching--max-width={!isFullWidth}>
    <label class="sr-only" for="game-searching">Search games</label>
    <input
        id="game-searching"
        class="search-input"
        name="game-searching"
        type="search"
        placeholder="Search games"
        autocomplete="off"
        value={searchTerm}
        oninput={(event) => onSearchChange(event.currentTarget.value)}
    />
</div>

<style>
    .game-searching {
        position: relative;
        width: 100%;
    }

    .game-searching--max-width {
        max-width: 18rem;
    }

    .search-input {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.625rem 0.875rem;
        border: 1px solid var(--color-border);
        background-color: var(--color-surface);
        color: var(--color-text);
        font: inherit;
        font-weight: 700;
        line-height: 1.2;
        transition:
            background-color 150ms ease-in-out,
            border-color 150ms ease-in-out,
            color 150ms ease-in-out;
    }

    .search-input::placeholder {
        color: var(--color-text-muted);
        opacity: 1;
    }

    .search-input:hover {
        border-color: var(--color-text-muted);
        background-color: var(--color-background);
        color: var(--color-text);
    }

    .search-input:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }
</style>
