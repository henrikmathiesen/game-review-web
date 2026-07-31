<script lang="ts">
    import type { Snippet } from "svelte";

    type BannerSemantic = "success" | "warning" | "danger";

    type Props = {
        semantic: BannerSemantic;
        heading: string;
        children: Snippet;
    };

    let { semantic, heading, children }: Props = $props();
</script>

<section class={`banner banner--${semantic}`}>
    <h2>{heading}</h2>
    {@render children()}
</section>

<style>
    .banner {
        padding: 1.25rem 1.5rem;
        border-left: 8px solid var(--banner-color);
        background-color: var(--color-surface);
    }

    .banner--success {
        --banner-color: var(--color-success);
    }

    .banner--warning {
        --banner-color: var(--color-warning);
    }

    .banner--danger {
        --banner-color: var(--color-danger);
    }

    h2 {
        color: var(--banner-color);
        font-size: 1.5rem;
        line-height: 1.25;
        margin-bottom: 1.5rem;
    }

    /* Targets transcluded p under .banner */

    .banner :global(p) {
        color: var(--color-text);
        line-height: 1.6;
    }

    .banner :global(p + p) {
        margin-top: 1rem;
    }
</style>
