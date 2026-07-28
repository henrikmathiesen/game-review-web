<script lang="ts">
    import { gameRepository } from "../config/repositories";

    export let params: {
        id: string;
    };

    const gameId = Number(params.id);

    const gamePromise = gameRepository.getById(gameId);
</script>

<div class="row">
    <main class="col-12 col-lg-8">
        {#await gamePromise}
            <p>Loading game...</p>
        {:then game}
            <h2>{game?.title}</h2>
        {:catch error}
            <p>Could not load game</p>
        {/await}
    </main>
    <aside class="col-12 col-lg-4">

    </aside>
</div>

<style>
    aside {
        background-color: var(--color-primary);
    }
</style>

<!-- TODO better error handling for 404 (api) and null (localstorage) -->
