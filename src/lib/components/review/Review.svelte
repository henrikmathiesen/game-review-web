<script lang="ts">
    import { link } from "svelte-spa-router";
    import type { ReviewResponse } from "../../DTO";
    import { truncateWords, formatDate } from "../../utils";
    import Icon from "../graphics/Icon.svelte";

    export let review: ReviewResponse;
    export let showRating = true;
</script>

<li class="review" class:show-rating={showRating}>
    <a class="review__link" href={`/review/${review.id}`} use:link>
        <article>
            <div class="review__rating">
                <strong>{review.rating}</strong>
                <span>/ 10</span>
            </div>
            <div class="review__content">
                <header>
                    <div class="review__icon">
                        <Icon name="review" />
                    </div>
                    <h3>{review.header}</h3>
                </header>

                <p class="review__metadata">
                    <span>{review.gameTitle}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time datetime={review.createdAt}>
                        {formatDate(review.createdAt)}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{review.createdBy}</span>
                </p>

                <p class="review__body">
                    {truncateWords(review.body, 15)}
                </p>
            </div>
        </article>
    </a>
</li>

<style>
    .review {
        margin: 0;
    }

    .review:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
    }

    /* RESET */
    .review__link {
        display: block;
        color: inherit;
        text-decoration: none;
    }

    .review__link:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }

    article {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: start;
        padding: 0.875rem;
        transition: background-color 150ms ease-in-out;
    }

    .show-rating article {
        grid-template-columns: 3.25rem minmax(0, 1fr);
        gap: 0.75rem;
    }

    .review__link:hover article {
        background-color: var(--color-background);
    }

    .review__rating {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 3.25rem;
        min-height: 3.25rem;
        padding: 0.35rem;
        background-color: var(--color-accent);
        color: var(--color-accent-text);
        line-height: 1;
    }

    .show-rating .review__rating {
        display: flex;
    }

    .review__rating strong {
        font-family: var(--font-heading);
        font-size: 1.6rem;
    }

    .review__rating span {
        margin-top: 0.2rem;
        font-size: 0.65rem;
        font-weight: 700;
    }

    .review__content {
        min-width: 0;
    }

    header {
        display: flex;
        gap: 0.4rem;
        align-items: flex-start;
    }

    .review__icon {
        display: flex;
        flex-shrink: 0;
        color: var(--color-accent);
        font-size: 0.65rem;
    }

    h3 {
        min-width: 0;
        font-size: 1.05rem;
        line-height: 1.25;
        overflow-wrap: anywhere;
    }

    .review__metadata {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        margin-top: 0.35rem;
        color: var(--color-text-muted);
        font-size: 0.75rem;
    }

    .review__body {
        margin-top: 0.65rem;
        color: var(--color-text);
        font-size: 0.875rem;
        line-height: 1.45;
    }
</style>
