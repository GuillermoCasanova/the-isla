<script>
import "../vip/vip-page.css";
import { onMount, tick } from "svelte";
import { page } from "$app/stores";
import { gsap } from "gsap";
import { waitForLoadingOverlayHidden } from "$lib/app-loading.js";
import cardImg from "$lib/assets/vip-card.webp";
import envelopeBackImg from "$lib/assets/WEB-ENVELOPE-BACK_fw26.webp";
import envelopeFrontImg from "$lib/assets/WEB-ENVELOPE-FRONT_fw26.webp";
import bgMobileVipInvite from "$lib/assets/bg-mobile-vip-invite.webp";

const backgroundVideoSrc =
  "https://public-assets.content-platform.envatousercontent.com/4c480208-1b25-4c61-b568-61746f5b908f/7e7c95f4-ba97-4589-aed4-e37f9f47392d/4c480208-1b25-4c61-b568-61746f5b908f/preview_540p_crf22_higher_quality.mp4";

const INTRO_DURATION = 0.85;
const ENVELOPE_EXIT_DURATION = 0.95;
const FORM_FADE_DURATION = 0.5;

let rootEl;
let cardEl;
let envelopeBackEl;
let envelopeFrontEl;
let formEl;

/** Keeps the scrollbar from appearing while envelopes animate (transform extends overflow). */
function lockIntroScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function unlockIntroScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

onMount(() => {
  let cancelled = false;
  /** @type {(() => void) | undefined} */
  let revertGsap;

  async function boot() {
    await tick();
    if (cancelled) return;

    let attempts = 0;
    while (
      attempts < 40 &&
      (!rootEl || !cardEl || !envelopeBackEl || !envelopeFrontEl || !formEl)
    ) {
      await new Promise((r) => requestAnimationFrame(r));
      attempts += 1;
      if (cancelled) return;
    }

    if (cancelled) return;

    const ctrl = prepareVipGsap();
    if (!ctrl) return;

    // Same moment as app-shell-ready / finish(): overlay has finished fading.
    await waitForLoadingOverlayHidden();
    if (cancelled) {
      ctrl.revert();
      return;
    }

    ctrl.playIntro();
    revertGsap = ctrl.revert;
  }

  void boot();

  return () => {
    cancelled = true;
    unlockIntroScroll();
    revertGsap?.();
  };

  /**
   * Phase 1 (under shell loader): gsap.set only — hidden behind #app-shell-loader.
   * Phase 2 (after waitForLoadingOverlayHidden): timeline plays — fires when shell dispatches app-shell-ready.
   */
  function prepareVipGsap() {
    const root = rootEl;
    const envelopeLayers = [envelopeBackEl, envelopeFrontEl];
    if (!root || !cardEl || !envelopeBackEl || !envelopeFrontEl || !formEl)
      return null;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      const ctx = gsap.context(() => {
        gsap.set(cardEl, { opacity: 1, scale: 1 });
        gsap.set(envelopeLayers, {
          opacity: 0,
          scale: 1,
          x: 0,
          xPercent: -50,
          yPercent: 0,
          pointerEvents: "none",
        });
        gsap.set(formEl, {
          visibility: "visible",
          pointerEvents: "auto",
        });
      }, root);
      return {
        playIntro() {},
        revert: () => ctx.revert(),
      };
    }

    const settleCtx = gsap.context(() => {
      gsap.set(formEl, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      gsap.set([cardEl, ...envelopeLayers], {
        opacity: 1,
        scale: 0.9,
        transformOrigin: "50% 50%",
      });

      // x: 0 discards GSAP's pixel read of the CSS translateX(-50%), which it
      // sometimes fails to detect as a percent at fractional widths and then doubles.
      gsap.set(envelopeLayers, {
        x: 0,
        xPercent: -50,
        yPercent: 0,
      });
    }, root);

    let playCtx;

    return {
      playIntro() {
        playCtx = gsap.context(() => {
          lockIntroScroll();

          const tl = gsap.timeline({
            defaults: { ease: "power2.Out" },
            onComplete: () => {
              unlockIntroScroll();
            },
          });

          tl.to([cardEl, ...envelopeLayers], {
            scale: 1,
            duration: INTRO_DURATION,
          });

          tl.to(envelopeLayers, {
            yPercent: 40,
            duration: ENVELOPE_EXIT_DURATION,
            ease: "power2.inOut",
          });
          tl.to(
            envelopeLayers,
            {
              opacity: 0,
              duration: ENVELOPE_EXIT_DURATION * 0.65,
              ease: "power2.inOut",
            },
            "-=0.7", // start opacity fade at the same time as yPercent or adjust timing if needed
          );

          // yPercent moves absolutely positioned envelopes in document flow, so the layout
          // can keep extra scroll height after fade. Remove from layout once the move ends.
          tl.set(
            envelopeLayers,
            {
              display: "none",
              yPercent: 0,
              clearProps: "transform",
            },
            INTRO_DURATION + ENVELOPE_EXIT_DURATION,
          );

          tl.to(
            formEl,
            {
              autoAlpha: 1,
              pointerEvents: "auto",
              duration: FORM_FADE_DURATION,
              ease: "power2.out",
            },
            "-=0.1",
          );
        }, root);
      },
      revert: () => {
        unlockIntroScroll();
        playCtx?.revert();
        settleCtx.revert();
      },
    };
  }
});

