<script>
import { browser } from "$app/environment";
import { trapFocus, removeTrapFocus } from "$lib/trapFocus";
import { onDestroy, onMount, tick } from "svelte";

const MOBILE_QUERY = "(max-width: 899px)";

const schedules = [
  {
    desktopSrc: "/itinerario/jun-26.png",
    mobileSrc: "/itinerario/jun-26-mobile.png",
    alt: "Itinerario La Isla Fashion Show — 26 de junio, viernes",
  },
  {
    desktopSrc: "/itinerario/jun-27.png",
    mobileSrc: "/itinerario/jun-27-mobile.png",
    alt: "Itinerario La Isla Fashion Show — 27 de junio, sábado",
  },
  {
    desktopSrc: "/itinerario/jun-28.png",
    mobileSrc: "/itinerario/jun-28-mobile.png",
    alt: "Itinerario La Isla Fashion Show — 28 de junio, domingo",
  },
];

export let isOpen = false;

let overlayEl;
let triggerEl;
let closeEl;
let contentEl;
let currentIndex = 0;
let isMobile = false;
let mobileQuery;

function syncViewport() {
  if (!browser) return;

  if (!mobileQuery) {
    mobileQuery = window.matchMedia(MOBILE_QUERY);
  }

  isMobile = mobileQuery.matches;
}

onMount(() => {
  if (!browser) return;

  mobileQuery = window.matchMedia(MOBILE_QUERY);
  syncViewport();
  mobileQuery.addEventListener("change", syncViewport);

  return () => {
    mobileQuery.removeEventListener("change", syncViewport);
  };
});

export async function open(trigger = null) {
  if (!browser) return;

  syncViewport();
  triggerEl = trigger;
  isOpen = true;
  document.body.style.overflow = "hidden";

  await tick();
  await tick();
  currentIndex = 0;
  if (contentEl) {
    contentEl.scrollLeft = 0;
  }
  if (overlayEl && closeEl) {
    try {
      trapFocus(overlayEl, closeEl);
    } catch {
      /* focus trap is non-critical */
    }
  }
}

export function close() {
  isOpen = false;

  if (!browser) return;

  document.body.style.overflow = "";
  removeTrapFocus(triggerEl);
}

function updateIndex() {
  if (!contentEl) return;
  const slideWidth = contentEl.clientWidth;
  if (slideWidth <= 0) return;
  currentIndex = Math.round(contentEl.scrollLeft / slideWidth);
}

function scrollToIndex(index) {
  if (!contentEl) return;
  contentEl.scrollTo({
    left: index * contentEl.clientWidth,
    behavior: "smooth",
  });
}

function goPrev() {
  scrollToIndex(Math.max(0, currentIndex - 1));
}

function goNext() {
  scrollToIndex(Math.min(schedules.length - 1, currentIndex + 1));
}

function handleKeydown(event) {
  if (!isOpen) return;

  if (event.key === "Escape") {
    close();
    return;
  }

  if (!isMobile) return;

  if (event.key === "ArrowLeft") {
    goPrev();
  } else if (event.key === "ArrowRight") {
    goNext();
  }
}

onDestroy(() => {
  if (!browser) return;

  document.body.style.overflow = "";
  removeTrapFocus();
});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div
    bind:this={overlayEl}
    class="itinerario-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="itinerario-modal-title"
  >
    <button
      type="button"
      class="itinerario-overlay__backdrop"
      aria-label="Cerrar itinerario"
      tabindex="-1"
      on:click={close}
    />

    <div class="itinerario-overlay__panel">
      <header class="itinerario-overlay__header">
        <h2 id="itinerario-modal-title" class="itinerario-overlay__title">
          Itinerario
        </h2>
        <button
          bind:this={closeEl}
          type="button"
          class="itinerario-overlay__close"
          aria-label="Cerrar itinerario"
          on:click={close}
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <nav class="itinerario-nav" aria-label="Navegar días del itinerario">
        {#if currentIndex > 0}
          <button
            type="button"
            class="itinerario-nav__btn itinerario-nav__btn--prev"
            aria-label="Día anterior"
            on:click={goPrev}
          >
            <span
              class="itinerario-nav__icon itinerario-nav__icon--left"
              aria-hidden="true"
            />
          </button>
        {/if}

        {#if currentIndex < schedules.length - 1}
          <button
            type="button"
            class="itinerario-nav__btn itinerario-nav__btn--next"
            aria-label="Día siguiente"
            on:click={goNext}
          >
            <span
              class="itinerario-nav__icon itinerario-nav__icon--right"
              aria-hidden="true"
            />
          </button>
        {/if}
      </nav>

      <div
        bind:this={contentEl}
        class="itinerario-overlay__content"
        on:scroll={updateIndex}
      >
        {#each schedules as schedule}
          <figure class="itinerario-overlay__day">
            <img
              class="itinerario-overlay__img"
              src={isMobile ? schedule.mobileSrc : schedule.desktopSrc}
              alt={schedule.alt}
              decoding="async"
            />
          </figure>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
.itinerario-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vh, 2rem) 1rem;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.72);
  overflow: hidden;
}

