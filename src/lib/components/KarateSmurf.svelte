<div class="karate-smurf" aria-hidden="true">
    <div class="karate-smurf__image"></div>
</div>

<style>
    .karate-smurf {
        display: none;
        justify-content: center;
        width: 100%;
    }

    .karate-smurf__image {
        width: min(100%, 20rem);
        aspect-ratio: 1 / 1;
    }

    @media (min-width: 1024px) {
        .karate-smurf {
            display: flex;
        }

        .karate-smurf__image {
            background-image: url('/karate-smurf.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
</style>
