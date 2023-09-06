import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    console.log(notes);

    useEffect(() => {
        asyncStorageService.query('note-list').then(setNotes)
    }, [])

    function createNote(note) {
        note.createdAt = Date.now()
        noteService.saveNote(note).then((res) => asyncStorageService.query('note-list')).then(setNotes)
        console.log(note);
    }

    return (
        <div className="note-index-container">
            <NoteAdd onCreate={createNote} />
            <NoteList notes={notes} />
        </div>
    )
}
