
import { Note } from "./Note.jsx";

export function ArchiveNote({ notes, onDeleteNote, onChange }) {

    const archiveNotes = notes.filter(note => note.isArchive)

    if (!archiveNotes.length) return <div className="trash-note-msg">There are no notes in the trash</div>

    return (
        <section className="trash-note-container">
            {archiveNotes
                .map(note => <div key={note.id}><Note note={note} onDeleteNote={onDeleteNote} onChange={onChange} /></div>)}
        </section>
    )

}
