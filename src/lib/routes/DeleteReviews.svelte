<script lang="ts">
    import { reviewRepository } from "../config/repositories";
    import Banner from "../components/Banner.svelte";
    import LoadingAnimation from "../components/graphics/LoadingAnimation.svelte";
    import ReviewList from "../components/review/ReviewList.svelte";
    import Button from "../components/Button.svelte";

    let reviewsPromise = $state(reviewRepository.getAll());
    let selectedIds: number[] = $state([]);

    const onSelectionChange = (id: number, selected: boolean) => {
        let temp = selectedIds.filter((value) => value !== id);
        selected && temp.push(id);

        selectedIds = temp;
    };

    const onDeleteReviewsSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        for (const id of selectedIds) {
            await reviewRepository.deleteById(id);
        }

        reviewsPromise = reviewRepository.getAll();
        selectedIds = [];
    };
</script>

<main>
    <form class="row" novalidate onsubmit={onDeleteReviewsSubmit}>
        <div class="col-12 col-md-6">
            <Banner semantic="warning" heading="Important">
                <p>
                    Check the reviews you want to delete and click the delete
                    button. The action is irreversible.
                </p>
            </Banner>
            <div class="spacing-row-t">
                <Button
                    semantic="danger"
                    label="Delete selected reviews"
                    buttonType="submit"
                ></Button>
            </div>
        </div>
        <div class="col-12 col-md-6">
            {#await reviewsPromise}
                <LoadingAnimation />
            {:then reviews}
                <ReviewList
                    {reviews}
                    selectable={true}
                    {selectedIds}
                    {onSelectionChange}
                />
            {:catch error}
                <p>Could not load reviews</p>
            {/await}
        </div>
    </form>
</main>
