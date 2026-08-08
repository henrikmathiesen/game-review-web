<script lang="ts">
    import { untrack } from "svelte";
    import type { GameResponse, ReviewResponse } from "../DTO";
    import NewsItem from "../components/NewsItem.svelte";
    import LoadingAnimation from "../components/graphics/LoadingAnimation.svelte";
    import GameList from "../components/game/GameList.svelte";
    import ReviewList from "../components/review/ReviewList.svelte";
    import AlienNinja from "../components/graphics/AlienNinja.svelte";
    import QuestionClouds from "../components/graphics/QuestionClouds.svelte";
    import Pagination from "../components/Pagination.svelte";
    import GameSorting from "../components/game/GameSorting.svelte";
    import GameSearching from "../components/game/GameSearching.svelte";

    import { scrollToId, sortGames, filterGames, type GameSort } from "../utils";

    type Props = {
        gamesPromise: Promise<GameResponse[]>;
        latestReviewsPromise: Promise<ReviewResponse[]>;
    };

    let { gamesPromise, latestReviewsPromise }: Props = $props();

    const pageSize = 10;
    let games = $state<GameResponse[]>([]);
    let currentPage = $state(1);

    let activeSort = $state<GameSort>("title");

    let searchTerm = $state<string>("");

    const resolvedGamesPromise = untrack(() => gamesPromise).then(
        (resolvedGames) => {
            games = resolvedGames;
        },
    );

    let filteredGames = $derived.by(() => {
      return filterGames(games, searchTerm);
    });

    let pageCount = $derived(Math.ceil(filteredGames.length / pageSize));

    let sortedGames = $derived.by(() => {
        return sortGames(filteredGames, activeSort);
    });

    let paginatedGames = $derived.by(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return sortedGames.slice(startIndex, endIndex);
    });

    const onPageChange = (page: number) => {
        currentPage = page;
        scrollToId("scroll-point-start-main");
    };

    const onSortChange = (sort: GameSort) => {
        activeSort = sort;
        currentPage = 1;
    };

    const onSearchChange = (term: string) => {
        searchTerm = term;
        currentPage = 1;
    };
</script>

<div class="row">
    <main id="scroll-point-start-main" class="col-12 col-lg-6">
        {#if games.length > 1}
            <div class="row spacing-row-b">
                <div class="col-6 col-6-custom-breakpoint">
                    <GameSorting {activeSort} {onSortChange} />
                </div>
                <div class="col-6 col-6-custom-breakpoint">
                    <GameSearching {searchTerm} {onSearchChange}
                    ></GameSearching>
                </div>
            </div>
        {/if}
        <div class="row">
            <div class="col-12">
                {#await resolvedGamesPromise}
                    <LoadingAnimation />
                {:then}
                    {#if paginatedGames.length > 0}
                        <GameList games={paginatedGames}></GameList>
                    {:else}
                        <div class="question-clouds">
                            <p class="sr-only">No games matched your search.</p>
                            <QuestionClouds />
                        </div>
                    {/if}
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

<style>
    @media (max-width: 569px) {
        .col-6-custom-breakpoint {
            grid-column: span 12;
        }
    }

    .question-clouds {
        margin-top: 0;
    }

    @media (min-width: 1024px) {
        .question-clouds {
            margin-top: 60px;
        }
    }
</style>
