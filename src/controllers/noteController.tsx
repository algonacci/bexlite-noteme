import { client } from "../models/client";
import { TBody } from "../types/entity";
import { Home, INote } from "../views/pages";
import { Context } from "elysia";

export const getNotes = () => {
  const allNotes = client.query(`SELECT * FROM notes`).all() as INote[];
  return <Home notes={allNotes} />;
};

export const createNote = ({ set, body }: Context) => {
  set.status = 201;
  const { content } = body as TBody;
  client.query("INSERT INTO notes (content) VALUES (?)").all(content);
  const currentNotes = client.query("SELECT * FROM notes ORDER BY id DESC LIMIT 1").all() as INote[];
  return (
    <>
      <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
        <textarea name="content"></textarea>
        <button>Create note</button>
      </form>
      <main id={`note-${currentNotes[0].id}`}>
        <li>{currentNotes[0].content}</li>
        <button hx-get={`/notes/${currentNotes[0].id}/edit`} hx-swap="none">
          Edit
        </button>
        <button hx-delete={`/notes/${currentNotes[0].id}`} hx-target="closest main">
          Delete
        </button>
      </main>
    </>
  );
};

export const deleteNote = ({ params }: Context) => {
  const { id } = params;
  client.query("DELETE FROM notes WHERE id = ?").run(id);
  return null;
};

export const editNote = ({ params }: Context) => {
  const { id } = params;
  const currentNote = client.query("SELECT * FROM notes WHERE id = ?").all(id) as INote[];
  return (
    <>
      <form id="noteForm" hx-patch={`/notes/${id}`} hx-target={`#note-${id}`} hx-swap="outerHTML" hx-swap-oob="true">
        <textarea name="content">{currentNote[0].content}</textarea>
        <button>Update note</button>
      </form>
    </>
  );
};

export const updateNote = ({ params, body }: Context) => {
  const { id } = params;
  const { content } = body as INote;
  client.query("UPDATE notes SET content = (?) WHERE id = (?)").run(content, id);
  const updatedNote = client.query("SELECT * FROM notes WHERE id = (?)").all(id) as INote[];
  return (
    <>
      <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
        <textarea name="content"></textarea>
        <button>Create note</button>
      </form>
      <main id={`note-${updatedNote[0].id}`}>
        <li>{updatedNote[0].content}</li>
        <button hx-get={`/notes/${updatedNote[0].id}/edit`} hx-swap="none">
          Edit
        </button>
        <button hx-delete={`/notes/${updatedNote[0].id}`} hx-target="closest main">
          Delete
        </button>
      </main>
    </>
  );
};
