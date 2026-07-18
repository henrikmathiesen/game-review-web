<script lang="ts">
    import { truncateWords } from '../../utils';

    let text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores aspernatur culpa debitis deserunt doloremque eaque esse eveniet hic illum, nihil quia sequi totam, vitae voluptatem. Eos iure nulla vel!';
    text = truncateWords(text, 25);
</script>

<article class="news-item">
    <h2 id="new-item-header">Lorem Ipsum</h2>
    <p class="news-item__text">
        { text }
    </p>
    <p class="news-item__link">
        <a href="https://svelte.dev/" target="_blank" aria-labelledby="new-item-header">
            Read more
            <span aria-hidden="true">&rarr;</span>
        </a>
    </p>
</article>

<style>
    .news-item {
        padding: 1rem;
        background-color: var(--color-surface);
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p.news-item__text {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    p.news-item__link {
        text-align: right;
    }

    a {
        color: var(--color-link);
    }

    a:hover {
        color: var(--color-link-hover);
    }
</style>