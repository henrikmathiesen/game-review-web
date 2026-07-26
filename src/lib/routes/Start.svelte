<script lang="ts">
    import type { GameResponse, ReviewResponse } from "../DTO";
    import NewsItem from "../components/NewsItem.svelte";
    import LoadingAnimation from "../components/LoadingAnimation.svelte";
    import GameList from "../components/GameList.svelte";
    import ReviewList from "../components/ReviewList.svelte";
    import AlienNinja from "../components/AlienNinja.svelte";

    export let gamesPromise: Promise<GameResponse[]>;
    export let latestReviewsPromise: Promise<ReviewResponse[]>;
</script>

<div class="row">
    <main class="col-12 col-lg-6">
        {#await gamesPromise}
            <LoadingAnimation />
        {:then games}
            <GameList {games}></GameList>
        {:catch error}
            <p>Could not load games</p>
        {/await}
    </main>

    <aside class="col-12 col-lg-6">
        <div class="row spacing-row-b">
            <div class="col-12">
                {#await latestReviewsPromise}
                    <p>Loading reviews...</p>
                {:then reviews}
                    <ReviewList {reviews} />
                {:catch error}
                    <p>Could not load reviews</p>
                {/await}
            </div>
        </div>
        <div class="row spacing-row-b">
            <div class="col-12 col-md-6 col-lg-4">
                <NewsItem></NewsItem>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <NewsItem></NewsItem>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <NewsItem></NewsItem>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <AlienNinja></AlienNinja>
            </div>
        </div>
    </aside>
</div>

<style>
    .spacing-row-b {
        margin-bottom: 2rem;
    }
</style>
