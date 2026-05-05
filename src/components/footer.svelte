<script>
import footer_graphic from "$lib/assets/footer-with-all-logos.png";

export let showFooter;
</script>

<footer>
  <div class="main-container">
    <div class="footer__inner">
      <div class="footer_graphic">
        <img
          src={footer_graphic}
          alt="music for multiple people"
          loading="lazy"
        />
      </div>
      <div class="footer_signature">
        <svg>
          <use xlink:href="#mp-sig" />
        </svg>
      </div>

      <div class="footer__disclaimer">
        <div class="footer__badge">
          <div class="footer__badge__inner">
            <svg>
              <use xlink:href="#data-badge" />
            </svg>
          </div>
        </div>
        <p class="footer__disclaimer__text">
          the sole purpose of this webpage is to inform you of what is only
          absolutely necessary about this project, discarding the usual
          unnecessary dialogue. further conclusions are possible but are reliant
          on curiosity, openness, and allowing messages to move through you as
          they will. personally, i’m excited. you are capable of reaching far
          beyond what you think is presently possible. the only reason we
          secured this space was to remind you. i am here with you.
        </p>
      </div>
    </div>
  </div>
</footer>

<style>
footer {
  margin-top: calc(var(--level6) + var(--level6));
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media screen and (min-width: 1020px) {
  footer {
    margin-top: calc(var(--level8) + var(--level8));
  }
}

.footer_graphic {
  mix-blend-mode: multiply;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: calc(var(--level7) + var(--level5));
}

@media screen and (min-width: 1020px) {
  .footer_graphic {
    max-width: 32rem;
    margin-bottom: calc(var(--level10) + var(--level5));
  }
}

.footer_signature {
  mix-blend-mode: multiply;
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-bottom: calc(var(--level7) + var(--level5));
}

@media screen and (min-width: 1020px) {
  .footer_signature {
    margin-bottom: var(--level9);
    margin-left: auto;
    margin-right: auto;
  }
}
.footer_signature svg {
  width: 92%;
}

.footer__inner {
  padding-bottom: var(--level3);
}

.footer__disclaimer {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: var(--level1);
  align-items: flex-start; /* Add this line */
}

@media screen and (min-width: 1020px) {
  .footer__disclaimer {
    max-width: 38rem;
    margin-left: auto;
    margin-right: auto;
  }
}

.footer__badge {
  position: relative;
  max-width: 3.5rem;
  width: 100%;
  column-gap: 1rem;
  margin-bottom: var(--level3);
  flex-shrink: 0;
}

.footer__badge__inner {
  width: 100%;
  position: relative;
  padding-bottom: 100%;
}
.footer__badge svg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.footer__disclaimer__text {
  font-size: var(--mini);
  line-height: 1;
  min-width: 70%;
  flex-grow: 1;
  flex-basis: 0; /* Change 'content' to '0' */
  text-align: justify;
  font-family: var(--secondary-font-family);
}
</style>
