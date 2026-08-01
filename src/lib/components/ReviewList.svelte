<script lang="ts">
    import type { ReviewResponse } from '../DTO';
    import Review from './Review.svelte';

    export let reviews: ReviewResponse[] = [];
    export let showRating = true;
</script>

<ul class="review-list">
    {#each reviews as review (review.id)}
        <Review {review} {showRating} />
    {/each}
</ul>

<style>
    .review-list {
        display: grid;
        gap: 0.25rem;
        margin: 0;
        padding: 0.5rem;
        background-color: var(--color-surface);
        list-style: none;
    }
</style>
