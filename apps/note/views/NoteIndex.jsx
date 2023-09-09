import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";
import { ArchiveNote } from "../cmps/ArchiveNote.jsx";
import { NoteSidebar } from "../cmps/NoteSidebar.jsx";
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js";


const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [archive, setArchive] = useState(false)

    const params = useParams()

    function getParams() {
        if (params.desc) {
            const descParams = params.desc
            return descParams.split('&&')
        }
        return ''
    }

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
        if (!note.isArchive) {
            note.isArchive = true;
            saveNote(note)
            showSuccessMsg('Note moved to trash')
        } else {
            noteService.deleteNote(note.id).then(() => noteService.getNotes()).then(setNotes)
            showSuccessMsg('Note deleted')
        }
    }


    return <React-fragment>
        <section>
            <div className="note-container">
                <div className="hidden-div"></div>
                <div className="note-sidebar">
                    <NoteSidebar archive={archive} setArchive={setArchive} />
                </div>
                {!archive && (
                    <div className="note-index-container">
                        {/* <input type="text" name="" id="" /> */}
                        <NoteAdd onCreate={addNote} getParams={getParams} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <NoteList notes={notes} onDeleteNote={deleteNote} onChange={saveNote} />
                        </div>
                    </div>
                )}
                {archive && <ArchiveNote notes={notes} onDeleteNote={deleteNote} onChange={saveNote} />}
            </div>
        </section>
    </React-fragment>
}

