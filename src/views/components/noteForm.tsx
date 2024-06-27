import { INote } from "../../types/entity";

export const NoteForm = () => {
  return (
    <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true" class="bg-black p-4 rounded-xl shadow-xl">
      <textarea name="content" class="bg-transparent w-full block reize-none text-white font-medium focus:outline-none" placeholder="Write note here"></textarea>
      <button class="flex gap-2 items-center bg-white border rounded-full px-3 py-1 font-medium tracking-tight">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 22v-1c0-1.886 0-2.828-.586-3.414C15.828 17 14.886 17 13 17h-2c-1.886 0-2.828 0-3.414.586C7 18.172 7 19.114 7 21v1"></path>
            <path
              stroke-linecap="round"
              d="M7 8h6M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c.341 0 .512 0 .686.015a4.04 4.04 0 0 1 2.224.921c.133.112.257.236.504.483l5.167 5.167c.247.247.37.37.483.504c.522.623.85 1.415.92 2.224c.016.174.016.345.016.686c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465c-.973-.973-1.3-2.342-1.409-4.535"></path>
          </g>
        </svg>
        Create note
      </button>
    </form>
  );
};

export const NoteFormUpdate = ({ id, note }: { id: number; note: INote }) => {
  return (
    <form id="noteForm" hx-patch={`/notes/${id}`} hx-target={`#note-${id}`} hx-swap="outerHTML" hx-swap-oob="true" class="bg-black p-4 rounded-xl shadow-xl">
      <textarea name="content" class="bg-transparent w-full block reize-none text-white font-medium focus:outline-none">
        {note.content}
      </textarea>
      <button class="flex gap-2 items-center bg-white border rounded-full px-3 py-1 font-medium tracking-tight">Update note</button>
    </form>
  );
};
