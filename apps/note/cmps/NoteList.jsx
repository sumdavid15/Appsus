
import { Note } from "./Note.jsx";

export function NoteList({ notes, onDeleteNote, onChange }) {

    if (!notes.length) return <div className="no-notes-msg">No notes Saved</div>

    const pinned = notes.filter(note => note.isPinned && !note.isArchive);
    const other = notes.filter(note => !note.isPinned && !note.isArchive)

    return (
        <section className="note-list">
            <section >
                {pinned.length ? <div className="pinned-section">Pinned</div> : ''}
                <div className="pinned-section-container">
                    {pinned
                        .map(note => <div key={note.id}><Note note={note} onDeleteNote={onDeleteNote} onChange={onChange} /></div>)}
                </div>
            </section>
            <section >
                {(pinned.length && pinned.length !== notes.length && other.length) ? <div className="others-section">Other Notes</div> : ''}
                <div className="others-section-container">
                    {notes
                        .filter(note => !note.isPinned && !note.isArchive)
                        .map(note => <div key={note.id}><Note note={note} onDeleteNote={onDeleteNote} onChange={onChange} /></div>)}
                </div>
            </section>
        </section >
    )
}
