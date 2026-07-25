<script lang="ts">
  export let name: 'game' | 'review' | 'user';
</script>

<svg aria-hidden="true" focusable="false">
  <use href={`/icons.svg#${name}-icon`}></use>
</svg>

<style>
  svg {
    display: inline-block;
    width: 2em;
    height: 2em;
    vertical-align: -0.125em;
  }
</style>
