<script lang="ts">
    import { reviewRepository } from "../config/repositories";

    export let params: {
        id: string;
    };

    const reviewId = Number(params.id);

    const reviewPromise = reviewRepository.getById(reviewId);
</script>

<div class="row">
    <main class="col-12 col-lg-8">
        {#await reviewPromise}
            <p>Loading review...</p>
        {:then review}
            <h2>{review?.header}</h2>
        {:catch error}
            <p>Could not load review</p>
        {/await}
    </main>
    <aside class="col-12 col-lg-4">

    </aside>
</div>

<style>
    aside {
        background-color: var(--color-accent);
    }
</style>

<!-- TODO better error handling for 404 (api) and null (localstorage) -->
