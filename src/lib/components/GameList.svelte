<script lang="ts">
    import type { GameResponse } from '../DTO';
    import Game from './Game.svelte';

    export let games: GameResponse[] = [];
</script>

<ul class="game-list">
    {#each games as game (game.id)}
        <Game {game} />
    {/each}
</ul>

<style>
    .game-list {
        display: grid;
        gap: 0.25rem;
        margin: 0;
        padding: 0.5rem;
        background-color: var(--color-surface);
        list-style: none;
    }
</style>
