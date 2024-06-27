import { TemplateBase } from "../templates/templateBase";
import { NoteForm } from "../components/noteForm";
import { NoteCard } from "../components/noteCard";
import { INote } from "../../types/entity";

export const Home = ({ notes }: { notes: INote[] }) => {
  return (
    <TemplateBase>
      <main class="space-y-6">
        <h1 class="font-bold text-center py-4">Note App</h1>
        <NoteForm />
        <div id="notes" class="space-y-4">
          {notes.map((note) => {
            return <NoteCard note={note} />;
          })}
        </div>
      </main>
    </TemplateBase>
  );
};
