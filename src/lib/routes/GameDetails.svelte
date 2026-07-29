<script lang="ts">
    import { gameRepository, reviewRepository } from "../config/repositories";
    import Icon from "../components/Icon.svelte";
    import LoadingAnimation from "../components/LoadingAnimation.svelte";
    import ReviewList from "../components/ReviewList.svelte";
    import { sortReviewsByNewest } from "../utils";

    export let params: {
        id: string;
    };

    const gameId = Number(params.id);

    const gamePromise = gameRepository.getById(gameId);
    const reviewsPromise = reviewRepository.getByGameId(gameId);

    const sortedReviewsPromise = reviewsPromise.then((reviews) =>
        sortReviewsByNewest(reviews),
    );
</script>

<div class="row">
    <main class="col-12 col-lg-8">
        {#await gamePromise}
            <LoadingAnimation />
        {:then game}
            {#if game}
                <article class="game-details">
                    <header class="game-details__header">
                        <div class="game-details__eyebrow">
                            <Icon name="game" />
                            <span>Game details</span>
                        </div>

                        <div class="game-details__title-row">
                            <h2>{game.title}</h2>

                            <div class="game-details__rating">
                                <span class="game-details__rating-value">
                                    {#if game.averageRating === null}
                                        &ndash;
                                    {:else}
                                        {game.averageRating.toFixed(1)}
                                    {/if}
                                </span>
                                <span class="game-details__rating-scale">
                                    {#if game.averageRating === null}
                                        Not rated
                                    {:else}
                                        out of 10
                                    {/if}
                                </span>
                            </div>
                        </div>

                        <dl class="game-details__metadata">
                            <div>
                                <dt>Genre</dt>
                                <dd>{game.genre}</dd>
                            </div>
                            <div>
                                <dt>Platform</dt>
                                <dd>{game.platform}</dd>
                            </div>
                            <div>
                                <dt>Release year</dt>
                                <dd>{game.releaseYear}</dd>
                            </div>
                        </dl>
                    </header>

                    <div class="game-details__body">
                        <p class="game-details__lead">{game.description}</p>

                        <section>
                            <h3>About the game</h3>
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
                                arcu eget, nulla facilisi. Morbi in sem quis dui
                                placerat ornare.
                            </p>
                        </section>

                        <section>
                            <h3>Gameplay and experience</h3>
                            <p>
                                Pellentesque odio nisi, euismod in, pharetra a,
                                ultricies in, diam. Sed arcu cras consequat,
                                praesent dapibus neque id cursus faucibus,
                                tortor neque egestas augue, eu vulputate magna
                                eros eu erat.
                            </p>
                        </section>
                    </div>
                </article>
                {#await sortedReviewsPromise}
                    <LoadingAnimation />
                {:then reviews}
                    {#if reviews.length > 0}
                        <section
                            class="game-reviews"
                            aria-labelledby="game-reviews-heading"
                        >
                            <h2
                                id="game-reviews-heading"
                                class="game-reviews__heading"
                            >
                                Reviews
                            </h2>
                            <ReviewList {reviews} />
                        </section>
                    {/if}
                {:catch error}
                    <p>Could not load reviews</p>
                {/await}
            {:else}
                <div class="game-details__message">
                    <h2>Game not found</h2>
                    <p>The requested game could not be found.</p>
                </div>
            {/if}
        {:catch error}
            <div class="game-details__message">
                <h2>Could not load game</h2>
                <p>Please try again later.</p>
            </div>
        {/await}
    </main>
    <aside class="col-12 col-lg-4"></aside>
</div>

<!-- TODO better error handling for 404 (api) and null (localstorage) -->

<style>
    .game-details {
        overflow: hidden;
        background-color: var(--color-surface);
    }

    .game-details__header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--color-divider);
    }

    .game-details__eyebrow {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.75rem;
        color: var(--color-primary);
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .game-details__title-row {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
        justify-content: space-between;
    }

    h2 {
        min-width: 0;
        font-size: 2rem;
        line-height: 1.15;
    }

    .game-details__rating {
        display: flex;
        flex: 0 0 auto;
        flex-direction: column;
        align-items: flex-end;
        color: var(--color-primary);
    }

    .game-details__rating-value {
        font-family: var(--font-heading);
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 0.9;
    }

    .game-details__rating-scale {
        margin-top: 0.35rem;
        color: var(--color-text-muted);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
    }

    .game-details__metadata {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin: 1.5rem 0 0;
        padding-top: 1rem;
        border-top: 1px solid var(--color-divider);
    }

    .game-details__metadata div {
        padding-inline: 1rem;
    }

    .game-details__metadata div:first-child {
        padding-left: 0;
    }

    .game-details__metadata div:not(:last-child) {
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
    }

    .game-details__body {
        padding: 1.5rem;
    }

    .game-details__lead {
        padding-left: 1rem;
        border-left: 4px solid var(--color-primary);
        font-family: var(--font-heading);
        font-size: 1.25rem;
        line-height: 1.55;
    }

    section {
        max-width: 42rem;
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

    .game-details__message {
        padding: 2rem 1.5rem;
        background-color: var(--color-surface);
    }

    .game-details__message p {
        margin-top: 0.5rem;
        color: var(--color-text-muted);
    }

    aside {
        background-color: var(--color-surface);
    }

    .game-reviews {
        max-width: inherit;
        margin-top: 4rem;
    }

    .game-reviews__heading {
        margin-bottom: 1rem;
    }

    @media (max-width: 479px) {
        .game-details__title-row {
            flex-direction: column;
            gap: 1rem;
        }

        .game-details__rating {
            align-items: flex-start;
        }

        .game-details__metadata {
            grid-template-columns: 1fr;
            gap: 0.75rem;
        }

        .game-details__metadata div {
            padding: 0 0 0.75rem;
        }

        .game-details__metadata div:not(:last-child) {
            border-right: 0;
            border-bottom: 1px solid var(--color-divider);
        }
    }
</style>
