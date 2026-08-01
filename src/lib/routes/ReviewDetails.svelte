<script lang="ts">
    import { link } from "svelte-spa-router";
    import { reviewRepository } from "../config/repositories";
    import Icon from "../components/Icon.svelte";
    import LoadingAnimation from "../components/LoadingAnimation.svelte";
    import { formatDate } from "../utils";
    import CreateGameReviews from "../components/CreateGameReviews.svelte";

    export let params: {
        id: string;
    };

    const reviewId = Number(params.id);

    const reviewPromise = reviewRepository.getById(reviewId);
</script>

<div class="row">
    <main class="col-12 col-lg-8">
        {#await reviewPromise}
            <LoadingAnimation />
        {:then review}
            {#if review}
                <article class="review-details">
                    <header class="review-details__header">
                        <div class="review-details__eyebrow">
                            <Icon name="review" />
                            <span>Review</span>
                        </div>

                        <div class="review-details__title-row">
                            <h2>{review.header}</h2>

                            <div
                                class="review-details__rating"
                                aria-label={`Rating: ${review.rating} out of 10`}
                            >
                                <strong>{review.rating}</strong>
                                <span>out of 10</span>
                            </div>
                        </div>

                        <dl class="review-details__metadata">
                            <div>
                                <dt>Game</dt>
                                <dd>
                                    <a
                                        href={`/game/${review.gameId}`}
                                        use:link
                                    >
                                        {review.gameTitle}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt>Written by</dt>
                                <dd>{review.createdBy}</dd>
                            </div>
                            <div>
                                <dt>Published</dt>
                                <dd>
                                    <time datetime={review.createdAt}>
                                        {formatDate(review.createdAt)}
                                    </time>
                                </dd>
                            </div>
                        </dl>
                    </header>

                    <div class="review-details__body">
                        <p class="review-details__lead">{review.body}</p>

                        <section>
                            <h3>The experience</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Integer vitae justo eget magna
                                fermentum iaculis. Sed cursus ante dapibus diam,
                                quisque sit amet est et sapien ullamcorper
                                pharetra.
                            </p>
                            <p>
                                Praesent mauris, fusce nec tellus sed augue
                                semper porta. Mauris massa, vestibulum lacinia
                                arcu eget, nulla facilisi.
                            </p>
                        </section>

                        <section>
                            <h3>What works</h3>
                            <p>
                                Pellentesque odio nisi, euismod in, pharetra a,
                                ultricies in, diam. Sed arcu cras consequat,
                                praesent dapibus neque id cursus faucibus,
                                tortor neque egestas augue.
                            </p>
                        </section>

                        <section>
                            <h3>Final thoughts</h3>
                            <p>
                                Morbi in sem quis dui placerat ornare. Ut
                                aliquam sollicitudin leo, cras iaculis
                                ultricies nulla. Donec quis dui at dolor tempor
                                interdum.
                            </p>
                        </section>
                    </div>
                </article>
            {:else}
                <div class="review-details__message">
                    <h2>Review not found</h2>
                    <p>The requested review could not be found.</p>
                </div>
            {/if}
        {:catch error}
            <div class="review-details__message">
                <h2>Could not load review</h2>
                <p>Please try again later.</p>
            </div>
        {/await}
    </main>
    <aside class="col-12 col-lg-4">
        <div class="spacing-row-tt">
            <CreateGameReviews />
        </div>
    </aside>
</div>

<style>
    .review-details {
        overflow: hidden;
        background-color: var(--color-surface);
    }

    .review-details__header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--color-divider);
    }

    .review-details__eyebrow {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.75rem;
        color: var(--color-accent);
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .review-details__title-row {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
        justify-content: space-between;
    }

    h2 {
        min-width: 0;
        font-size: 2rem;
        line-height: 1.15;
        overflow-wrap: anywhere;
    }

    .review-details__rating {
        display: flex;
        flex: 0 0 auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 5rem;
        min-height: 5rem;
        padding: 0.75rem;
        background-color: var(--color-accent);
        color: var(--color-accent-text);
        line-height: 1;
    }

    .review-details__rating strong {
        font-family: var(--font-heading);
        font-size: 2.5rem;
    }

    .review-details__rating span {
        margin-top: 0.3rem;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
    }

    .review-details__metadata {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin: 1.5rem 0 0;
        padding-top: 1rem;
        border-top: 1px solid var(--color-divider);
    }

    .review-details__metadata div {
        min-width: 0;
        padding-inline: 1rem;
    }

    .review-details__metadata div:first-child {
        padding-left: 0;
    }

    .review-details__metadata div:not(:last-child) {
        border-right: 1px solid var(--color-divider);
    }

    dt {
        color: var(--color-text-muted);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    dd {
        margin: 0.25rem 0 0;
        font-weight: 700;
        overflow-wrap: anywhere;
    }

    dd a {
        color: var(--color-accent);
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
    }

    dd a:hover {
        color: var(--color-accent-hover);
    }

    dd a:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 3px;
    }

    .review-details__body {
        max-width: 44rem;
        padding: 2rem 1.5rem 2.5rem;
    }

    .review-details__lead {
        padding-left: 1.25rem;
        border-left: 4px solid var(--color-accent);
        font-family: var(--font-heading);
        font-size: 1.2rem;
        line-height: 1.75;
        white-space: pre-line;
    }

    section {
        margin-top: 2rem;
    }

    h3 {
        margin: 0 0 0.75rem;
        font-size: 1.35rem;
    }

    section p {
        color: var(--color-text);
        line-height: 1.7;
    }

    section p + p {
        margin-top: 1rem;
    }

    .review-details__message {
        padding: 2rem 1.5rem;
        background-color: var(--color-surface);
    }

    .review-details__message p {
        margin-top: 0.5rem;
        color: var(--color-text-muted);
    }

    aside {
        background-color: var(--color-surface);
    }

    @media (max-width: 479px) {
        .review-details__title-row {
            flex-direction: column;
            gap: 1rem;
        }

        .review-details__metadata {
            grid-template-columns: 1fr;
            gap: 0.75rem;
        }

        .review-details__metadata div {
            padding: 0 0 0.75rem;
        }

        .review-details__metadata div:not(:last-child) {
            border-right: 0;
            border-bottom: 1px solid var(--color-divider);
        }
    }
</style>

<!-- TODO better error handling for 404 (api) and null (localstorage) -->
