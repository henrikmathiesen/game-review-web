<script lang="ts">
    import { fade } from "svelte/transition";
    import { push } from "svelte-spa-router";
    import { gameRepository } from "../config/repositories";
    import GameList from "../components/GameList.svelte";
    import LoadingAnimation from "../components/LoadingAnimation.svelte";
    import Button from "../components/Button.svelte";
    import Banner from "../components/Banner.svelte";
    import { authState } from "../auth/auth-state.svelte";
    import { type ReviewRequest } from "../DTO";
    import { reviewRepository } from "../config/repositories";

    type Props = {
        params: {
            id: string;
        };
    };

    let { params }: Props = $props();

    const gameId = $derived(Number(params.id));
    let gamePromise = $derived(gameRepository.getById(gameId));

    let header = $state("");
    let body = $state("");
    let rating = $state<number | undefined>(undefined);
    let formInvalid = $state(false);

    const onReviewSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        const game = await gamePromise;

        if (!header || !body || rating === undefined || !game) {
            formInvalid = true;
            return;
        }

        const review: ReviewRequest = {
            header,
            body,
            rating,
            createdBy: authState.currentUser!.username,
        };

        await reviewRepository.create(
            {
                id: game.id,
                title: game.title,
            },
            review,
        );

        await push(`/game/${game.id}`);
    };
</script>

<main class="row">
    <div class="col-12 col-md-6">
        <div class="game-info">
            {#await gamePromise}
                <LoadingAnimation />
            {:then game}
                {#if game}
                    <GameList games={[game]} />
                {/if}
            {:catch error}
                <p>Could not load games</p>
            {/await}
        </div>
        <div role="alert">
            {#if formInvalid}
                <div class="spacing-row-t" out:fade={{ duration: 250 }}>
                    <Banner semantic="danger" heading="Validation Errors">
                        <p>You need to fill out every field in the form!</p>
                    </Banner>
                </div>
            {/if}
        </div>
    </div>
    <div class="col-12 col-md-6">
        <form novalidate class="review-form" onsubmit={onReviewSubmit}>
            <header class="review-form__header">
                <h2>Create a review</h2>
                <p>
                    Share your thoughts about the game and give it a rating from
                    1 to 10.
                </p>
            </header>

            <p class="review-form__author">
                Writing as
                <strong>{authState.currentUser?.username}</strong>
            </p>

            <div class="review-form__field">
                <label for="review-header">Heading</label>
                <input
                    id="review-header"
                    name="header"
                    type="text"
                    autocomplete="off"
                    required
                    bind:value={header}
                    oninput={() => (formInvalid = false)}
                />
            </div>

            <div class="review-form__field">
                <label for="review-body">Review</label>
                <textarea
                    id="review-body"
                    name="body"
                    rows="9"
                    required
                    bind:value={body}
                    oninput={() => (formInvalid = false)}></textarea>
            </div>

            <div class="review-form__field">
                <label for="review-rating">Rating</label>
                <select
                    id="review-rating"
                    name="rating"
                    required
                    bind:value={rating}
                    oninput={() => (formInvalid = false)}
                >
                    <option value={undefined}>Choose a rating</option>
                    {#each { length: 10 }, index}
                        {@const value = index + 1}
                        <option {value}>{value} / 10</option>
                    {/each}
                </select>
            </div>

            <Button
                semantic="success"
                label="Create review"
                buttonType="submit"
                fullWidth
            />
        </form>
    </div>
</main>

<style>
    .game-info {
        background-color: var(--color-surface);
    }

    .review-form {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        background-color: var(--color-surface);
    }

    .review-form__header {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-divider);
    }

    .review-form__header h2 {
        color: var(--color-primary);
        font-size: 1.5rem;
        line-height: 1.25;
    }

    .review-form__header p {
        margin-top: 0.5rem;
        color: var(--color-text-muted);
        line-height: 1.5;
    }

    .review-form__author {
        margin-bottom: 1.25rem;
        color: var(--color-text-muted);
        font-size: 0.875rem;
    }

    .review-form__author strong {
        color: var(--color-text);
    }

    .review-form__field {
        display: grid;
        gap: 0.4rem;
        margin-bottom: 1.25rem;
    }

    label {
        color: var(--color-text);
        font-size: 0.875rem;
        font-weight: 700;
    }

    input,
    textarea,
    select {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--color-border);
        background-color: var(--color-background);
        color: var(--color-text);
        font: inherit;
        transition:
            background-color 150ms ease-in-out,
            border-color 150ms ease-in-out;
    }

    textarea {
        resize: vertical;
        line-height: 1.5;
    }

    input:hover,
    textarea:hover,
    select:hover {
        border-color: var(--color-text-muted);
        background-color: var(--color-surface);
    }

    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }
</style>
