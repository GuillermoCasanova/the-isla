<script>
// @ts-nocheck

import Nav from "../components/header.svelte";
import SvgGraphics from "../components/svg-graphics.svelte";
import Footer from "../components/footer.svelte";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import { fade } from "svelte/transition";
import { cubicIn } from "svelte/easing";
import { cubicOut } from "svelte/easing";
import { page } from "$app/stores";

export let data;

let ready = true;

$: loading = false;
$: pathName = $page.url.pathname;

afterNavigate((navigation) => {
  loading = false;
});

beforeNavigate(() => {
  loading = true;
});
</script>

{#if loading}
  <!-- <div
    class="loading-screen"
    in:fade={{ duration: 500, easing: cubicIn }}
    out:fade={{ duration: 600, easing: cubicIn }}
  /> -->
{/if}

{#if loading}
  <div
    class="loading-screenx"
    in:fade={{ duration: 300, easing: cubicIn }}
    out:fade={{ duration: 350, easing: cubicOut }}
  />
{/if}

<main data-sveltekit-prefetch>
  <slot />
</main>

<style>
@import "../styles/base.css";
@import "../styles/grid.css";

</style>
