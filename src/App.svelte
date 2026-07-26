<script lang="ts">

  import JumboHeader from "./lib/components/JumboHeader.svelte";
  import NewsItem from "./lib/components/NewsItem.svelte";
  import LoadingAnimation from "./lib/components/LoadingAnimation.svelte";
  import Statistic from './lib/components/Statistic.svelte';
  import Breadcrumb from './lib/components/Breadcrumb.svelte';
  import GameList from './lib/components/GameList.svelte';
  import ReviewList from './lib/components/ReviewList.svelte';
  import Footer from './lib/components/Footer.svelte';
  import AlienNinja from './lib/components/AlienNinja.svelte';
  import { gameRepository, reviewRepository } from './lib/config/repositories';

  const gamesPromise = gameRepository.getAll();
  const reviewsPromise = reviewRepository.getAll();

  const latestReviewsPromise = reviewsPromise.then((reviews) =>
      [...reviews]
          .sort(
              (first, second) =>
                  Date.parse(second.createdAt) -
                  Date.parse(first.createdAt),
          )
          .slice(0, 5)
  );

  const statisticsPromise = Promise.all([gamesPromise, reviewsPromise]);

</script>

<div class="container">
    <div class="row">
        <div class="col-12">
            <JumboHeader></JumboHeader>
        </div>
    </div>
    <div class="row spacing-row">
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

    <div class="row spacing-row ">
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
            <div class="row spacing-row">
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
            <div class="row spacing-row">
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

    <div class="row">
        <div class="col-12">
            <Footer></Footer>
        </div>
    </div>
</div>



<style>
    .spacing-row {
        margin-bottom: 2rem;
    }
</style>
