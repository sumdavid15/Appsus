import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";
import { ArchiveNote } from "../cmps/ArchiveNote.jsx";


const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [archive, setArchive] = useState(false)

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

    function deleteNote(note) {
        console.log(note);
        console.log('note.isArchive:', note.isArchive)
        if (!note.isArchive) {
            note.isArchive = true;
            // setNotes(notes.filter(note => !note.isArchive))
            saveNote(note)
        } else {
            console.log('note: Else', note)
            // setNotes(notes.filter(note => note.isArchive))
            // saveNote(note)
            noteService.deleteNote(note.id).then(() => noteService.getNotes()).then(setNotes)
        }
    }

    return <React-fragment>
        {!archive && (
            <div className="note-index-container">
                <NoteAdd onCreate={addNote} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <NoteList notes={notes} onDeleteNote={deleteNote} onChange={saveNote} />
                </div>
                <button onClick={() => setArchive(true)}>Archive</button>
            </div>
        )}
        {archive && <ArchiveNote setArchive={setArchive} notes={notes} onDeleteNote={deleteNote} onChange={saveNote} />}
    </React-fragment>
}

//     !archive &&
//     <div className="note-index-container" >
//         <NoteAdd onCreate={addNote} />
//         <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//         }}>
//             <NoteList notes={notes} onDeleteNote={deleteNote} onChange={saveNote} />
//         </div>
//         <button onClick={() => setArchive(true)}>Archive</button>
//     </div >
// )

{/* <Link to={`/archive`}>
    <button className="archive">
    Archive
    </button>
</Link> */}