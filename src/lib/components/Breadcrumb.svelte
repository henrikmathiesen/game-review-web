<script module lang="ts">
    export type BreadcrumbItem = {
        label: string;
        href?: string;
    };
</script>

<script lang="ts">
    import { link } from "svelte-spa-router";
    export let items: BreadcrumbItem[];
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
        {#each items as item}
            <li>
                {#if item.href}
                    <a href={item.href} use:link>
                        {item.label}
                    </a>
                {:else}
                    <span aria-current="page">
                        {item.label}
                    </span>
                {/if}
            </li>
        {/each}
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
