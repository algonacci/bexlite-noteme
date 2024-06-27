import { client } from "../models/client";
import { TBody } from "../types/entity";
import { Home } from "../views/pages";
import { INote } from "../types/entity";
import { Context } from "elysia";
import { NoteForm, NoteFormUpdate } from "../views/components/noteForm";
import { NoteCard } from "../views/components/noteCard";

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
      <NoteForm />
      <NoteCard note={currentNotes[0]} />
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
      <NoteFormUpdate id={id} note={currentNote[0]} />
      <NoteCard note={currentNote[0]} isDisable withOob />
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
      <NoteForm />
      <NoteCard note={updatedNote[0]} withOob />
    </>
  );
};
