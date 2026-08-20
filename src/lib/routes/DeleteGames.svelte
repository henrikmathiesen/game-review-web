<script lang="ts">
    import { gameRepository } from "../config/repositories";
    import Banner from "../components/Banner.svelte";
    import LoadingAnimation from "../components/graphics/LoadingAnimation.svelte";
    import GameList from "../components/game/GameList.svelte";

    const gamesPromise = gameRepository.getAll();
</script>

<main class="row">
    <div class="col-12 col-md-6">
        <Banner semantic="warning" heading="Important">
            <p>
                Check the games you want to delete and click the delete button.
                The reviews for each game will be deleted as well. The action is irreversible.
            </p>
        </Banner>
    </div>
    <div class="col-12 col-md-6">
        {#await gamesPromise}
            <LoadingAnimation />
        {:then games}
            <GameList games={games}></GameList>
        {:catch error}
            <p>Could not load games</p>
        {/await}
    </div>
</main>
