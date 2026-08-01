<script lang="ts">
    import { gameRepository } from "../config/repositories";
    import GameList from "../components/GameList.svelte";
    import LoadingAnimation from "../components/LoadingAnimation.svelte";
    import KarateSmurf from "../components/KarateSmurf.svelte";

    export let params: {
        id: string;
    };

    const gameId = Number(params.id);
    const gamePromise = gameRepository.getById(gameId);
</script>

<main class="row">
    <div class="col-12 col-md-6">
        <div class="game-info">
            {#await gamePromise}
                <LoadingAnimation />
            {:then game}
                {#if game}
                    <GameList games={[game]} />
                {/if}
            {:catch error}
                <p>Could not load games</p>
            {/await}
        </div>
        <div class="karate-smurf">
            <KarateSmurf></KarateSmurf>
        </div>
    </div>
    <div class="col-12 col-md-6"></div>
</main>

<style>
    .game-info {
        background-color: var(--color-surface);
    }

    .karate-smurf {
        position: relative;
        top: 80px;
    }
</style>
