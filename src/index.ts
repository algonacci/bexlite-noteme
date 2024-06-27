import { Elysia, t } from "elysia";
import { controllers } from "./controllers";
import { html } from "@elysiajs/html";
// import { logger } from '@grotto/logysia';
import { createNote, deleteNote, editNote, getNotes, updateNote } from "./controllers/noteController";
import { bodySchema } from "./types/entity";


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
  .post("/notes", createNote, { body: bodySchema })
  .delete("/notes/:id", deleteNote)
  .get("/notes/:id/edit", editNote)
  .patch("/notes/:id", updateNote, { body: bodySchema })
  .use(controllers)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
