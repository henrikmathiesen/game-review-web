<script lang="ts">
    import { gameRepository } from "../config/repositories";
    import Banner from "../components/Banner.svelte";
    import LoadingAnimation from "../components/graphics/LoadingAnimation.svelte";
    import GameList from "../components/game/GameList.svelte";
    import Button from "../components/Button.svelte";

    const gamesPromise = gameRepository.getAll();

    let selectedIds: number[] = $state([]);

    const onSelectionChange = (id: number, selected: boolean) => {
      let temp = selectedIds.filter(v => v !== id);
      selected && temp.push(id);

      selectedIds = temp;
    }

    const onDeleteGamesSubmit = (event: SubmitEvent) => {
      event.preventDefault();
    }
</script>

<main>
    <form class="row" novalidate onsubmit={onDeleteGamesSubmit}>
        <div class="col-12 col-md-6">
            <Banner semantic="warning" heading="Important">
                <p>
                    Check the games you want to delete and click the delete button.
                    The reviews for each game will be deleted as well. The action is irreversible.
                </p>
            </Banner>
            <div class="spacing-row-t ">
                <Button semantic="danger" label="Delete selected games" buttonType="submit"></Button>
            </div>
        </div>
        <div class="col-12 col-md-6">
            {#await gamesPromise}
                <LoadingAnimation />
            {:then games}
                <GameList games={games} selectable={true} {selectedIds} {onSelectionChange}></GameList>
            {:catch error}
                <p>Could not load games</p>
            {/await}
        </div>
    </form>
</main>
