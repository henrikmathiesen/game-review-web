<script lang="ts">
    import Router, { type RouteDetailLoaded } from "svelte-spa-router";
    import JumboHeader from "./lib/components/JumboHeader.svelte";
    import Statistic from "./lib/components/Statistic.svelte";
    import Breadcrumb, {
        type BreadcrumbItem,
    } from "./lib/components/Breadcrumb.svelte";
    import Footer from "./lib/components/Footer.svelte";
    import {
        gameRepository,
        reviewRepository,
    } from "./lib/config/repositories";
    import { createBreadcrumbItems } from "./lib/config/breadcrumbs";
    import { createRoutes } from "./lib/config/routes";
    import { sortReviewsByNewest } from "./lib/utils";

    const gamesPromise = gameRepository.getAll();
    const reviewsPromise = reviewRepository.getAll();

    const latestReviewsPromise = reviewsPromise.then((reviews) =>
        sortReviewsByNewest(reviews).slice(0, 5),
    );

    const statisticsPromise = Promise.all([gamesPromise, reviewsPromise]);

    const routes = createRoutes(gamesPromise, latestReviewsPromise);

    let breadcrumbItems = $state<BreadcrumbItem[]>([{ label: "Start" }]);

    let isStartView = $state(true);

    const handleRouteLoaded = async (detail: RouteDetailLoaded) => {
        isStartView = detail.route === "/";

        breadcrumbItems = await createBreadcrumbItems(
            detail,
            gamesPromise,
            reviewsPromise,
        );
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
            <Breadcrumb items={breadcrumbItems}></Breadcrumb>
        </div>
        <div class="col-12 col-md-6">
            {#await statisticsPromise}
                <p>Loading statistics...</p>
            {:then [games, reviews]}
                <Statistic
                    nrOfGames={games.length}
                    nrOfReviews={reviews.length}
                    nrOfUsers={2}
                />
            {:catch error}
                <p>Could not load statistics</p>
            {/await}
        </div>
    </div>

    <div class="route-content">
        <Router {routes} onRouteLoaded={handleRouteLoaded} restoreScrollState={true} />
    </div>

    <div
        class="row"
        class:spacing-row-t={isStartView}
        class:spacing-row-tt={!isStartView}
    >
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
