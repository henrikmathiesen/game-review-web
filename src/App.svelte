<script lang="ts">
    import Router from "svelte-spa-router";
    import { wrap } from "svelte-spa-router/wrap";
    import Start from './lib/routes/Start.svelte';
    import Login from './lib/routes/Login.svelte';
    import JumboHeader from "./lib/components/JumboHeader.svelte";
    import Statistic from "./lib/components/Statistic.svelte";
    import Breadcrumb from "./lib/components/Breadcrumb.svelte";
    import Footer from "./lib/components/Footer.svelte";
    import {
        gameRepository,
        reviewRepository,
    } from "./lib/config/repositories";

    const gamesPromise = gameRepository.getAll();
    const reviewsPromise = reviewRepository.getAll();

    const latestReviewsPromise = reviewsPromise.then((reviews) =>
        [...reviews]
            .sort(
                (first, second) =>
                    Date.parse(second.createdAt) - Date.parse(first.createdAt),
            )
            .slice(0, 5),
    );

    const statisticsPromise = Promise.all([gamesPromise, reviewsPromise]);

    const routes = {
        '/': wrap({
            component: Start,
            props: {
                gamesPromise,
                latestReviewsPromise,
            },
        }),
        '/login': Login
    };
</script>

<div class="container app-shell">
    <div class="row">
        <div class="col-12">
            <JumboHeader></JumboHeader>
        </div>
    </div>
    <div class="row spacing-row-b">
        <div class="col-12 col-md-6">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="col-12 col-md-6">
            {#await statisticsPromise}
                <p>Loading statistics...</p>
            {:then [games, reviews]}
                <Statistic
                    nrOfGames={games.length}
                    nrOfReviews={reviews.length}
                    nrOfUsers={0}
                />
            {:catch error}
                <p>Could not load statistics</p>
            {/await}
        </div>
    </div>

    <div class="route-content">
        <Router {routes} />
    </div>

    <div class="row spacing-row-t">
        <div class="col-12">
            <Footer></Footer>
        </div>
    </div>
</div>

<style>
    .app-shell {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100dvh;
    }

    .route-content {
        flex: 1;
    }
</style>
