<nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
        <li>
            <a href="https://svelte.dev/">Home</a>
        </li>
        <li>
            <a href="https://svelte.dev/">Games</a>
        </li>
        <li>
            <a href="https://svelte.dev/" aria-current="page">Current game</a>
        </li>
    </ol>
</nav>

<style>
    .breadcrumb {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 4.125rem;
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        background-color: var(--color-surface);
        text-align: left;
    }

    ol {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    li + li::before {
        color: var(--color-text-muted);
        content: "/";
    }

    a {
        color: var(--color-link);
    }

    a:hover {
        color: var(--color-link-hover);
    }
</style>
