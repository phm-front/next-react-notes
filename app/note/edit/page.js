import NoteEditor from '@/components/NoteEditor.js';

export default async function EditPage() {
  return <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />;
}
