import { notion } from '$lib/notion';
import dotenv from 'dotenv'; 

dotenv.config(); 
const { NOTION_KEY, NOTION_DB } = process.env;

export async function load({ params, fetch }) {
    try {
        // Fetch music links
        const musicLinksResponse = await fetch('/api/get-music-links');

        if (!musicLinksResponse.ok) {
            throw new Error(`Failed to fetch music links: ${musicLinksResponse.statusText}`);
        }

        const musicLinks = await musicLinksResponse.json();


        // Fetch feature Links 
        const featureLinksResponse = await fetch('/api/get-features'); 

        if(!featureLinksResponse.ok) {
            throw new Error(`Failed to fetch feature links  ${featureLinksResponse.statusText}`)
        }

        const featureLinks = await featureLinksResponse.json(); 

        // Stream other people data
        const otherPeopleStream = fetch('/api/get-other-people').then(async (response) => {
            if (!response.ok) {
                throw new Error(`Failed to stream other people data: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            let data = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                data += new TextDecoder().decode(value);
            }

            return JSON.parse(data);
        });


        // Stream show data
        const showsStream = fetch('/api/get-shows').then(async (response) => {
            if (!response.ok) {
                throw new Error(`Failed to stream other people data: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            let data = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                data += new TextDecoder().decode(value);
            }

            return JSON.parse(data);
        });

        // Stream other data
        const otherStream = fetch('/api/get-other').then(async (response) => {
            if (!response.ok) {
                throw new Error(`Failed to stream other data: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            let data = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                data += new TextDecoder().decode(value);
            }

            return JSON.parse(data);
        });
        // Return the combined data with streaming
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