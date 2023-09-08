
import { Note } from "./Note.jsx";

export function NoteList({ notes, onDeleteNote, onChange }) {

    if (!notes.length) return <div>No notes Saved</div>

    const pinned = notes.filter(note => note.isPinned);

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
                {(pinned.length && pinned.length !== notes.length) ? <div className="others-section">Other Notes</div> : ''}
                <div className="others-section-container">
                    {notes
                        .filter(note => !note.isPinned)
                        .map(note => <div key={note.id}><Note note={note} onDeleteNote={onDeleteNote} onChange={onChange} /></div>)}
                </div>
            </section>
        </section >
    )
}
