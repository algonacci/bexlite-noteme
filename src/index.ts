import { Elysia, t } from "elysia";
import { client } from "./models/client";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/notes", () => {
    const allNotes = client.query(`SELECT * FROM notes`).all()
    return {
      status: {
        code: 200,
        message: "Success fetching all notes"
      },
      data: allNotes
    }
  })
  .post("/notes", ({ body }) => {
    const { content } = body
    const createNote = client.query("INSERT INTO notes (content) VALUES (?)").all(content)
    return {
      status: {
        code: 200,
        message: "Success fetching all notes"
      },
      data: createNote
    }
  }, {
    body: t.Object({
      content: t.String()
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
