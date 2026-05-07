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
            --vip-form-delay-after-envelope: 1s;
            --vip-form-fade-duration: 450ms;
          "
        >
          <div class="vip__card-column">
            <div class="vip__card-stack">
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
            </div>

            <div class="vip__form">
              <div class="klaviyo-form-RXCRDS"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>


<style>
.vip {
  box-sizing: border-box;
  background: rgba(223, 217, 201, 1);
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
  justify-content: flex-start;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  bottom: -3rem;
  position: relative;
  padding-bottom: clamp(1rem, 4vh, 2.5rem);
}

.vip__card-column {
  position: relative;
  z-index: 1;
  width: min(80vw, 640px);
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* Card static; envelope rises then fades (absolute so Klaviyo never reflows it) */
.vip__card-stack {
  position: relative;
  width: 100%;
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
}

.vip-card__img {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 0;
}

/* Overlaps card only; out of document flow so form height cannot shift it */
.vip__envelope,
.vip_envelope {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: clamp(2.25rem, 18%, 6.5rem);
  width: min(100vw, 760px);
  max-width: none;
  transform: translateX(-50%);
  margin: 0;
  pointer-events: none;
  filter: drop-shadow(0 -4px 24px rgba(0, 0, 0, 0.25));
  line-height: 0;
  will-change: opacity, transform;
  opacity: 1;
  animation:
    vip-envelope-rise var(--vip-reveal-duration, 1600ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
    vip-envelope-fade var(--vip-reveal-duration, 1600ms) ease-out forwards;
}

.vip__envelope-img {
  display: block;
  width: 100%;
  height: auto;
}

.vip__form {
  width: 100%;
  align-self: stretch;
  margin-top: 50px;
  position: relative;
  z-index: 1;
  min-height: 10rem;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  animation: vip-form-reveal var(--vip-form-fade-duration, 450ms) ease forwards;
  animation-delay: calc(
    var(--vip-reveal-duration, 1600ms) + var(--vip-form-delay-after-envelope, 1s)
  );
}

@keyframes vip-form-reveal {
  from {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  to {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}

@keyframes vip-envelope-rise {
  from {
    transform: translateX(-50%)
      translate3d(0, calc(-1 * var(--vip-card-start-y, 165px)), 0);
  }
  to {
    transform: translateX(-50%) translate3d(0, 0, 0);
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

/* Klaviyo embed — match La Isla typography & VIP page palette */
.vip__form :global(.klaviyo-form-RXCRDS),
.vip__form :global(form.klaviyo-form),
.vip__form :global(form[data-testid="klaviyo-form-RXCRDS"]) {
  display: flex !important;
  flex-direction: column !important;
  flex-wrap: nowrap !important;
  align-items: stretch !important;
  gap: var(--level3, 1rem) !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  border-radius: 2px !important;
  background-color: transparent !important;
  background: transparent !important;
  color: #3a3a38 !important;
  font-family: var(--primary-font-family) !important;
  font-size: var(--normal, 1rem) !important;
  line-height: var(--line-height-double, 1.5) !important;
  overflow: visible !important;
}

.vip__form :global(form.klaviyo-form h1),
.vip__form :global(form.klaviyo-form h2),
.vip__form :global(form.klaviyo-form h3),
.vip__form :global(form.klaviyo-form h4),
.vip__form :global(form.klaviyo-form [id^="rich-text"] h3) {
  font-family: var(--font-isla-00260) !important;
  font-weight: 500 !important;
  font-size: clamp(0.75rem, 2.4vw, 0.95rem) !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  color: #2c2c2a !important;
  margin: 0 0 var(--level2, 0.75rem) !important;
  line-height: var(--line-height, 1.25) !important;
}

.vip__form :global(form.klaviyo-form [id^="rich-text"] strong) {
  font-family: var(--font-isla-00260) !important;
  font-weight: 500 !important;
  font-size: clamp(0.75rem, 2.4vw, 0.95rem) !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  color: rgba(73, 109, 182, 1) !important;
  margin: 0 0 var(--level2, 0.75rem) !important;
  line-height: var(--line-height, 1.25) !important;
}

.vip__form :global(form.klaviyo-form label),
.vip__form :global(form.klaviyo-form .klaviyo-field-label) {
  font-family: var(--secondary-font-family) !important;
  font-size: var(--micro, 0.9rem) !important;
  letter-spacing: 0.04em !important;
  color: #4a4a46 !important;
  text-transform: none !important;
}

.vip__form :global(form.klaviyo-form input[type="checkbox"]),
.vip__form :global(form.klaviyo-form input[type="radio"]) {
  width: auto !important;
  max-width: none !important;
  margin: 0 0.5rem 0 0 !important;
  accent-color: var(--accent-color, #b75656) !important;
}

.vip__form :global(form.klaviyo-form input[type="email"]),
.vip__form :global(form.klaviyo-form input[type="text"]),
.vip__form :global(form.klaviyo-form input[type="tel"]),
.vip__form :global(form.klaviyo-form textarea),
.vip__form :global(form.klaviyo-form select) {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  margin: 0.35rem 0 0 !important;
  padding: var(--level3, 1rem) var(--level4, 1.5rem) !important;
  font-family: var(--secondary-font-family) !important;
  font-size: var(--normal, 1rem) !important;
  color: #2c2c2a !important;
  background-color: rgba(255, 255, 255, 0.72) !important;
  border: 1px solid rgba(44, 44, 42, 0.18) !important;
  border-radius: 2px !important;
  box-shadow: none !important;
  outline: none !important;
  transition: border-color var(--duration-default, 200ms) var(--primary-easing, ease),
    background-color var(--duration-default, 200ms) var(--primary-easing, ease) !important;
}

.vip__form :global(form.klaviyo-form input:focus),
.vip__form :global(form.klaviyo-form textarea:focus),
.vip__form :global(form.klaviyo-form select:focus) {
  border-color: var(--accent-color, #b75656) !important;
  background-color: #fff !important;
}

.vip__form :global(form.klaviyo-form input::placeholder),
.vip__form :global(form.klaviyo-form textarea::placeholder) {
  color: #888 !important;
  opacity: 1 !important;
}

.vip__form :global(form.klaviyo-form button[type="submit"]),
.vip__form :global(form.klaviyo-form button.klaviyo-form-button[type="submit"]),
.vip__form :global(form.klaviyo-form [type="submit"]) {
  width: 100% !important;
  margin-top: var(--level4, 1.5rem) !important;
  padding: var(--level4, 1.5rem) var(--level5, 2rem) !important;
  font-family: var(--font-isla-00260) !important;
  font-size: clamp(0.7rem, 2vw, 0.85rem) !important;
  font-weight: 500 !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  color: #fff !important;
  background-color: rgba(74, 110, 183, 1) !important;
  border: none !important;
  border-radius: 2px !important;
  cursor: pointer !important;
  box-shadow: 0 8px 24px rgba(74, 110, 183, 0.32) !important;
}

.vip__form :global(form.klaviyo-form button.klaviyo-form-button[type="button"]) {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  padding-left: var(--level5, 2rem) !important;
  padding-right: var(--level5, 2rem) !important;
  height: auto !important;
  min-height: 0 !important;
  box-sizing: border-box !important;
}

.vip__form :global(form.klaviyo-form button[type="submit"]:hover),
.vip__form :global(form.klaviyo-form button.klaviyo-form-button[type="submit"]:hover) {
  filter: brightness(1.05) !important;
}

.vip__form :global(form.klaviyo-form button.klaviyo-form-button[type="button"]:hover) {
  filter: brightness(1.05) !important;
}

.vip__form :global(form.klaviyo-form a) {
  color: var(--accent-color, #b75656) !important;
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
}

.vip__form :global(form.klaviyo-form p),
.vip__form :global(form.klaviyo-form .ql-editor) {
  font-family: var(--primary-font-family) !important;
  color: #4a4a46 !important;
  font-size: var(--micro, 0.9rem) !important;
  margin: 0 0 var(--level2, 0.75rem) !important;
}

.vip__form :global(form.klaviyo-form .needsclick) {
  font-family: inherit !important;
}

@media (prefers-reduced-motion: reduce) {
  .vip__envelope,
  .vip_envelope {
    animation: none !important;
  }

  .vip__envelope,
  .vip_envelope {
    opacity: 0 !important;
    transform: translateX(-50%) translate3d(0, 0, 0) !important;
  }

  .vip__form {
    animation: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }
}
</style>
