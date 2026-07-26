<div class="alien-ninja" aria-hidden="true">
    <div class="alien-ninja__image"></div>
</div>

<style>
    .alien-ninja {
        display: none;
        justify-content: center;
        width: 100%;
    }

    .alien-ninja__image {
        width: min(100%, 25rem);
        aspect-ratio: 4 / 9;
    }

    @media (min-width: 1024px) {
        .alien-ninja {
            display: flex;
        }

        .alien-ninja__image {
            background-image: url('/alien-ninja.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
</style>
