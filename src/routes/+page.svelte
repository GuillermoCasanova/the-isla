<script>
import { MetaTags } from "svelte-meta-tags";
import coverLarge from "$lib/assets/FINAL_HIGH_RES-large.png";
import coverXLarge from "$lib/assets/FINAL_HIGH_RES-x-large.png";
import coverSmall from "$lib/assets/FINAL_HIGH_RES-small.png";
import openGraphImage from "$lib/assets/og_image.png";
export let data;
export let streamed = data.streamed;

let otherPeople;
let pastShows;
let futureShows;
let other;

let pageTitle = "Multiple People";
let pageDescrip =
  "This is a webpage for the album “Music for Multiple People” by Multiple People.";

// Handle the streamed data when it's available
streamed.otherPeople.then((data) => {
  otherPeople = data;
});

streamed.other.then((data) => {
  other = data;
});

// Handle the streamed data when it's available
streamed.shows.then((data) => {
  pastShows = [];
  futureShows = [];

  const currentTime = new Date(); // Get today's date and time

  data.results.forEach((show) => {
    const showDate = new Date(show.properties.Date.date.start);
    if (showDate > currentTime) {
      futureShows.push(show);
    } else {
      pastShows.push(show);
    }
  });
});

const { featureLinks, musicLinks } = data.content;
</script>

<MetaTags
  title={pageTitle}
  description={pageDescrip}
  canonical="http://multiplepeople.com"
  openGraph={{
    url: "http://multiplepeople.com",
    title: pageTitle,
    description: pageDescrip,
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: "Multiple People",
      },
    ],
    site_name: pageTitle,
  }}
  twitter={{
    site: "multiplepeople.com",
    cardType: "summary",
    title: pageTitle,
    description: pageDescrip,
    image: openGraphImage,
    imageAlt: "Multiple People",
  }}
/>

<h1 class="visually-hidden">
  "music for multiple people" the album by Multiple People
</h1>

