import { Elysia, t } from "elysia";
import APINoteController from "./controllers/APInoteController";
import { html } from "@elysiajs/html";
import { logger } from '@grotto/logysia';


const app = new Elysia()
  .use(html())
  .use(logger({
    logIP: false,
    writer: {
      write(msg: string) {
        console.log(msg)
      }
    }
  }))
  .get("/", () => "Hello Elysia")
  .use(APINoteController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
