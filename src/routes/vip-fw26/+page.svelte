<script>
import "../vip/vip-page.css";
import "./vip-fw26-page.css";
import { onMount, tick } from "svelte";
import { page } from "$app/stores";
import { gsap } from "gsap";
import { waitForLoadingOverlayHidden } from "$lib/app-loading.js";
import cardImg from "$lib/assets/vip-card.webp";
import envelopeBackImg from "$lib/assets/WEB-ENVELOPE-BACK_fw26.webp";
import envelopeFrontImg from "$lib/assets/WEB-ENVELOPE-FRONT_fw26.webp";
import bgMobileVipInvite from "$lib/assets/bg-mobile-vip-invite.webp";
import panorawmaLogo from "$lib/assets/panorawma-logo.png";

const backgroundVideoSrc =
  "https://public-assets.content-platform.envatousercontent.com/4c480208-1b25-4c61-b568-61746f5b908f/7e7c95f4-ba97-4589-aed4-e37f9f47392d/4c480208-1b25-4c61-b568-61746f5b908f/preview_540p_crf22_higher_quality.mp4";

const INTRO_DURATION = 0.85;
const ENVELOPE_EXIT_DURATION = 0.95;
const FORM_FADE_DURATION = 0.5;
const LOGO_FADE_DURATION = 0.65;

/** Gap after envelope exit before Klaviyo layout + form fade (lets scroll height settle). */
const POST_ENVELOPE_SETTLE_S = 0.14;

/** Max wait if app-shell-ready never fires (avoids hanging forever with no animation). */
const SHELL_READY_FALLBACK_MS = 3500;

/** Long enough for slow devices / hydration before giving up on refs. */
const REF_BIND_MAX_FRAMES = 180;

/** If GSAP never reveals the form (error / stuck), un-hide it so Klaviyo is not trapped behind CSS. */
const FORM_REVEAL_FALLBACK_MS = 10000;

/** Max wait for Klaviyo embed to mount before revealing the form anyway. */
const KLAVIYO_READY_TIMEOUT_MS = 5500;

/** Klaviyo container height must be unchanged this long before we fade the form in. */
const KLAVIYO_STABLE_MS = 150;

let rootEl;
let cardEl;
let envelopeBackEl;
let envelopeFrontEl;
let formEl;
let producedEl;

/** Hide fixed nav on mobile after scrolling past the invite (desktop unchanged). */
let headerHiddenOnMobile = false;

const MOBILE_HEADER_SHOW_MAX_SCROLL_Y = 16;
const MOBILE_HEADER_HIDE_MIN_SCROLL_Y = 52;

/** Keeps the scrollbar from appearing while envelopes animate (transform extends overflow). */
function lockIntroScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function unlockIntroScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

/**
 * @param {string} src
 * @returns {Promise<void>}
 */
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/** @param {number} ms */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Klaviyo onsite.js may run before the form container is visible; re-scan after intro (SPA pattern). */
function nudgeKlaviyoOnsite() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent("onsite-event-publish", {
        detail: {
          type: "PAGE_CHANGE",
          payload: {
            currentPageUrl: `${window.location.origin}/__klaviyo_vip_fw26_${Date.now()}`,
          },
        },
      }),
    );
  } catch {
    /* ignore */
  }
}

/**
 * @param {HTMLElement} formContainer
 * @param {() => boolean} isCancelled
 */