<div class="main-container">
  <div class="mini-disc">
    <div class="pointing-arrow" />
    <div class="pointing-arrow-point">
      <svg width="14" height="6" viewBox="0 0 14 6" fill="none">
        <path
          d="M13.5 3L8.5 5.88675V0.113249L13.5 3ZM9 3.5H0V2.5H9V3.5Z"
          fill="black"
        />
      </svg>
    </div>

    <div class="mini-disc__inner">
      <picture>
        <!-- Larger devices with a minimum width of 1200px -->
        <source media="(min-width: 1600px)" srcset={coverXLarge} />

        <source media="(min-width: 780px)" srcset={coverLarge} />

        <!-- Default image source for smaller devices -->
        <img
          src={coverSmall}
          class="responsive-image"
          loading="eager"
          alt="Album cover art for 'music for multiple people' an album by the producer/song-writer multiple people"
        />
      </picture>
    </div>
  </div>

  <h2 class="headline visually-hidden">Featured on</h2>

  <ul class="list">
    {#each featureLinks.results as feature}
      {#if feature.properties.Name.title[0]}
        <li>
          {#if feature.properties.link.url}
            <a href={feature.properties.link.url} target="_blank">
              {feature.properties.Name.title[0].plain_text}
              <span class="icon">
                <svg>
                  <use xlink:href="#icon-new-tab" />
                </svg>
              </span>
            </a>
          {:else}
            <span>
              {feature.properties.Name.title[0].plain_text}
            </span>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>

  <div class="mp-logo-break">
    <div class="mp-logo-break__inner">
      <svg class="responsive-image">
        <use xlink:href="#logo-mp" />
      </svg>
    </div>
  </div>

  <h2 class="headline visually-hidden">Listen at</h2>

  <ul class="music-list">
    {#each musicLinks.results as musicLink}
      {#if musicLink.properties.Name.title[0]}
        <li>
          {#if musicLink.properties.link}
            <a href={musicLink.properties.link.url} target="_blank">
              <img
                src={musicLink.properties.Logo.files[0].file.url}
                alt={musicLink.properties.Name.title[0].plain_text}
                height="30"
                loading="lazy"
              />
            </a>
          {:else}
            {musicLink.properties.Name.title[0].plain_text}
          {/if}
        </li>
      {/if}
    {/each}
  </ul>

  <div class="mp-logo-break is-shape">
    <div class="mp-logo-break__inner">
      <svg class="responsive-image">
        <use xlink:href="#shape" />
      </svg>
    </div>
  </div>

  {#if futureShows}
    <h2 class="headline">actual life</h2>

    <ul class="list">
      {#each futureShows as show}
        {#if show.properties.Name.title && show.properties.Name.title[0]}
          <li>
            {#if show.properties.link && show.properties.link.url}
              <a href={show.properties.link.url} target="_blank">
                {show.properties.Name.title[0].plain_text}
                <span class="icon">
                  <svg>
                    <use xlink:href="#icon-new-tab" />
                  </svg>
                </span>
              </a>
            {:else}
              <span>
                {show.properties.Name.title[0].plain_text}
              </span>
            {/if}
          </li>
        {:else}
          <li><span>Unnamed Show</span></li>
        {/if}
      {/each}
    </ul>
  {:else}
    <p>
      No upcoming shows available. This might be because the shows are still
      loading or there are no future shows scheduled.
    </p>
  {/if}

  {#if pastShows}
    <ul class="list">
      {#each pastShows as show}
        {#if show.properties.Name.title && show.properties.Name.title[0]}
          <li>
            {#if show.properties.link && show.properties.link.url}
              <a href={show.properties.link.url} target="_blank">
                {show.properties.Name.title[0].plain_text}
                <span class="icon">
                  <svg>
                    <use xlink:href="#icon-new-tab" />
                  </svg>
                </span>
              </a>
            {:else}
              <span>
                {show.properties.Name.title[0].plain_text}
              </span>
            {/if}
          </li>
        {:else}
          <li><span>Unnamed Show</span></li>
        {/if}
      {/each}
    </ul>
  {:else}
    <p>No past shows available.</p>
  {/if}

  <h2>other things</h2>

  {#if other}
    <ul class="list">
      {#each other.results as extras}
        {#if extras.properties.Name.title[0]}
          <li>
            {#if extras.properties.Link}
              <a href={extras.properties.Link.url} target="_blank">
                {extras.properties.Name.title[0].plain_text}
                <span class="icon">
                  <svg>
                    <use xlink:href="#icon-new-tab" />
                  </svg>
                </span>
              </a>
            {:else}
              {extras.properties.Name.title[0].plain_text}
            {/if}
          </li>
        {/if}
      {/each}
    </ul>
  {/if}

  {#if otherPeople}
    <h2>other people</h2>

    <ul class="list">
      {#each otherPeople.results as other_person}
        {#if other_person.properties.Name.title[0]}
          <li>
            {#if other_person.properties.Link}
              <a href={other_person.properties.Link.url} target="_blank">
                {other_person.properties.Name.title[0].plain_text}
                <span class="icon">
                  <svg>
                    <use xlink:href="#icon-new-tab" />
                  </svg>
                </span>
              </a>
            {:else}
              {other_person.properties.Name.title[0].plain_text}
            {/if}
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>

<style>
:global(body) {
  background-color: #285fef;
  color: #000c2b;
}

.pointing-arrow {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  border-left: 2px solid black;
  height: 55%;
  bottom: 0;
}

.pointing-arrow-point {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 10%;
  margin: auto;
  height: 2rem;
}

.mini-disc {
  position: relative;
  padding: var(--level3);
  padding-bottom: var(--level5);
  margin-bottom: 0;
}

.mini-disc__inner {
  position: relative;
  padding-bottom: 94%;
}

.mini-disc__inner img {
  object-fit: contain;
  filter: drop-shadow(0px 1px 2px #000000c2);
}

ul a,
ul li > span {
  text-decoration: none;
  position: relative;
  padding: var(--level1);
  display: flex;
  justify-content: flex-start;
}

ul a .icon {
  width: 0.9rem;
  height: 0.9rem;
  position: relative;
  right: auto;
  margin-left: 0.75rem;
}

.icon svg {
  width: 100%;
  height: 100%;
}
ul:not(.music-list) a:hover,
ul:not(.music-list) a:focus {
  text-decoration: none;
  background-color: black;
  color: #285fef;
}

ul:not(.music-list) {
  border: 2px solid black;
  margin-bottom: var(--level7);
}

ul:not(.music-list) li {
  border-bottom: 2px solid black;
}

@media screen and (min-width: 1020px) {
  ul:not(.music-list) li a,
  ul:not(.music-list) li > span {
    padding-left: var(--level2);
  }
}

ul:not(.music-list) li:last-child {
  border-bottom: 0;
}

.music-list {
  margin-bottom: var(--level5);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  gap: 1rem;
}

.music-list li {
  width: 30%;
  margin-bottom: var(--level5);
  margin-left: 0;
}

.music-list li a,
.music-list li img {
  width: 100%;
  height: 100%;
}

h2 {
  font-weight: normal;
}

.mp-logo-break {
  width: 100%;
  margin-bottom: var(--level5);
  display: flex;
  align-items: center;
  max-width: 8rem;
  margin-left: auto;
  margin-right: auto;
}

.mp-logo-break.is-shape {
  max-width: 6rem;
  margin-bottom: var(--level9);
  animation: spin 2.5s steps(4, end) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.mp-logo-break__inner {
  position: relative;
  padding-bottom: 100%;
  left: 0;
  width: 100%;
}
</style>
