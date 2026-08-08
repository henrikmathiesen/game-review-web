<script lang="ts">
    import { push } from "svelte-spa-router";
    import { fade } from "svelte/transition";
    import Button from "../components/Button.svelte";
    import Banner from "../components/Banner.svelte";
    import GameNotCreated from "../components/game/GameNotCreated.svelte";
    import { Genre, Platform } from "../enums";
    import { type GameRequest } from "../DTO";
    import { gameRepository } from "../config/repositories";

    let title = $state("");
    let genre = $state<Genre | undefined>(undefined);
    let platform = $state<Platform | undefined>(undefined);
    let description = $state("");
    let releaseYear = $state<number | undefined>(undefined);
    let formInvalid = $state(false);

    const onGameSubmit = async (event: SubmitEvent) => {
      event.preventDefault();

      const isReleaseYearCorrect = () => {
        if(!releaseYear) {
          return false;
        }

        return releaseYear >= 1970 &&
        releaseYear <= new Date().getFullYear()
      }

      if(!title || !genre || !platform || !description || !releaseYear || !isReleaseYearCorrect()) {
        formInvalid = true;
        return;
      }

      const game: GameRequest = {
        title,
        genre,
        platform,
        description,
        releaseYear
      };

      const createdGame = await gameRepository.create(game);

      await push(`/game/${createdGame.id}`);
    };
</script>

<main class="row">
    <div class="col-12 col-md-6">
        <div class="game-info">
            <GameNotCreated />
        </div>
        <div role="alert">
            {#if formInvalid}
                <div class="spacing-row-t" out:fade={{ duration: 250 }}>
                    <Banner semantic="danger" heading="Validation Errors">
                        <p>
                            You need to fill out every field in the form!
                            And Release year needs to be 1970 to today.
                        </p>
                    </Banner>
                </div>
            {/if}
        </div>
    </div>
    <div class="col-12 col-md-6">
        <form
            novalidate
            class="game-form"
            onsubmit={onGameSubmit}
        >
            <header class="game-form__header">
                <h2>Create a game</h2>
                <p>Add a new game to the catalogue.</p>
            </header>

            <div class="game-form__field">
                <label for="game-title">Title</label>
                <input
                    id="game-title"
                    name="title"
                    type="text"
                    autocomplete="off"
                    required
                    bind:value={title}
                    oninput={() => (formInvalid = false)}
                />
            </div>

            <div class="game-form__field">
                <label for="game-genre">Genre</label>
                <select
                    id="game-genre"
                    name="genre"
                    required
                    bind:value={genre}
                    oninput={() => (formInvalid = false)}
                >
                    <option value={undefined}>Choose a genre</option>
                    {#each Object.values(Genre) as genreOption}
                        <option value={genreOption}>{genreOption}</option>
                    {/each}
                </select>
            </div>

            <div class="game-form__field">
                <label for="game-platform">Platform</label>
                <select
                    id="game-platform"
                    name="platform"
                    required
                    bind:value={platform}
                    oninput={() => (formInvalid = false)}
                >
                    <option value={undefined}>Choose a platform</option>
                    {#each Object.values(Platform) as platformOption}
                        <option value={platformOption}>{platformOption}</option>
                    {/each}
                </select>
            </div>

            <div class="game-form__field">
                <label for="game-description">Description</label>
                <textarea
                    id="game-description"
                    name="description"
                    rows="7"
                    required
                    bind:value={description}
                    oninput={() => (formInvalid = false)}
                ></textarea>
            </div>

            <div class="game-form__field">
                <label for="game-release-year">Release year</label>
                <input
                    id="game-release-year"
                    name="releaseYear"
                    type="number"
                    min="1970"
                    max={new Date().getFullYear()}
                    inputmode="numeric"
                    required
                    bind:value={releaseYear}
                    oninput={() => (formInvalid = false)}
                />
            </div>

            <Button
                semantic="success"
                label="Create game"
                buttonType="submit"
                fullWidth
            />
        </form>
    </div>
</main>

<style>
    .game-info {
        background-color: var(--color-surface);
    }

    .game-form {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        background-color: var(--color-surface);
    }

    .game-form__header {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-divider);
    }

    .game-form__header h2 {
        color: var(--color-primary);
        font-size: 1.5rem;
        line-height: 1.25;
    }

    .game-form__header p {
        margin-top: 0.5rem;
        color: var(--color-text-muted);
        line-height: 1.5;
    }

    .game-form__field {
        display: grid;
        gap: 0.4rem;
        margin-bottom: 1.25rem;
    }

    label {
        color: var(--color-text);
        font-size: 0.875rem;
        font-weight: 700;
    }

    input,
    textarea,
    select {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--color-border);
        background-color: var(--color-background);
        color: var(--color-text);
        font: inherit;
        transition:
            background-color 150ms ease-in-out,
            border-color 150ms ease-in-out;
    }

    textarea {
        resize: vertical;
        line-height: 1.5;
    }

    input:hover,
    textarea:hover,
    select:hover {
        border-color: var(--color-text-muted);
        background-color: var(--color-surface);
    }

    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }
</style>
