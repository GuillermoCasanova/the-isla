import { n as notion } from "../../../../chunks/notion.js";
import dotenv from "dotenv";
dotenv.config();
const { NOTION_KEY, NOTION_DB } = process.env;
const GET = async ({ request }) => {
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
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
export {
  GET
};
//# sourceMappingURL=_server.js.map
