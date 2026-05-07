<script>
import cardImg from "$lib/assets/Card.png";
import envelopeImg from "$lib/assets/envelope.png";

const backgroundVideoSrc =
  "https://public-assets.content-platform.envatousercontent.com/4c480208-1b25-4c61-b568-61746f5b908f/7e7c95f4-ba97-4589-aed4-e37f9f47392d/4c480208-1b25-4c61-b568-61746f5b908f/preview_540p_crf22_higher_quality.mp4";

let rootEl;

function vipRoot() {
  return rootEl ?? document.getElementById("vip-page");
}

</script>

<svelte:head>
  <title>VIP — La Isla Fashion Show</title>
  <meta name="description" content="La Isla Fashion Show — invitación VIP." />
</svelte:head>

<div class="vip" id="vip-page" bind:this={rootEl}>
  <div class="vip__hero">
    <div class="vip__hero-inner">
      <section class="vip-reveal" aria-label="Invitación VIP">
        <header class="vip__header">
          <span class="vip__header-left">LA ISLA FASHION SHOW</span>
          <span class="vip__header-right">06.28.26</span>
        </header>

        <div
          class="vip__stage"
          style="
            --vip-card-start-y: 165px;
            --vip-reveal-duration: 1600ms;
          "
        >
          <div class="vip__card-column">
            <article
              class="vip-card"
            >
              <h1 class="visually-hidden">
                Invitación VIP — La Isla Fashion Show
              </h1>
              <img
                class="vip-card__img"
                src={cardImg}
                alt="Invitación VIP para La Isla Fashion Show"
                width="1215"
                height="811"
              />
            </article>
          </div>

          <div
            class="vip__envelope vip_envelope"
            aria-hidden="true"
          >
            <img
              class="vip__envelope-img"
              src={envelopeImg}
              alt=""
              width="1322"
              height="751"
            />
          </div>

          <div class="vip__form" style="height: 10rem">
            <div class="klaviyo-form-RXCRDS"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>


<style>
.vip {
  box-sizing: border-box;
  background: rgb(0, 0, 0);
  color: #a8b4c4;
}

.vip__hero {
  position: relative;
  box-sizing: border-box;
  min-height: 100svh;
}

.vip__header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
.home__video {
  inset: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  z-index: -1;
  top: 0;
  z-index: 0;
  position: sticky;
  pointer-events: none;
  filter: grayscale(1) brightness(0.1);
}

.visually-hidden {
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

.vip__hero-inner {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: 1rem clamp(1rem, 4vw, 2rem) clamp(1.5rem, 4vh, 2.5rem);
}

.vip-reveal {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
}

.vip__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  font-size: clamp(0.68rem, 1.2vw, 0.9rem);
  letter-spacing: 0.06em;
  font-family: var(--font-isla-00260);
  font-weight: 500;
  text-transform: uppercase;
  flex-shrink: 0;
}

.vip__header-right {
  white-space: nowrap;
}

.vip__stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  bottom: -3rem;
  position: relative;
  padding-top: clamp(0.5rem, 3vh, 2rem);
}

.vip__card-column {
  position: relative;
  z-index: 1;
  width: min(80vw, 640px);
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vip-card {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  overflow: visible;
  border-radius: 2px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  line-height: 0;
  will-change: transform;
  transform: translate3d(0, var(--vip-card-start-y, 165px), 0);
  animation: vip-card-rise var(--vip-reveal-duration, 1600ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.vip-card__img {
  display: block;
  width: 100%;
  height: auto;
}

/* In flow, overlapping the card — only .vip-card gets a GSAP y transform */
.vip__envelope,
.vip_envelope {
  position: relative;
  z-index: 2;
  width: min(100vw, 760px);
  max-width: 100%;
  margin: clamp(-7.5rem, -18vw, -3.5rem) 0 0;
  pointer-events: none;
  filter: drop-shadow(0 -4px 24px rgba(0, 0, 0, 0.25));
  line-height: 0;
  will-change: opacity;
  opacity: 1;
  animation: vip-envelope-fade var(--vip-reveal-duration, 1600ms) ease-out forwards;
}

.vip__envelope-img {
  display: block;
  width: 100%;
  height: auto;
}

.vip__form {
  width: min(92vw, 640px);
  margin-top: clamp(1.25rem, 4vh, 2.5rem);
  z-index: 3;
}

@keyframes vip-card-rise {
  from {
    transform: translate3d(0, var(--vip-card-start-y, 165px), 0);
  }
  to {
    transform: translate3d(0, 0px, 0);
  }
}

@keyframes vip-envelope-fade {
  0% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vip-card,
  .vip__envelope,
  .vip_envelope {
    animation: none !important;
  }

  .vip-card {
    transform: translate3d(0, 0px, 0) !important;
  }

  .vip__envelope,
  .vip_envelope {
    opacity: 0 !important;
  }
}
</style>
