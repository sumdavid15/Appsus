
import { Note } from "./Note.jsx";

export function NoteList({ notes, onDeleteNote, onChange }) {

    if (!notes.length) return <div>No notes Saved</div>
    return (
        <section className="note-list">
            {notes.map(note => <div key={note.id}><Note note={note} onDeleteNote={onDeleteNote} onChange={onChange} /></div>)}
        </section>
    )
}
