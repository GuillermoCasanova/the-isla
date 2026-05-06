import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();
const { NOTION_KEY, NOTION_DB } = process.env;
const notion = new Client({ auth: NOTION_KEY });
export {
  notion as n
};
//# sourceMappingURL=notion.js.map
