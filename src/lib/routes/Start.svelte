<script lang="ts">
    import { untrack } from "svelte";
    import type { GameResponse, ReviewResponse } from "../DTO";
    import NewsItem from "../components/NewsItem.svelte";
    import LoadingAnimation from "../components/LoadingAnimation.svelte";
    import GameList from "../components/GameList.svelte";
    import ReviewList from "../components/ReviewList.svelte";
    import AlienNinja from "../components/AlienNinja.svelte";
    import Pagination from "../components/Pagination.svelte";
    import GameSorting, {
        type GameSort,
    } from "../components/GameSorting.svelte";

    import { scrollToId } from "../utils";

    type Props = {
        gamesPromise: Promise<GameResponse[]>;
        latestReviewsPromise: Promise<ReviewResponse[]>;
    };

    let { gamesPromise, latestReviewsPromise }: Props = $props();

    const pageSize = 10;
    let games = $state<GameResponse[]>([]);
    let currentPage = $state(1);
    let pageCount = $derived(Math.ceil(games.length / pageSize));

    let activeSort = $state<GameSort>("name");

    const resolvedGamesPromise = untrack(() => gamesPromise).then(
        (resolvedGames) => {
            games = resolvedGames;
        },
    );

    let paginatedGames = $derived.by(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return games.slice(startIndex, endIndex);
    });

    const onPageChange = (page: number) => {
        currentPage = page;
        scrollToId("scroll-point-start-main");
    };

    const onSortChange = (sort: GameSort) => {
        activeSort = sort;
        currentPage = 1;
    };
</script>

<div class="row">
    <main id="scroll-point-start-main" class="col-12 col-lg-6">
        {#if games.length > 1}
            <div class="row spacing-row-b">
                <div class="col-12">
                    <GameSorting {activeSort} {onSortChange} />
                </div>
            </div>
        {/if}
        <div class="row">
            <div class="col-12">
                {#await resolvedGamesPromise}
                    <LoadingAnimation />
                {:then}
                    <GameList games={paginatedGames}></GameList>
                {:catch error}
                    <p>Could not load games</p>
                {/await}
            </div>
        </div>
        {#if pageCount > 1}
            <div class="row spacing-row-t">
                <div class="col-12">
                    <Pagination {currentPage} {pageCount} {onPageChange} />
                </div>
            </div>
        {/if}
    </main>

    <aside class="col-12 col-lg-6">
        <div class="row spacing-row-b spacing-row-t-xs-to-md">
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
