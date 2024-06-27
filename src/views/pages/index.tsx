import { TemplateBase } from "../templates/templateBase";

export interface INote {
  id: number;
  content: string;
}

export const Home = ({ notes }: { notes: INote[] }) => {
  return (
    <TemplateBase>
      <h1>Note</h1>
      <div>
        {notes.map((note) => {
          return <li>{note.content}</li>;
        })}
      </div>
    </TemplateBase>
  );
};
