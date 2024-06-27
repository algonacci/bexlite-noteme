import { TemplateBase } from "../templates/templateBase";

export interface INote {
  id: number;
  content: string;
}

export const Home = ({ notes }: { notes: INote[] }) => {
  return (
    <TemplateBase>
      <h1>Note</h1>
      <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend">
        <textarea name="content"></textarea>
        <button>Create note</button>
      </form>
      <div id="notes">
        {notes.map((note) => {
          return (
            <main id={`note-${note.id}`}>
              <li>{note.content}</li>
              <button hx-get={`/notes/${note.id}/edit`} hx-swap="none">
                Edit
              </button>
              <button hx-delete={`/notes/${note.id}`} hx-target="closest main">
                Delete
              </button>
            </main>
          );
        })}
      </div>
    </TemplateBase>
  );
};
