

import {notion} from "$lib/notion.js";
import dotenv from 'dotenv'; 

dotenv.config(); 
const {NOTION_KEY, NOTION_DB} = process.env;


export const GET = async ({ request }) => {

// const response = await notion.databases.query({
//     database_id: NOTION_DB}); 

 try {
  const response = await notion.databases.query({
    database_id: NOTION_DB,
    filter: {
      property: "Status", 
      status: {
        equals: "Live"
      }
    },
    sorts: [
      {
        property: "Order",
        direction: "ascending"
      }
    ]
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