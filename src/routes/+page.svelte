<script>
import { page } from "$app/stores";
import ArtistasModal from "../components/artistas-modal.svelte";
import ItinerarioModal from "../components/itinerario-modal.svelte";

import homepageLogo from "$lib/assets/homepage-logo.png";
import datesFw26 from "$lib/assets/dates-fw26.webp";

/** Switch to `"video"` to restore the looping hero clip. */
const HERO_BACKGROUND_TYPE = "image";

const backgroundImageSrc = "/home-hero.png";
/** Local hero loop (from Clips/IMG_4755.MOV, transcoded to H.264 for browsers). */
const backgroundVideoSrc = "/home-hero.mp4";

const description =
  "La Isla Fashion Show en La Parguera Plaza Hotel, del 26 al 28 de junio. Moda local e internacional, música en vivo, galería, arte y pop-ups. Cultura y creatividad caribeña en un solo lugar";
const ogTitle = "La Isla Fashion Show";

/** Set true when the December event restores Artistas / Itinerario */
const SHOW_EVENT_NAV = false;

let artistasModal;
let artistasOpen = false;
let itinerarioModal;
let itinerarioOpen = false;

$: canonicalUrl = `${$page.url.origin}${$page.url.pathname}`;
$: ogImageUrl = `${$page.url.origin}/og_image.png`;

async function openArtistas(event) {
  artistasOpen = true;
  await artistasModal?.open(event.currentTarget);
}

async function openItinerario(event) {
  itinerarioOpen = true;
  await itinerarioModal?.open(event.currentTarget);
}
</script>

<svelte:head>
  <title>{ogTitle}</title>
  <meta name="description" content={description} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={ogImageUrl} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={ogTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<div class="home">
  <section class="home__hero" aria-label="Introducción">
    {#if HERO_BACKGROUND_TYPE === "video"}
      <video
        class="home__background home__background--video"
        src={backgroundVideoSrc}
        autoplay
        muted
        loop
        playsinline
        aria-hidden="true"
      ></video>
    {:else}
      <img
        class="home__background home__background--image"
        src={backgroundImageSrc}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchpriority="high"
      />
    {/if}
    <div class="home__content">
      <div class="home__brand">
        <div class="home__logo-wrap">
          <img
            class="home__logo"
            src={homepageLogo}
            alt="La Isla Fashion Show"
            width="610"
            height="466"
            decoding="async"
            fetchpriority="high"
          />

          {#if !SHOW_EVENT_NAV}
            <img
              class="home__dates"
              src={datesFw26}
              alt=""
              width="93"
              height="38"
              decoding="async"
              aria-hidden="true"
            />
          {/if}
        </div>

        {#if SHOW_EVENT_NAV}
          <div class="home__brand-actions">
            <button
              type="button"
              class="home-nav-trigger home-nav-trigger--label"
              aria-haspopup="dialog"
              aria-expanded={artistasOpen}
              on:click={openArtistas}
            >
              Artistas
            </button>

            <button
              type="button"
              class="home-nav-trigger home-nav-trigger--label"
              aria-haspopup="dialog"
              aria-expanded={itinerarioOpen}
              on:click={openItinerario}
            >
              Itinerario
            </button>
          </div>
        {/if}
      </div>
    </div>
  </section>
</div>

{#if SHOW_EVENT_NAV}
  <ArtistasModal bind:this={artistasModal} bind:isOpen={artistasOpen} />

  <ItinerarioModal
    bind:this={itinerarioModal}
    bind:isOpen={itinerarioOpen}
  />
{/if}

<style>
.home {
  position: relative;
  min-height: 100svh;
  box-sizing: border-box;
  overflow: hidden;
}

.home__hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
}

.home__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  pointer-events: none;
  background: transparent;
}

.home__background--video {
  object-position: center top;
  opacity: 0.4;
  filter: grayscale(0.5) brightness(0.95) contrast(1.05);
}

.home__background--image {
  opacity: 1;
}

.home__hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.35);
}

.home__content {
  position: relative;
  z-index: 2;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-sizing: border-box;
}

.home__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.75rem, 5vh, 2.75rem);
}

.home__logo-wrap {
  position: relative;
  display: block;
  width: fit-content;
  max-width: 100%;
  flex-shrink: 0;
}

.home__brand-actions {
  --nav-trigger-size: clamp(0.85rem, 2.5vw, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1.25rem, 4vw, 2rem);
}

.home-nav-trigger {
  position: relative;
  font-family: var(--font-isla-00260);
  font-size: var(--nav-trigger-size);
  line-height: 1;
  color: #4a6eb7;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: color 0.25s ease;
}

.home-nav-trigger--label {
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home-nav-trigger::after {
  content: "";
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.15em;
  height: 2px;
  background-color: rgba(55, 68, 85, 1);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.22s ease;
}

.home-nav-trigger:hover,
.home-nav-trigger:focus-visible {
  color: rgba(55, 68, 85, 1);
  outline: none;
}

.home-nav-trigger:hover::after,
.home-nav-trigger:focus-visible::after {
  transform: scaleX(1);
}

.home__logo {
  width: min(66vw, 21rem);
  max-width: 100%;
  height: auto;
  max-height: min(37.5vh, 16.5rem);
  display: block;
  flex-shrink: 0;
  object-fit: contain;
  filter: drop-shadow(0 2px 24px rgba(0, 0, 0, 0.3));
}

.home__dates {
  position: absolute;
  left: 78%;
  top: -7%;
  width: min(18vw, 5.75rem, 30%);
  height: auto;
  margin: 0;
  object-fit: contain;
  transform: translate(-7%, -63%) rotate(2deg);
  transform-origin: 20% 100%;
  filter: drop-shadow(0 2px 16px rgba(0, 0, 0, 0.2));
  pointer-events: none;
}

@media screen and (min-width: 768px) {
  .home__logo {
    width: min(54vw, 25.5rem);
    max-height: min(41.25vh, 19.5rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home__background--video {
    display: none;
  }

  .home-nav-trigger::after {
    transition: none;
  }

  .home-nav-trigger:hover::after,
  .home-nav-trigger:focus-visible::after {
    transform: scaleX(1);
  }
}
</style>
