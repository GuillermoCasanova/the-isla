import "../../chunks/notion.js";
import dotenv from "dotenv";
dotenv.config();
process.env;
async function load({ params, fetch }) {
  try {
    const musicLinksResponse = await fetch("/api/get-music-links");
    if (!musicLinksResponse.ok) {
      throw new Error(`Failed to fetch music links: ${musicLinksResponse.statusText}`);
    }
    const musicLinks = await musicLinksResponse.json();
    const featureLinksResponse = await fetch("/api/get-features");
    if (!featureLinksResponse.ok) {
      throw new Error(`Failed to fetch feature links  ${featureLinksResponse.statusText}`);
    }
    const featureLinks = await featureLinksResponse.json();
    const otherPeopleStream = fetch("/api/get-other-people").then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to stream other people data: ${response.statusText}`);
      }
      const reader = response.body.getReader();
      let data = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        data += new TextDecoder().decode(value);
      }
      return JSON.parse(data);
    });
    const showsStream = fetch("/api/get-shows").then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to stream other people data: ${response.statusText}`);
      }
      const reader = response.body.getReader();
      let data = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        data += new TextDecoder().decode(value);
      }
      return JSON.parse(data);
    });
    const otherStream = fetch("/api/get-other").then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to stream other data: ${response.statusText}`);
      }
      const reader = response.body.getReader();
      let data = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        data += new TextDecoder().decode(value);
      }
      return JSON.parse(data);
    });
    return {
      content: {
        featureLinks,
        musicLinks
      },
      streamed: {
        otherPeople: otherPeopleStream,
        shows: showsStream,
        other: otherStream
      }
    };
  } catch (error) {
    return {
      status: 500,
      error: error.message
    };
  }
}
export {
  load
};
//# sourceMappingURL=_page.server.js.map
