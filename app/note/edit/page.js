import NoteEditor from '@/components/NoteEditor.js';

export default async function EditPage() {
  return <NoteEditor note={null} initialTitle="Untitled" initialBody="" />;
}
