
// Initialize a NOTION client 
import {Client} from '@notionhq/client';
import dotenv from 'dotenv'; 

dotenv.config(); 

const {NOTION_KEY, NOTION_DB} = process.env;
export const notion = new Client({ auth: NOTION_KEY });