const description = "La Isla Fashion Show — FW-26.";
const ogTitle = "FW-26 — La Isla Fashion Show";

$: canonicalUrl = `${$page.url.origin}${$page.url.pathname}`;
$: ogImageUrl = `${$page.url.origin}/open-graph-image.png`;
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

<div class="vip" id="vip-fw26-page" bind:this={rootEl}>
  <div class="vip__hero">
    <div
      class="vip__hero-inner vip-fw26__hero-inner"
      style="--vip-fw26-hero-bg: url({bgMobileVipInvite})"
    >
      <section class="vip-reveal" aria-label="FW-26">
        <header class="vip__header">
          <span class="vip__header-left"
            ><a href="/">LA ISLA FASHION SHOW</a></span
          >
          <span class="vip__header-right">12.05.26</span>
        </header>

        <div class="vip__stage">
          <div class="vip__card-column">
            <div class="vip__card-stack">
              <div
                class="vip__envelope vip__envelope--back vip_envelope"
                aria-hidden="true"
                bind:this={envelopeBackEl}
              >
                <img
                  class="vip__envelope-img"
                  src={envelopeBackImg}
                  alt=""
                  width="820"
                  height="763"
                />
              </div>

              <article class="vip-card" bind:this={cardEl}>
                <h1 class="visually-hidden">
                  FW-26 — La Isla Fashion Show
                </h1>
                <img
                  class="vip-card__img"
                  src={cardImg}
                  alt="FW-26 — La Isla Fashion Show"
                  width="952"
                  height="636"
                />
              </article>

              <div
                class="vip__envelope vip__envelope--front vip_envelope"
                aria-hidden="true"
                bind:this={envelopeFrontEl}
              >
                <img
                  class="vip__envelope-img"
                  src={envelopeFrontImg}
                  alt=""
                  width="820"
                  height="763"
                />
              </div>
            </div>

            <div class="vip__form" bind:this={formEl}>
              <div class="klaviyo-form-RXCRDS" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>

<style>
  #vip-fw26-page.vip {
    background: #1f1d1b;
  }

  .vip-fw26__hero-inner {
    background-color: #1f1d1b;
    background-image: var(--vip-fw26-hero-bg);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
  }

  /* Page text color #dfe3e1 (overrides vip-page.css + header) */
  #vip-fw26-page {
    color: #dfe3e1;
  }

  #vip-fw26-page .vip__header,
  #vip-fw26-page .vip__header a {
    color: #dfe3e1 !important;
  }

  #vip-fw26-page .vip__form .klaviyo-form-RXCRDS,
  #vip-fw26-page .vip__form form.klaviyo-form,
  #vip-fw26-page .vip__form form[data-testid="klaviyo-form-RXCRDS"] {
    color: #dfe3e1 !important;
  }

  #vip-fw26-page .vip__form form.klaviyo-form h1,
  #vip-fw26-page .vip__form form.klaviyo-form h2,
  #vip-fw26-page .vip__form form.klaviyo-form h3,
  #vip-fw26-page .vip__form form.klaviyo-form h4,
  #vip-fw26-page .vip__form form.klaviyo-form [id^="rich-text"] h3 {
    color: #dfe3e1 !important;
  }

  #vip-fw26-page .vip__form form.klaviyo-form [id^="rich-text"] strong {
    color: #dfe3e1 !important;
  }

  #vip-fw26-page .vip__form form.klaviyo-form label,
  #vip-fw26-page .vip__form form.klaviyo-form .klaviyo-field-label {
    color: #dfe3e1 !important;
  }

  #vip-fw26-page .vip__form form.klaviyo-form p,
  #vip-fw26-page .vip__form form.klaviyo-form .ql-editor {
    color: #dfe3e1 !important;
  }

  /* Klaviyo buttons — label/text in dark gray (matches page bg token #1f1d1b) */
  #vip-fw26-page .vip__form form.klaviyo-form button[type="submit"],
  #vip-fw26-page .vip__form form.klaviyo-form button.klaviyo-form-button[type="submit"],
  #vip-fw26-page .vip__form form.klaviyo-form [type="submit"] {
    color: #1f1d1b !important;
  }

  #vip-fw26-page .vip__form form.klaviyo-form button.klaviyo-form-button[type="button"] {
    color: #1f1d1b !important;
  }
</style>
