<script lang="ts">
    import type { ReviewResponse } from '../../DTO';
    import Review from './Review.svelte';

    export let reviews: ReviewResponse[] = [];
    export let showRating = true;
    export let selectable = false;
    export let selectedIds: number[] = [];
    export let onSelectionChange: ((id: number, selected: boolean) => void) | undefined = undefined;
</script>

<ul class="review-list">
    {#each reviews as review (review.id)}
        <Review
            {review}
            {showRating}
            {selectable}
            selected={selectedIds.includes(review.id)}
            {onSelectionChange}
        />
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
