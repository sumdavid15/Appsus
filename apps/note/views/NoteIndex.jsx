import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.getNotes().then(setNotes)
    }, [])

    function addNote(note) {
        note.createdAt = Date.now()
        saveNote(note);
    }

    function saveNote(note) {
        noteService.saveNote(note).then((res) => noteService.getNotes()).then(setNotes);
    }

    function deleteNote(noteId) {
        setNotes(notes.filter(note => note.id !== noteId))
        noteService.deleteNote(noteId).then(() => noteService.getNotes()).then(setNotes)
    }

    return (
        <div className="note-index-container">
            <NoteAdd onCreate={addNote} />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <NoteList notes={notes} onDeleteNote={deleteNote} onChange={saveNote} />
            </div>
        </div >
    )
}
