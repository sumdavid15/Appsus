
import { Note } from "./Note.jsx";

export function ArchiveNote({ setArchive, notes, onDeleteNote, onChange }) {
    console.log('notes:', notes)

    return (
        <section className="trash-note-container">
            {notes.filter(note => note.isArchive)
                .map(note => <div key={note.id}><Note note={note} onDeleteNote={onDeleteNote} onChange={onChange} /></div>)}

            <button onClick={() => setArchive(false)} className="archive">
                Notes
            </button>
        </section>
    )

}
