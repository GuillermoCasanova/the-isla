<script>
import "./vip-page.css";
import { onMount, tick } from "svelte";
import { page } from "$app/stores";
import { gsap } from "gsap";
import { waitForLoadingOverlayHidden } from "$lib/app-loading.js";
import cardImg from "$lib/assets/card.jpg";
import envelopeBackImg from "$lib/assets/WEB-ENVELOPE-BACK.webp";
import envelopeFrontImg from "$lib/assets/WEB-ENVELOPE-FRONT.webp";

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

      gsap.set(envelopeLayers, {
        xPercent: -50,
        yPercent: 0,
      });
    }, root);

    let playCtx;

    return {
      playIntro() {
        playCtx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "power2.Out" } });

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
        playCtx?.revert();
        settleCtx.revert();
      },
    };
  }
});

const description = "La Isla Fashion Show — invitación VIP.";
const ogTitle = "VIP — La Isla Fashion Show";

$: canonicalUrl = `${$page.url.origin}${$page.url.pathname}`;
$: ogImageUrl = `${$page.url.origin}/og_image_vip.png`;
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

<div class="vip" id="vip-page" bind:this={rootEl}>
  <div class="vip__hero">
    <div class="vip__hero-inner">
      <section class="vip-reveal" aria-label="Invitación VIP">
        <header class="vip__header">
          <span class="vip__header-left"
            ><a href="/">LA ISLA FASHION SHOW</a></span
          >
          <span class="vip__header-right">06.27.26</span>
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
                  width="1743"
                  height="1621"
                />
              </div>

              <article class="vip-card" bind:this={cardEl}>
                <h1 class="visually-hidden">
                  Invitación VIP — La Isla Fashion Show
                </h1>
                <img
                  class="vip-card__img"
                  src={cardImg}
                  alt="Invitación VIP para La Isla Fashion Show"
                  width="3159"
                  height="2108"
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
                  width="1743"
                  height="1621"
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
