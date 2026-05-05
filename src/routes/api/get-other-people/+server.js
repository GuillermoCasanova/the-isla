

import {notion} from "$lib/notion.js";
import dotenv from 'dotenv'; 

dotenv.config(); 
const {NOTION_KEY} = process.env;


export const GET = async ({ request }) => {

 try {
  const response = await notion.databases.query({
    database_id: 'b2bad19c19f34b3f825cdeb894810879',
    filter: {
      property: "Status", 
      status: {
        equals: "Live"
      }
    }
  });
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
 } catch (error) {
   return new Response(JSON.stringify({ error: "An error occurred" }), {
     status: 500,
     headers: {
       'Content-Type': 'application/json'
     }
   });
 }
};


