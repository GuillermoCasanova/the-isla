import { c as create_ssr_component, e as escape, b as add_attribute, d as each, f as spread, h as escape_object, v as validate_component } from "../../chunks/index.js";
const MetaTags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let updatedTitle;
  let { title = "" } = $$props;
  let { titleTemplate = "" } = $$props;
  let { noindex = false } = $$props;
  let { nofollow = false } = $$props;
  let { robotsProps = void 0 } = $$props;
  let { description = void 0 } = $$props;
  let { mobileAlternate = void 0 } = $$props;
  let { languageAlternates = void 0 } = $$props;
  let { twitter = void 0 } = $$props;
  let { facebook = void 0 } = $$props;
  let { openGraph = void 0 } = $$props;
  let { canonical = void 0 } = $$props;
  let { additionalMetaTags = void 0 } = $$props;
  let { additionalLinkTags = void 0 } = $$props;
  let robotsParams = "";
  if (robotsProps) {
    const { nosnippet, maxSnippet, maxImagePreview, maxVideoPreview, noarchive, noimageindex, notranslate, unavailableAfter } = robotsProps;
    robotsParams = `${nosnippet ? ",nosnippet" : ""}${maxSnippet ? `,max-snippet:${maxSnippet}` : ""}${maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ""}${noarchive ? ",noarchive" : ""}${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ""}${noimageindex ? ",noimageindex" : ""}${maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ""}${notranslate ? ",notranslate" : ""}`;
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.titleTemplate === void 0 && $$bindings.titleTemplate && titleTemplate !== void 0)
    $$bindings.titleTemplate(titleTemplate);
  if ($$props.noindex === void 0 && $$bindings.noindex && noindex !== void 0)
    $$bindings.noindex(noindex);
  if ($$props.nofollow === void 0 && $$bindings.nofollow && nofollow !== void 0)
    $$bindings.nofollow(nofollow);
  if ($$props.robotsProps === void 0 && $$bindings.robotsProps && robotsProps !== void 0)
    $$bindings.robotsProps(robotsProps);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.mobileAlternate === void 0 && $$bindings.mobileAlternate && mobileAlternate !== void 0)
    $$bindings.mobileAlternate(mobileAlternate);
  if ($$props.languageAlternates === void 0 && $$bindings.languageAlternates && languageAlternates !== void 0)
    $$bindings.languageAlternates(languageAlternates);
  if ($$props.twitter === void 0 && $$bindings.twitter && twitter !== void 0)
    $$bindings.twitter(twitter);
  if ($$props.facebook === void 0 && $$bindings.facebook && facebook !== void 0)
    $$bindings.facebook(facebook);
  if ($$props.openGraph === void 0 && $$bindings.openGraph && openGraph !== void 0)
    $$bindings.openGraph(openGraph);
  if ($$props.canonical === void 0 && $$bindings.canonical && canonical !== void 0)
    $$bindings.canonical(canonical);
  if ($$props.additionalMetaTags === void 0 && $$bindings.additionalMetaTags && additionalMetaTags !== void 0)
    $$bindings.additionalMetaTags(additionalMetaTags);
  if ($$props.additionalLinkTags === void 0 && $$bindings.additionalLinkTags && additionalLinkTags !== void 0)
    $$bindings.additionalLinkTags(additionalLinkTags);
  updatedTitle = titleTemplate ? titleTemplate.replace(/%s/g, title) : title;
  return `${$$result.head += `<!-- HEAD_svelte-1h7w4y4_START -->${$$result.title = `<title>${escape(updatedTitle)}</title>`, ""}<meta name="robots"${add_attribute("content", `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}${robotsParams}`, 0)}><meta name="googlebot"${add_attribute("content", `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}${robotsParams}`, 0)}>${description ? `<meta name="description"${add_attribute("content", description, 0)}>` : ``}${canonical ? `<link rel="canonical"${add_attribute("href", canonical, 0)}>` : ``}${mobileAlternate ? `<link rel="alternate"${add_attribute("media", mobileAlternate.media, 0)}${add_attribute("href", mobileAlternate.href, 0)}>` : ``}${languageAlternates && languageAlternates.length > 0 ? `${each(languageAlternates, (languageAlternate) => {
    return `<link rel="alternate"${add_attribute("hreflang", languageAlternate.hrefLang, 0)}${add_attribute("href", languageAlternate.href, 0)}>`;
  })}` : ``}${twitter ? `${twitter.cardType ? `<meta name="twitter:card"${add_attribute("content", twitter.cardType, 0)}>` : ``}
    ${twitter.site ? `<meta name="twitter:site"${add_attribute("content", twitter.site, 0)}>` : ``}
    ${twitter.handle ? `<meta name="twitter:creator"${add_attribute("content", twitter.handle, 0)}>` : ``}
    ${twitter.title ? `<meta name="twitter:title"${add_attribute("content", twitter.title, 0)}>` : ``}
    ${twitter.description ? `<meta name="twitter:description"${add_attribute("content", twitter.description, 0)}>` : ``}
    ${twitter.image ? `<meta name="twitter:image"${add_attribute("content", twitter.image, 0)}>` : ``}
    ${twitter.imageAlt ? `<meta name="twitter:image:alt"${add_attribute("content", twitter.imageAlt, 0)}>` : ``}` : ``}${facebook ? `<meta property="fb:app_id"${add_attribute("content", facebook.appId, 0)}>` : ``}${openGraph ? `${openGraph.url || canonical ? `<meta property="og:url"${add_attribute("content", openGraph.url || canonical, 0)}>` : ``}

    ${openGraph.type ? `<meta property="og:type"${add_attribute("content", openGraph.type.toLowerCase(), 0)}>
      ${openGraph.type.toLowerCase() === "profile" && openGraph.profile ? `${openGraph.profile.firstName ? `<meta property="profile:first_name"${add_attribute("content", openGraph.profile.firstName, 0)}>` : ``}

        ${openGraph.profile.lastName ? `<meta property="profile:last_name"${add_attribute("content", openGraph.profile.lastName, 0)}>` : ``}

        ${openGraph.profile.username ? `<meta property="profile:username"${add_attribute("content", openGraph.profile.username, 0)}>` : ``}

        ${openGraph.profile.gender ? `<meta property="profile:gender"${add_attribute("content", openGraph.profile.gender, 0)}>` : ``}` : `${openGraph.type.toLowerCase() === "book" && openGraph.book ? `${openGraph.book.authors && openGraph.book.authors.length ? `${each(openGraph.book.authors, (author) => {
    return `<meta property="book:author"${add_attribute("content", author, 0)}>`;
  })}` : ``}

        ${openGraph.book.isbn ? `<meta property="book:isbn"${add_attribute("content", openGraph.book.isbn, 0)}>` : ``}

        ${openGraph.book.releaseDate ? `<meta property="book:release_date"${add_attribute("content", openGraph.book.releaseDate, 0)}>` : ``}

        ${openGraph.book.tags && openGraph.book.tags.length ? `${each(openGraph.book.tags, (tag) => {
    return `<meta property="book:tag"${add_attribute("content", tag, 0)}>`;
  })}` : ``}` : `${openGraph.type.toLowerCase() === "article" && openGraph.article ? `${openGraph.article.publishedTime ? `<meta property="article:published_time"${add_attribute("content", openGraph.article.publishedTime, 0)}>` : ``}

        ${openGraph.article.modifiedTime ? `<meta property="article:modified_time"${add_attribute("content", openGraph.article.modifiedTime, 0)}>` : ``}

        ${openGraph.article.expirationTime ? `<meta property="article:expiration_time"${add_attribute("content", openGraph.article.expirationTime, 0)}>` : ``}

        ${openGraph.article.authors && openGraph.article.authors.length ? `${each(openGraph.article.authors, (author) => {
    return `<meta property="article:author"${add_attribute("content", author, 0)}>`;
  })}` : ``}

        ${openGraph.article.section ? `<meta property="article:section"${add_attribute("content", openGraph.article.section, 0)}>` : ``}

        ${openGraph.article.tags && openGraph.article.tags.length ? `${each(openGraph.article.tags, (tag) => {
    return `<meta property="article:tag"${add_attribute("content", tag, 0)}>`;
  })}` : ``}` : `${openGraph.type.toLowerCase() === "video.movie" || openGraph.type.toLowerCase() === "video.episode" || openGraph.type.toLowerCase() === "video.tv_show" || openGraph.type.toLowerCase() === "video.other" && openGraph.video ? `${openGraph.video.actors && openGraph.video.actors.length ? `${each(openGraph.video.actors, (actor) => {
    return `${actor.profile ? `<meta property="video:actor"${add_attribute("content", actor.profile, 0)}>` : ``}
            ${actor.role ? `<meta property="video:actor:role"${add_attribute("content", actor.role, 0)}>` : ``}`;
  })}` : ``}

        ${openGraph.video.directors && openGraph.video.directors.length ? `${each(openGraph.video.directors, (director) => {
    return `<meta property="video:director"${add_attribute("content", director, 0)}>`;
  })}` : ``}

        ${openGraph.video.writers && openGraph.video.writers.length ? `${each(openGraph.video.writers, (writer) => {
    return `<meta property="video:writer"${add_attribute("content", writer, 0)}>`;
  })}` : ``}

        ${openGraph.video.duration ? `<meta property="video:duration"${add_attribute("content", openGraph.video.duration.toString(), 0)}>` : ``}

        ${openGraph.video.releaseDate ? `<meta property="video:release_date"${add_attribute("content", openGraph.video.releaseDate, 0)}>` : ``}

        ${openGraph.video.tags && openGraph.video.tags.length ? `${each(openGraph.video.tags, (tag) => {
    return `<meta property="video:tag"${add_attribute("content", tag, 0)}>`;
  })}` : ``}

        ${openGraph.video.series ? `<meta property="video:series"${add_attribute("content", openGraph.video.series, 0)}>` : ``}` : ``}`}`}`}` : ``}

    ${openGraph.title || updatedTitle ? `<meta property="og:title"${add_attribute("content", openGraph.title || updatedTitle, 0)}>` : ``}

    ${openGraph.description || description ? `<meta property="og:description"${add_attribute("content", openGraph.description || description, 0)}>` : ``}

    ${openGraph.images && openGraph.images.length ? `${each(openGraph.images, (image) => {
    return `<meta property="og:image"${add_attribute("content", image.url, 0)}>
        ${image.alt ? `<meta property="og:image:alt"${add_attribute("content", image.alt, 0)}>` : ``}
        ${image.width ? `<meta property="og:image:width"${add_attribute("content", image.width.toString(), 0)}>` : ``}
        ${image.height ? `<meta property="og:image:height"${add_attribute("content", image.height.toString(), 0)}>` : ``}`;
  })}` : ``}

    ${openGraph.videos && openGraph.videos.length ? `${each(openGraph.videos, (video) => {
    return `<meta property="og:video"${add_attribute("content", video.url, 0)}>
        ${video.alt ? `<meta property="og:video:alt"${add_attribute("content", video.alt, 0)}>` : ``}
        ${video.width ? `<meta property="og:video:width"${add_attribute("content", video.width.toString(), 0)}>` : ``}
        ${video.height ? `<meta property="og:video:height"${add_attribute("content", video.height.toString(), 0)}>` : ``}
        ${video.secureUrl ? `<meta property="og:video:secure_url"${add_attribute("content", video.secureUrl.toString(), 0)}>` : ``}
        ${video.type ? `<meta property="og:video:type"${add_attribute("content", video.type.toString(), 0)}>` : ``}`;
  })}` : ``}

    ${openGraph.locale ? `<meta property="og:locale"${add_attribute("content", openGraph.locale, 0)}>` : ``}

    ${openGraph.site_name ? `<meta property="og:site_name"${add_attribute("content", openGraph.site_name, 0)}>` : ``}` : ``}${additionalMetaTags && additionalMetaTags.length > 0 ? `${each(additionalMetaTags, (tag) => {
    return `<meta${spread([escape_object(tag)], {})}>`;
  })}` : ``}${additionalLinkTags?.length ? `${each(additionalLinkTags, (tag) => {
    return `<link${spread([escape_object(tag)], {})}>`;
  })}` : ``}<!-- HEAD_svelte-1h7w4y4_END -->`, ""}`;
});
const coverLarge = "/_app/immutable/assets/FINAL_HIGH_RES-large.9733c10b.png";
const coverXLarge = "/_app/immutable/assets/FINAL_HIGH_RES-x-large.1ef45c4b.png";
const coverSmall = "/_app/immutable/assets/FINAL_HIGH_RES-small.3bfee780.png";
const openGraphImage = "/_app/immutable/assets/og_image.bd07e2c5.png";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "body{background-color:#285fef;color:#000c2b}.pointing-arrow.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{width:100%;position:absolute;left:0;right:0;border-left:2px solid black;height:55%;bottom:0}.pointing-arrow-point.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{position:absolute;left:0;top:0;bottom:10%;margin:auto;height:2rem}.mini-disc.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{position:relative;padding:var(--level3);padding-bottom:var(--level5);margin-bottom:0}.mini-disc__inner.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{position:relative;padding-bottom:94%}.mini-disc__inner.svelte-166n5ox img.svelte-166n5ox.svelte-166n5ox{object-fit:contain;filter:drop-shadow(0px 1px 2px #000000c2)}ul.svelte-166n5ox a.svelte-166n5ox.svelte-166n5ox,ul.svelte-166n5ox li.svelte-166n5ox>span.svelte-166n5ox{text-decoration:none;position:relative;padding:var(--level1);display:flex;justify-content:flex-start}ul.svelte-166n5ox a .icon.svelte-166n5ox.svelte-166n5ox{width:0.9rem;height:0.9rem;position:relative;right:auto;margin-left:0.75rem}.icon.svelte-166n5ox svg.svelte-166n5ox.svelte-166n5ox{width:100%;height:100%}ul.svelte-166n5ox:not(.music-list) a.svelte-166n5ox.svelte-166n5ox:hover,ul.svelte-166n5ox:not(.music-list) a.svelte-166n5ox.svelte-166n5ox:focus{text-decoration:none;background-color:black;color:#285fef}ul.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox:not(.music-list){border:2px solid black;margin-bottom:var(--level7)}ul.svelte-166n5ox:not(.music-list) li.svelte-166n5ox.svelte-166n5ox{border-bottom:2px solid black}@media screen and (min-width: 1020px){ul.svelte-166n5ox:not(.music-list) li a.svelte-166n5ox.svelte-166n5ox,ul.svelte-166n5ox:not(.music-list) li.svelte-166n5ox>span.svelte-166n5ox{padding-left:var(--level2)}}ul.svelte-166n5ox:not(.music-list) li.svelte-166n5ox.svelte-166n5ox:last-child{border-bottom:0}.music-list.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{margin-bottom:var(--level5);display:flex;flex-wrap:wrap;justify-content:center;padding:0;gap:1rem}.music-list.svelte-166n5ox li.svelte-166n5ox.svelte-166n5ox{width:30%;margin-bottom:var(--level5);margin-left:0}.music-list.svelte-166n5ox li.svelte-166n5ox a.svelte-166n5ox,.music-list.svelte-166n5ox li img.svelte-166n5ox.svelte-166n5ox{width:100%;height:100%}h2.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{font-weight:normal}.mp-logo-break.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{width:100%;margin-bottom:var(--level5);display:flex;align-items:center;max-width:8rem;margin-left:auto;margin-right:auto}.mp-logo-break.is-shape.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{max-width:6rem;margin-bottom:var(--level9);animation:svelte-166n5ox-spin 2.5s steps(4, end) infinite}@keyframes svelte-166n5ox-spin{0%{transform:rotate(0deg)}25%{transform:rotate(90deg)}50%{transform:rotate(180deg)}75%{transform:rotate(270deg)}100%{transform:rotate(360deg)}}.mp-logo-break__inner.svelte-166n5ox.svelte-166n5ox.svelte-166n5ox{position:relative;padding-bottom:100%;left:0;width:100%}",
  map: null
};
let pageTitle = "Multiple People";
let pageDescrip = "This is a webpage for the album “Music for Multiple People” by Multiple People.";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { streamed = data.streamed } = $$props;
  let otherPeople;
  let pastShows;
  let futureShows;
  let other;
  streamed.otherPeople.then((data2) => {
    otherPeople = data2;
  });
  streamed.other.then((data2) => {
    other = data2;
  });
  streamed.shows.then((data2) => {
    pastShows = [];
    futureShows = [];
    const currentTime = /* @__PURE__ */ new Date();
    data2.results.forEach((show) => {
      const showDate = new Date(show.properties.Date.date.start);
      if (showDate > currentTime) {
        futureShows.push(show);
      } else {
        pastShows.push(show);
      }
    });
  });
  const { featureLinks, musicLinks } = data.content;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.streamed === void 0 && $$bindings.streamed && streamed !== void 0)
    $$bindings.streamed(streamed);
  $$result.css.add(css);
  return `${validate_component(MetaTags, "MetaTags").$$render(
    $$result,
    {
      title: pageTitle,
      description: pageDescrip,
      canonical: "http://multiplepeople.com",
      openGraph: {
        url: "http://multiplepeople.com",
        title: pageTitle,
        description: pageDescrip,
        images: [
          {
            url: openGraphImage,
            width: 1200,
            height: 630,
            alt: "Multiple People"
          }
        ],
        site_name: pageTitle
      },
      twitter: {
        site: "multiplepeople.com",
        cardType: "summary",
        title: pageTitle,
        description: pageDescrip,
        image: openGraphImage,
        imageAlt: "Multiple People"
      }
    },
    {},
    {}
  )}

<h1 class="visually-hidden">&quot;music for multiple people&quot; the album by Multiple People
</h1>

<div class="main-container"><div class="mini-disc svelte-166n5ox"><div class="pointing-arrow svelte-166n5ox"></div>
    <div class="pointing-arrow-point svelte-166n5ox"><svg width="14" height="6" viewBox="0 0 14 6" fill="none"><path d="M13.5 3L8.5 5.88675V0.113249L13.5 3ZM9 3.5H0V2.5H9V3.5Z" fill="black"></path></svg></div>

    <div class="mini-disc__inner svelte-166n5ox"><picture>
        <source media="(min-width: 1600px)"${add_attribute("srcset", coverXLarge, 0)}>

        <source media="(min-width: 780px)"${add_attribute("srcset", coverLarge, 0)}>

        
        <img${add_attribute("src", coverSmall, 0)} class="responsive-image svelte-166n5ox" loading="eager" alt="Album cover art for 'music for multiple people' an album by the producer/song-writer multiple people"></picture></div></div>

  <h2 class="headline visually-hidden svelte-166n5ox">Featured on</h2>

  <ul class="list svelte-166n5ox">${each(featureLinks.results, (feature) => {
    return `${feature.properties.Name.title[0] ? `<li class="svelte-166n5ox">${feature.properties.link.url ? `<a${add_attribute("href", feature.properties.link.url, 0)} target="_blank" class="svelte-166n5ox">${escape(feature.properties.Name.title[0].plain_text)}
              <span class="icon svelte-166n5ox"><svg class="svelte-166n5ox"><use xlink:href="#icon-new-tab"></use></svg></span>
            </a>` : `<span class="svelte-166n5ox">${escape(feature.properties.Name.title[0].plain_text)}
            </span>`}
        </li>` : ``}`;
  })}</ul>

  <div class="mp-logo-break svelte-166n5ox"><div class="mp-logo-break__inner svelte-166n5ox"><svg class="responsive-image"><use xlink:href="#logo-mp"></use></svg></div></div>

  <h2 class="headline visually-hidden svelte-166n5ox">Listen at</h2>

  <ul class="music-list svelte-166n5ox">${each(musicLinks.results, (musicLink) => {
    return `${musicLink.properties.Name.title[0] ? `<li class="svelte-166n5ox">${musicLink.properties.link ? `<a${add_attribute("href", musicLink.properties.link.url, 0)} target="_blank" class="svelte-166n5ox"><img${add_attribute("src", musicLink.properties.Logo.files[0].file.url, 0)}${add_attribute("alt", musicLink.properties.Name.title[0].plain_text, 0)} height="30" loading="lazy" class="svelte-166n5ox">
            </a>` : `${escape(musicLink.properties.Name.title[0].plain_text)}`}
        </li>` : ``}`;
  })}</ul>

  <div class="mp-logo-break is-shape svelte-166n5ox"><div class="mp-logo-break__inner svelte-166n5ox"><svg class="responsive-image"><use xlink:href="#shape"></use></svg></div></div>

  ${futureShows ? `<h2 class="headline svelte-166n5ox">actual life</h2>

    <ul class="list svelte-166n5ox">${each(futureShows, (show) => {
    return `${show.properties.Name.title && show.properties.Name.title[0] ? `<li class="svelte-166n5ox">${show.properties.link && show.properties.link.url ? `<a${add_attribute("href", show.properties.link.url, 0)} target="_blank" class="svelte-166n5ox">${escape(show.properties.Name.title[0].plain_text)}
                <span class="icon svelte-166n5ox"><svg class="svelte-166n5ox"><use xlink:href="#icon-new-tab"></use></svg></span>
              </a>` : `<span class="svelte-166n5ox">${escape(show.properties.Name.title[0].plain_text)}
              </span>`}
          </li>` : `<li class="svelte-166n5ox"><span class="svelte-166n5ox">Unnamed Show</span></li>`}`;
  })}</ul>` : `<p>No upcoming shows available. This might be because the shows are still
      loading or there are no future shows scheduled.
    </p>`}

  ${pastShows ? `<ul class="list svelte-166n5ox">${each(pastShows, (show) => {
    return `${show.properties.Name.title && show.properties.Name.title[0] ? `<li class="svelte-166n5ox">${show.properties.link && show.properties.link.url ? `<a${add_attribute("href", show.properties.link.url, 0)} target="_blank" class="svelte-166n5ox">${escape(show.properties.Name.title[0].plain_text)}
                <span class="icon svelte-166n5ox"><svg class="svelte-166n5ox"><use xlink:href="#icon-new-tab"></use></svg></span>
              </a>` : `<span class="svelte-166n5ox">${escape(show.properties.Name.title[0].plain_text)}
              </span>`}
          </li>` : `<li class="svelte-166n5ox"><span class="svelte-166n5ox">Unnamed Show</span></li>`}`;
  })}</ul>` : `<p>No past shows available.</p>`}

  <h2 class="svelte-166n5ox">other things</h2>

  ${other ? `<ul class="list svelte-166n5ox">${each(other.results, (extras) => {
    return `${extras.properties.Name.title[0] ? `<li class="svelte-166n5ox">${extras.properties.Link ? `<a${add_attribute("href", extras.properties.Link.url, 0)} target="_blank" class="svelte-166n5ox">${escape(extras.properties.Name.title[0].plain_text)}
                <span class="icon svelte-166n5ox"><svg class="svelte-166n5ox"><use xlink:href="#icon-new-tab"></use></svg></span>
              </a>` : `${escape(extras.properties.Name.title[0].plain_text)}`}
          </li>` : ``}`;
  })}</ul>` : ``}

  ${otherPeople ? `<h2 class="svelte-166n5ox">other people</h2>

    <ul class="list svelte-166n5ox">${each(otherPeople.results, (other_person) => {
    return `${other_person.properties.Name.title[0] ? `<li class="svelte-166n5ox">${other_person.properties.Link ? `<a${add_attribute("href", other_person.properties.Link.url, 0)} target="_blank" class="svelte-166n5ox">${escape(other_person.properties.Name.title[0].plain_text)}
                <span class="icon svelte-166n5ox"><svg class="svelte-166n5ox"><use xlink:href="#icon-new-tab"></use></svg></span>
              </a>` : `${escape(other_person.properties.Name.title[0].plain_text)}`}
          </li>` : ``}`;
  })}</ul>` : ``}
</div>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map
