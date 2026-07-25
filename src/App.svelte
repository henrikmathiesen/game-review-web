<script lang="ts">

import JumboHeader from "./lib/components/JumboHeader.svelte";
import NewsItem from "./lib/components/NewsItem.svelte";
import LoadingAnimation from "./lib/components/LoadingAnimation.svelte";

 import { gameRepository } from './lib/config/repositories';
 const gamesPromise = gameRepository.getAll();
</script>

<div class="container container--main">
    <div class="row">
        <div class="col-12">
            <JumboHeader></JumboHeader>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6">
            <hr>
            BREADCRUMB
            <hr>
        </div>
        <div class="col-12 col-md-6">
            <hr>
                STATISTIK, se comp
            <hr>
        </div>
    </div>

    <div class="row">
        <main class="col-12 col-lg-6">
            {#await gamesPromise}
                <LoadingAnimation />
            {:then games}
                {#each games as game (game.id)}
                    <p>{game.id}: {game.title}</p>
                {/each}
            {:catch error}
                <p>Could not load games</p>
            {/await}
        </main>

        <aside class="col-12 col-md-6 col-lg-3">
            <hr>
            TOP GAMES
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
