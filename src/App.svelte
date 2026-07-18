<script lang="ts">

import JumboHeader from "./lib/components/JumboHeader.svelte";
import NewsItem from "./lib/components/NewsItem.svelte";
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
            STATISTICS
            <hr>
        </div>
    </div>

    <div class="row">
        <main class="col-12 col-lg-6">
            <hr>
            ALL GAMES
            <hr>
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