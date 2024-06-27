import { Elysia, t } from "elysia";
import { controllers } from "./controllers";
import { html } from "@elysiajs/html";
// import { logger } from '@grotto/logysia';
import { getNotes } from "./controllers/noteController";


const app = new Elysia()
  .use(html())
  // .use(logger({
  //   logIP: false,
  //   writer: {
  //     write(msg: string) {
  //       console.log(msg)
  //     }
  //   }
  // }))
  .get("/", () => "Hello Elysia")
  .get("/notes", getNotes)
  .use(controllers)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
