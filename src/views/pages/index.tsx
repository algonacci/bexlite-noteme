import { TemplateBase } from "../templates/templateBase";

interface INote {
  id: number;
  content: string;
}

export const Home = ({ notes }: { notes: INote[] }) => {
  return (
    <TemplateBase>
      <h1>Note</h1>
      <div>
        {notes.map((note) => {
          return <div>{note.content}</div>;
        })}
      </div>
    </TemplateBase>
  );
};
