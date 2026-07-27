<script lang="ts">
    export let currentPage: number;
    export let pageCount: number;
    export let onPageChange: (page: number) => void;
</script>

<nav aria-label="Pagination of games">
    <ul class="pagination">
        <li class="page-item" class:disabled={currentPage === 1}>
            <button
                class="page-link page-link--step"
                type="button"
                disabled={currentPage === 1}
                onclick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>
        </li>

        {#each { length: pageCount }, index}
            {@const page = index + 1}

            <li class="page-item" class:active={page === currentPage}>
                <button
                    class="page-link"
                    type="button"
                    aria-current={page === currentPage ? 'page' : undefined}
                    onclick={() => onPageChange(page)}
                >
                    {page}
                </button>
            </li>
        {/each}

        <li
            class="page-item"
            class:disabled={currentPage === pageCount}
        >
            <button
                class="page-link page-link--step"
                type="button"
                disabled={currentPage === pageCount}
                onclick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </li>
    </ul>
</nav>

<style>
    .pagination {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.375rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .page-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2.75rem;
        min-height: 2.75rem;
        padding: 0.625rem 0.875rem;
        border: 1px solid var(--color-accent);
        background-color: var(--color-surface);
        color: var(--color-accent);
        font: inherit;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        transition:
            background-color 150ms ease-in-out,
            border-color 150ms ease-in-out,
            color 150ms ease-in-out,
            transform 75ms ease-in-out;
    }

    .page-link:hover:not(:disabled) {
        border-color: var(--color-accent-hover);
        background-color: var(--color-accent-hover);
        color: var(--color-accent-text);
    }

    .page-link--step {
        width: 5rem;
        text-transform: uppercase;
    }

    .page-link:active:not(:disabled) {
        transform: translateY(1px);
    }

    .page-link:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }

    .page-item.active .page-link {
        border-color: var(--color-accent);
        background-color: var(--color-accent);
        color: var(--color-accent-text);
    }

    .page-item.active .page-link:hover {
        border-color: var(--color-accent-hover);
        background-color: var(--color-accent-hover);
    }

    .page-link:disabled {
        border-color: var(--color-border);
        background-color: var(--color-background);
        color: var(--color-text-muted);
        cursor: not-allowed;
        opacity: 0.65;
    }
</style>
