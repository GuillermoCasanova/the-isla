<script>
import cardImg from "$lib/assets/Card.png";
import envelopeImg from "$lib/assets/envelope.png";
</script>

<svelte:head>
  <title>VIP — La Isla Fashion Show</title>
  <meta
    name="description"
    content="La Isla Fashion Show — invitación VIP."
  />
</svelte:head>

<div class="vip">
  <div class="vip__hero">
    <div class="vip__hero-inner">
      <header class="vip__header">
        <span class="vip__header-left">LA ISLA FASHION SHOW</span>
        <span class="vip__header-right">06.28.26</span>
      </header>

      <div class="vip__stage">
        <div class="vip__card-column">
          <article class="vip-card">
            <h1 class="visually-hidden">Invitación VIP — La Isla Fashion Show</h1>
            <img
              class="vip-card__img"
              src={cardImg}
              alt="Invitación VIP para La Isla Fashion Show"
              width="1215"
              height="811"
            />
          </article>
        </div>

        <div class="vip__envelope" aria-hidden="true">
          <img
            class="vip__envelope-img"
            src={envelopeImg}
            alt=""
            width="1322"
            height="751"
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
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

  .vip {
    box-sizing: border-box;
    background: rgb(0, 0, 0);
    color: #a8b4c4;
  }

  .vip__hero {
    position: relative;
    min-height: 100svh;
  }

  .vip__hero-inner {
    box-sizing: border-box;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    padding: 1rem clamp(1rem, 4vw, 2rem) clamp(1.5rem, 4vh, 2.5rem);
  }

  .vip__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    font-size: clamp(0.68rem, 1.2vw, 0.9rem);
    letter-spacing: 0.06em;
    font-family: ui-sans-serif, system-ui, sans-serif;
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
    position: relative;
    padding-top: clamp(0.5rem, 3vh, 2rem);
  }

  .vip__card-column {
    position: relative;
    z-index: 1;
    width: min(92vw, 640px);
    display: flex;
    justify-content: center;
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
  }

  .vip__envelope {
    position: relative;
    z-index: 2;
    width: min(100vw, 760px);
    max-width: 100%;
    margin-top: clamp(-4.5rem, -12vw, -2.75rem);
    pointer-events: none;
    filter: drop-shadow(0 -4px 24px rgba(0, 0, 0, 0.25));
    line-height: 0;
  }

  .vip__envelope-img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
