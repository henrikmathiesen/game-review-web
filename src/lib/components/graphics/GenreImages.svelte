<script lang="ts">
    import { Genre } from "../../enums";

    export let genre: Genre;

    const imgUrl01 = `/genres/${genre.toLowerCase()}-01.png`;
    const imgUrl02 = `/genres/${genre.toLowerCase()}-02.png`;
</script>

<div class="row">
    <div class="col-12 col-md-6 image-col">
        <img src={imgUrl01} alt={`An image of ${genre.toLowerCase()}`} />
    </div>
    <div class="col-12 col-md-6 image-col">
        <img src={imgUrl02} alt={`Another image of ${genre.toLowerCase()}`} />
    </div>
</div>

<style>
    .image-col {
        display: flex;
        justify-content: center;
    }

    img {
        display: block;
        width: 100%;
        max-width: 476px;
        height: auto;
    }
</style>
