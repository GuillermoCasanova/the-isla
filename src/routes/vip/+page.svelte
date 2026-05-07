<script>
import "./vip-page.css";
import { onMount } from "svelte";
import { gsap } from "gsap";
import cardImg from "$lib/assets/Card.png";
import envelopeBackImg from "$lib/assets/WEB-ENVELOPE-BACK.png";
import envelopeFrontImg from "$lib/assets/WEB-ENVELOPE-FRONT.png";

const backgroundVideoSrc =
  "https://public-assets.content-platform.envatousercontent.com/4c480208-1b25-4c61-b568-61746f5b908f/7e7c95f4-ba97-4589-aed4-e37f9f47392d/4c480208-1b25-4c61-b568-61746f5b908f/preview_540p_crf22_higher_quality.mp4";

const INTRO_DURATION = 0.85;
const ENVELOPE_EXIT_DURATION = 0.95;
const FORM_FADE_DURATION = 0.45;

let rootEl;
let cardEl;
let envelopeBackEl;
let envelopeFrontEl;
let formEl;

onMount(() => {
  const root = rootEl;
  const envelopeLayers = [envelopeBackEl, envelopeFrontEl];
  if (!root || !cardEl || !envelopeBackEl || !envelopeFrontEl || !formEl)
    return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
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
    return;
  }

  const ctx = gsap.context(() => {
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

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to([cardEl, ...envelopeLayers], {
      scale: 1,
      duration: INTRO_DURATION,
    });

    tl.to(
      envelopeLayers,
      {
        yPercent: 40,
        opacity: 0,
        duration: ENVELOPE_EXIT_DURATION,
        ease: "power2.inOut",
      },
      ">",
    );

    tl.to(
      formEl,
      {
        autoAlpha: 1,
        pointerEvents: "auto",
        duration: FORM_FADE_DURATION,
        ease: "power2.out",
      },
      ">",
    );
  }, root);

  return () => ctx.revert();
});
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
                  width="1215"
                  height="811"
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