async function waitForKlaviyoFormReady(formContainer, isCancelled) {
  const deadline = Date.now() + KLAVIYO_READY_TIMEOUT_MS;
  let lastHeight = -1;
  let stableAt = 0;

  while (Date.now() < deadline) {
    if (isCancelled()) return;

    const klaviyoForm = formContainer.querySelector("form.klaviyo-form");
    const hasEmbed =
      klaviyoForm &&
      (klaviyoForm.querySelector('[type="submit"]') ||
        klaviyoForm.querySelector('input[type="email"]'));

    const height = formContainer.offsetHeight;

    if (hasEmbed && height > 80) {
      if (height === lastHeight) {
        if (stableAt === 0) stableAt = Date.now();
        if (Date.now() - stableAt >= KLAVIYO_STABLE_MS) return;
      } else {
        stableAt = 0;
        lastHeight = height;
      }
    } else {
      stableAt = 0;
      lastHeight = height;
    }

    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}

onMount(() => {
  let cancelled = false;
  /** @type {(() => void) | undefined} */
  let revertGsap;
  /** @type {number | undefined} */
  let revealFallbackTimer;
  let klaviyoRevealStarted = false;

  const mobileHeaderMq =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 640px)")
      : null;

  function updateMobileHeaderVisibility() {
    if (typeof window === "undefined" || !mobileHeaderMq?.matches) {
      headerHiddenOnMobile = false;
      return;
    }

    const y = window.scrollY;
    if (y <= MOBILE_HEADER_SHOW_MAX_SCROLL_Y) {
      headerHiddenOnMobile = false;
      return;
    }
    if (y >= MOBILE_HEADER_HIDE_MIN_SCROLL_Y) {
      headerHiddenOnMobile = true;
      return;
    }

    if (producedEl) {
      const producedTop = producedEl.getBoundingClientRect().top;
      headerHiddenOnMobile = producedTop < 88;
    }
  }

  function onMobileHeaderScroll() {
    updateMobileHeaderVisibility();
  }

  function formStillHidden() {
    if (typeof document === "undefined" || !formEl) return true;
    const s = window.getComputedStyle(formEl);
    return (
      s.visibility === "hidden" || parseFloat(s.opacity) < 0.01
    );
  }

  async function boot() {
    await tick();
    if (cancelled) return;

    let attempts = 0;
    while (
      attempts < REF_BIND_MAX_FRAMES &&
      (!rootEl ||
        !cardEl ||
        !envelopeBackEl ||
        !envelopeFrontEl ||
        !formEl ||
        !producedEl)
    ) {
      await new Promise((r) => requestAnimationFrame(r));
      attempts += 1;
      if (cancelled) return;
    }

    if (cancelled) return;

    if (
      !rootEl ||
      !cardEl ||
      !envelopeBackEl ||
      !envelopeFrontEl ||
      !formEl ||
      !producedEl
    ) {
      return;
    }

    await Promise.all([
      preloadImage(cardImg),
      preloadImage(envelopeBackImg),
      preloadImage(envelopeFrontImg),
      preloadImage(panorawmaLogo),
      preloadImage(bgMobileVipInvite),
    ]);
    if (cancelled) return;

    const ctrl = prepareVipGsap();
    if (!ctrl) return;

    await tick();

    await Promise.race([
      waitForLoadingOverlayHidden(),
      delay(SHELL_READY_FALLBACK_MS),
    ]);
    if (cancelled) {
      ctrl.revert();
      return;
    }

    ctrl.playIntro();
    revertGsap = ctrl.revert;

    revealFallbackTimer = window.setTimeout(() => {
      if (cancelled || !formEl) return;
      if (!formStillHidden()) return;
      void revealProducedAndFormAfterKlaviyo();
    }, FORM_REVEAL_FALLBACK_MS);
  }

  async function afterEnvelopeLayoutSettled() {
    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
    if (cancelled) return;
    void revealProducedAndFormAfterKlaviyo();
  }

  async function revealProducedAndFormAfterKlaviyo() {
    if (cancelled || !formEl || !producedEl) return;
    if (klaviyoRevealStarted) return;
    klaviyoRevealStarted = true;

    gsap.set(formEl, {
      opacity: 0,
      visibility: "visible",
      pointerEvents: "none",
    });

    nudgeKlaviyoOnsite();
    await waitForKlaviyoFormReady(formEl, () => cancelled);

    if (cancelled) return;

    gsap.to(producedEl, {
      autoAlpha: 1,
      duration: LOGO_FADE_DURATION,
      ease: "power2.out",
    });

    gsap.to(formEl, {
      autoAlpha: 1,
      pointerEvents: "auto",
      duration: FORM_FADE_DURATION,
      ease: "power2.out",
      onComplete: () => {
        unlockIntroScroll();
        updateMobileHeaderVisibility();
      },
    });
  }

  void boot();

  if (mobileHeaderMq) {
    window.addEventListener("scroll", onMobileHeaderScroll, { passive: true });
    mobileHeaderMq.addEventListener("change", updateMobileHeaderVisibility);
    updateMobileHeaderVisibility();
  }

  return () => {
    cancelled = true;
    if (revealFallbackTimer) window.clearTimeout(revealFallbackTimer);
    unlockIntroScroll();
    window.removeEventListener("scroll", onMobileHeaderScroll);
    mobileHeaderMq?.removeEventListener("change", updateMobileHeaderVisibility);
    revertGsap?.();
  };

  /**
   * Phase 1 (under shell loader): gsap.set only — hidden behind #app-shell-loader.
   * Phase 2 (after waitForLoadingOverlayHidden): timeline plays — fires when shell dispatches app-shell-ready.
   */
  function prepareVipGsap() {
    const root = rootEl;
    const envelopeLayers = [envelopeBackEl, envelopeFrontEl];
    if (
      !root ||
      !cardEl ||
      !envelopeBackEl ||
      !envelopeFrontEl ||
      !formEl ||
      !producedEl
    )
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
          autoAlpha: 1,
          pointerEvents: "auto",
        });
        gsap.set(producedEl, { autoAlpha: 1 });
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
      gsap.set(producedEl, { autoAlpha: 0 });

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
            defaults: { ease: "power2.out" },
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

          const envelopeEnd = INTRO_DURATION + ENVELOPE_EXIT_DURATION;

          // yPercent moves absolutely positioned envelopes in document flow, so the layout
          // can keep extra scroll height after fade. Remove from layout once the move ends.
          tl.set(
            envelopeLayers,
            {
              display: "none",
              yPercent: 0,
              clearProps: "transform",
            },
            envelopeEnd,
          );

          tl.call(
            () => {
              void afterEnvelopeLayoutSettled();
            },
            null,
            `${envelopeEnd}+=${POST_ENVELOPE_SETTLE_S}`,
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
$: ogImageUrl = `${$page.url.origin}/og_image_vip_fw26.jpg`;
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

  <link rel="preload" as="image" href={bgMobileVipInvite} />
</svelte:head>

<div class="vip" id="vip-fw26-page" bind:this={rootEl}>
  <div class="vip__hero">
    <div
      class="vip__hero-inner vip-fw26__hero-inner"
      style="--vip-fw26-hero-bg: url({bgMobileVipInvite})"
    >
      <section class="vip-reveal" aria-label="FW-26">
        <header
          class="vip__header"
          class:vip-fw26__header--hidden={headerHiddenOnMobile}
        >
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

            <div class="vip-fw26__produced" bind:this={producedEl}>
              <p class="vip-fw26__produced-label">Produced by</p>
              <figure class="vip-fw26__panorawma" aria-label="Panorawma">
                <img
                  src={panorawmaLogo}
                  alt="Panorawma"
                  width="2675"
                  height="283"
                  decoding="async"
                />
              </figure>
            </div>

            <div class="vip__form" bind:this={formEl}>
              <div class="klaviyo-form-RNSA8d" />
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

  @media (max-width: 640px) {
    #vip-fw26-page .vip-fw26__hero-inner {
      overflow-x: clip;
    }
  }

  /*
   * Reserve Klaviyo form height before reveal so hero-inner does not jump
   * (reduces mobile background cover “stutter” when the embed finishes layout).
   */
  #vip-fw26-page .vip__form {
    min-height: clamp(20rem, 58vh, 26rem);
  }

  @media (min-width: 641px) {
    #vip-fw26-page .vip__form {
      min-height: clamp(22rem, 48vh, 28rem);
    }
  }

  /* Page text color #dfe3e1 (overrides vip-page.css + header) */
  #vip-fw26-page {
    color: #dfe3e1;
  }

  #vip-fw26-page .vip__header,
  #vip-fw26-page .vip__header a {
    color: #dfe3e1 !important;
  }

  @media (max-width: 640px) {
    #vip-fw26-page .vip__header {
      transition:
        opacity 0.28s ease,
        transform 0.28s ease,
        visibility 0.28s ease;
      will-change: opacity, transform;
    }

    #vip-fw26-page .vip__header.vip-fw26__header--hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(-0.4rem);
    }
  }

  .vip-fw26__produced {
    width: 100%;
    margin-top: clamp(var(--level5), 4.5vh, var(--level7));
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .vip-fw26__produced-label {
    margin: 0 0 var(--level2);
    text-align: center;
    font-family: var(--font-isla-00260);
    font-size: clamp(0.6rem, 1.8vw, 0.72rem);
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #dfe3e1;
    line-height: 1.2;
  }

  .vip-fw26__panorawma {
    width: clamp(6.5rem, 20vw, 10.5rem);
    max-width: min(34%, 168px);
    margin: 0;
    padding: 0;
    line-height: 0;
  }

  .vip-fw26__panorawma img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
