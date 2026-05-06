import { n as notion } from "../../../../chunks/notion.js";
import dotenv from "dotenv";
dotenv.config();
process.env;
const GET = async ({ request }) => {
  try {
    const response = await notion.databases.query({
      database_id: "478164a182da4a49a70ae72217d62f38",
      filter: {
        property: "Status",
        status: {
          equals: "Live"
        }
      },
      sorts: [
        {
          property: "Date",
          direction: "descending"
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
