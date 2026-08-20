<script lang="ts">
    import { reviewRepository } from "../config/repositories";
    import Banner from "../components/Banner.svelte";
    import LoadingAnimation from "../components/graphics/LoadingAnimation.svelte";
    import ReviewList from "../components/review/ReviewList.svelte";

    const reviewsPromise = reviewRepository.getAll();
</script>

<main class="row">
    <div class="col-12 col-md-6">
        <Banner semantic="warning" heading="Important">
            <p>
                Check the reviews you want to delete and click the delete button.
                The action is irreversible.
            </p>
        </Banner>
    </div>
    <div class="col-12 col-md-6">
        {#await reviewsPromise}
            <LoadingAnimation />
        {:then reviews}
            <ReviewList {reviews} />
        {:catch error}
            <p>Could not load reviews</p>
        {/await}
    </div>
</main>