.itinerario-overlay__backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.itinerario-overlay__panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: min(98vw, 82rem);
  max-height: 96svh;
  background: transparent;
  box-sizing: border-box;
  pointer-events: auto;
  overflow: hidden;
}

.itinerario-overlay__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.itinerario-overlay__title {
  font-family: var(--font-isla-00260);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4a6eb7;
  font-weight: 500;
}

.itinerario-overlay__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #4a6eb7;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
}

.itinerario-overlay__close:hover,
.itinerario-overlay__close:focus-visible {
  color: rgba(55, 68, 85, 1);
  outline: none;
}

.itinerario-nav {
  display: none;
}

.itinerario-overlay__content {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  max-height: calc(96svh - 3rem);
  overflow-x: auto;
  overflow-y: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 0.5rem;
  padding: 0 0.5rem 1rem;
  -webkit-overflow-scrolling: touch;
}

.itinerario-overlay__day {
  flex: 0 0 auto;
  width: min(85vw, 20rem);
  margin: 0;
  scroll-snap-align: center;
}

.itinerario-overlay__img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
}

@media screen and (max-width: 899px) {
  .itinerario-overlay {
    display: block;
    padding: 0;
    background: #fff;
  }

  .itinerario-overlay__backdrop {
    display: none;
  }

  .itinerario-overlay__panel {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    max-height: none;
    overflow: hidden;
    background: #fff;
  }

  .itinerario-overlay__header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 4;
    justify-content: flex-end;
    padding: 1rem;
    pointer-events: none;
  }

  .itinerario-overlay__title {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .itinerario-overlay__close {
    pointer-events: auto;
    font-size: 2rem;
  }

  .itinerario-nav {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  .itinerario-nav__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
  }

  .itinerario-nav__btn--prev {
    left: clamp(0.25rem, 2vw, 0.75rem);
  }

  .itinerario-nav__btn--next {
    right: clamp(0.25rem, 2vw, 0.75rem);
  }

  .itinerario-nav__btn:focus-visible {
    outline: none;
  }

  .itinerario-nav__icon {
    display: block;
    width: 1.75rem;
    height: 1.75rem;
    background-color: #4a6eb7;
    transition: background-color 0.25s ease;
    -webkit-mask: center / contain no-repeat;
    mask: center / contain no-repeat;
  }

  .itinerario-nav__icon--left {
    -webkit-mask-image: url("/itinerario/arrow-left.png");
    mask-image: url("/itinerario/arrow-left.png");
  }

  .itinerario-nav__icon--right {
    -webkit-mask-image: url("/itinerario/arrow-right.png");
    mask-image: url("/itinerario/arrow-right.png");
  }

  .itinerario-nav__btn:hover .itinerario-nav__icon,
  .itinerario-nav__btn:focus-visible .itinerario-nav__icon,
  .itinerario-nav__btn:active .itinerario-nav__icon {
    background-color: rgba(55, 68, 85, 1);
  }

  .itinerario-overlay__content {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    max-height: none;
    gap: 0;
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 0;
  }

  .itinerario-overlay__day {
    flex: 0 0 100%;
    width: 100%;
    min-width: 100%;
    height: 100svh;
    min-height: 100svh;
    scroll-snap-align: start;
    margin: 0;
    background: #fff;
  }

  .itinerario-overlay__img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center top;
  }
}

@media screen and (min-width: 900px) {
  .itinerario-overlay {
    padding: clamp(1rem, 3vh, 1.5rem) 0.75rem;
  }

  .itinerario-overlay__panel {
    position: relative;
    width: min(98vw, 92rem);
    max-height: 96svh;
    background: transparent;
    overflow: visible;
  }

  .itinerario-overlay__header {
    padding: 0 0.25rem 0.75rem;
  }

  .itinerario-overlay__title {
    color: #fff;
  }

  .itinerario-overlay__close {
    color: #fff;
    transition: color 0.25s ease;
  }

  .itinerario-overlay__close:hover,
  .itinerario-overlay__close:focus-visible {
    color: #4a6eb7;
    outline: none;
  }

  .itinerario-overlay__content {
    position: static;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.5rem, 1.5vw, 1rem);
    overflow: hidden;
    align-items: stretch;
    height: calc(96svh - 3.25rem);
    max-height: calc(96svh - 3.25rem);
    padding: 0;
    scroll-snap-type: none;
  }

  .itinerario-overlay__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    min-height: 0;
    height: 100%;
    background: transparent;
    scroll-snap-align: unset;
  }

  .itinerario-overlay__img {
    display: block;
    width: auto;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center top;
    transform: none;
  }
}
</style>
