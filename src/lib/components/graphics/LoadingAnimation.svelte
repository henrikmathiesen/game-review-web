<script>
  export let aspectRatio = "16 / 9";
  export let columns = 12;
  export let rows = 8;
  export let duration = 3.6;

  $: rectangles = Array.from(
    { length: columns * rows },
    (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;

      const centerX = (columns - 1) / 2;
      const centerY = (rows - 1) / 2;

      const distance = Math.hypot(
        column - centerX,
        row - centerY
      );

      return {
        delay: Math.round(
          distance * 2.2 +
          row * 0.7 +
          column * 0.35
        ),
        shade: (index * 7 + row * 3) % 4
      };
    }
  );
</script>

<div
  class="loading-animation-image-loader"
  aria-label="Bild genereras"
  style:aspect-ratio={aspectRatio}
  style:--loading-animation-columns={columns}
  style:--loading-animation-rows={rows}
  style:--loading-animation-duration={`${duration}s`}
>
  <div
    class="loading-animation-rectangle-grid"
    aria-hidden="true"
  >
    {#each rectangles as rectangle}
      <span
        class="loading-animation-rectangle"
        style:--loading-animation-delay={rectangle.delay}
        style:--loading-animation-shade={rectangle.shade}
      ></span>
    {/each}
  </div>
</div>

<style>
    .loading-animation-image-loader {
      width: 100%;
      overflow: hidden;
      background:var(--color-background);
    }

    .loading-animation-rectangle-grid {
      height: 88%;
      margin: 3%;

      display: grid;
      grid-template-columns:
        repeat(
          var(--loading-animation-columns),
          minmax(0, 1fr)
        );
      grid-template-rows:
        repeat(
          var(--loading-animation-rows),
          minmax(0, 1fr)
        );

      gap: clamp(3px, 1.1vw, 11px);
    }

    .loading-animation-rectangle {
      align-self: center;
      width: 100%;
      aspect-ratio: 1.55 / 1;
      border-radius: clamp(2px, 0.5vw, 5px);

      background: rgb(210 210 210);
      opacity: 0.04;
      transform: scale(0.76);

      animation:
        loading-animation-rectangle-fade
        var(--loading-animation-duration)
        ease-in-out
        infinite;

      animation-delay:
        calc(var(--loading-animation-delay) * -160ms);

      will-change: opacity, transform;
    }

    @keyframes loading-animation-rectangle-fade {
      0%,
      68%,
      100% {
        opacity: 0.04;
        transform: scale(0.76);
      }

      32% {
        opacity:
          calc(
            0.24 +
            var(--loading-animation-shade) * 0.06
          );

        transform: scale(1);
      }

      46% {
        opacity:
          calc(
            0.12 +
            var(--loading-animation-shade) * 0.035
          );

        transform: scale(0.9);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .loading-animation-rectangle {
        animation: none;

        opacity:
          calc(
            0.12 +
            var(--loading-animation-shade) * 0.035
          );

        transform: none;
      }
    }
</style>

<!--

USAGE

<script>
  import LoadingAnimation from "./LoadingAnimation.svelte";
</script>

16:9
<LoadingAnimation />

4:3
<LoadingAnimation aspectRatio="4 / 3" />

Anpassad täthet och hastighet
<LoadingAnimation
  aspectRatio="16 / 9"
  columns={14}
  rows={8}
  duration={4.2}
/>

-->
