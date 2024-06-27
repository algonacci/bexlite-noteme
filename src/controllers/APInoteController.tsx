import { Elysia, t } from "elysia";
import { client } from "../models/client";

const APINoteController = (app: Elysia) => {
  app.get("/", () => {
    return {
      status: {
        code: 200,
        message: "Success fetching the API",
      },
      data: null,
    };
  });
  app.get("/notes", () => {
    const allNotes = client.query(`SELECT * FROM notes`).all();
    return {
      status: {
        code: 200,
        message: "Success fetching all notes",
      },
      data: allNotes,
    };
  });
  app.post(
    "/notes",
    ({ set, body }) => {
      set.status = 201;
      const { content } = body;
      client.query("INSERT INTO notes (content) VALUES (?)").all(content);
      return {
        status: {
          code: 201,
          message: "Success create new note",
        },
        data: null,
      };
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  );
  app.delete("/notes/:id", ({ params }) => {
    client.query("DELETE FROM notes WHERE id = ?").run(params.id);
    return {
      status: {
        code: 200,
        message: `Note with ID ${params.id} has been deleted`,
      },
      data: null,
    };
  });
  app.patch(
    "/notes/:id",
    ({ params, body }) => {
      const { id } = params;
      const { content } = body;
      client.query("UPDATE notes SET content = (?) WHERE id = (?)").run(content, id);
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  );
  return app;
};

export default APINoteController;
