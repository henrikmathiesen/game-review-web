<script lang="ts">
    import { link } from "svelte-spa-router";

    type ButtonSemantic = "success" | "warning" | "danger";
    type ButtonType = "button" | "submit";

    export let semantic: ButtonSemantic;
    export let label: string;
    export let buttonType: ButtonType = "button";
    export let fullWidth = false;
    export let route: string | undefined = undefined;
    export let onButtonClick: (() => void) | undefined = undefined;
</script>

{#if route}
    <a
        href={route}
        use:link
        class={`button button--${semantic}`}
        class:button--full-width={fullWidth}
    >
        {label}
    </a>
{:else}
    <button
        class={`button button--${semantic}`}
        class:button--full-width={fullWidth}
        type={buttonType}
        onclick={onButtonClick}
    >
        {label}
    </button>
{/if}

<style>
    .button {
        /* Reset link styling when class is used on an a-tag */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        text-decoration: none;

        cursor: pointer;
        min-height: 2.75rem;
        padding: 0.625rem 1rem;
        border: 0;
        color: var(--color-primary-text);
        font: inherit;
        font-weight: 700;
        line-height: 1.2;
        text-transform: uppercase;
        transition:
            filter 150ms ease-in-out,
            transform 75ms ease-in-out;
    }

    .button--success {
        background-color: var(--color-success);
    }

    .button--warning {
        background-color: var(--color-warning);
    }

    .button--danger {
        background-color: var(--color-danger);
    }

    .button--full-width {
        width: 100%;
    }

    .button:hover {
        filter: brightness(0.9);
    }

    .button:active {
        transform: translateY(1px);
    }

    .button:focus-visible {
        outline: 3px solid var(--color-text);
        outline-offset: 2px;
    }
</style>
