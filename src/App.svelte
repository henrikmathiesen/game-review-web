<script lang="ts">

  import JumboHeader from "./lib/components/JumboHeader.svelte";
  import NewsItem from "./lib/components/NewsItem.svelte";
  import LoadingAnimation from "./lib/components/LoadingAnimation.svelte";
  import Statistic from './lib/components/Statistic.svelte';
  import Breadcrumb from './lib/components/Breadcrumb.svelte';
  import GameList from './lib/components/GameList.svelte';

  import { gameRepository } from './lib/config/repositories';
  const gamesPromise = gameRepository.getAll();
</script>

<div class="container container--main">
    <div class="row">
        <div class="col-12">
            <JumboHeader></JumboHeader>
        </div>
    </div>
    <div class="row data-row">
        <div class="col-12 col-md-6">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="col-12 col-md-6">
            <!-- Await both gamesPromise and reviewPromise and send prop down -->
            <Statistic></Statistic>
        </div>
    </div>

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

        <aside class="col-12 col-md-6 col-lg-3">
            <hr>
            TOP GAMES (or provide sorting and filtering)
            <hr>
            <hr>
            LATESTREVIEWS
            <hr>
        </aside>

        <aside class="col-12 col-md-6 col-lg-3">
            <NewsItem></NewsItem>
            <NewsItem></NewsItem>
            <NewsItem></NewsItem>
            <NewsItem></NewsItem>
            <NewsItem></NewsItem>
        </aside>
    </div>
</div>

<style>
    .data-row {
        margin-bottom: 2rem;
    }
</style>
