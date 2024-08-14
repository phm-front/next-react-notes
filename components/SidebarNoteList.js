import dayjs from 'dayjs';
import SidebarNoteItem from './SidebarNoteItem';
import SidebarNoteListFilter from './SidebarNoteListFilter';
import SidebarNoteItemHeader from './SidebarNoteItemHeader';
import { getAllNotes } from '@/lib/redis';

export default async function NoteList() {
  const notes = await getAllNotes();
  const arr = Object.entries(notes);

  if (arr.length == 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>;
  }

  return (
    <SidebarNoteListFilter notes = {
      Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
        }
      })
    }>
    </SidebarNoteListFilter>
  );
}
