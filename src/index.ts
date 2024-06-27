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
  .post("/notes", ({ set, body }) => {
    set.status = 201
    const { content } = body
    client.query("INSERT INTO notes (content) VALUES (?)").all(content)
    return {
      status: {
        code: 201,
        message: "Success create new note"
      },
      data: null
    }
  }, {
    body: t.Object({
      content: t.String()
    })
  })
  .delete("/notes/:id", ({ params }) => {
    client.query("DELETE FROM notes WHERE id = ?").run(params.id)
    return {
      status: {
        code: 200,
        message: `Note with ID ${params.id} has been deleted`
      },
      data: null
    }
  })
  .patch("/notes/:id", ({ params, body }) => {
    const { id } = params
    const { content } = body
    client.query("UPDATE notes SET content = (?) WHERE id = (?)").run(content, id)
  }, {
    body: t.Object({
      content: t.String()
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
