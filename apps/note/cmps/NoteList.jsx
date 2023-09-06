import { TextNote } from "./TextNote.jsx";
import { ImgNote } from "./ImgNote.jsx"
import { VideoNote } from "./VideoNote.jsx"

export function NoteList({ notes }) {
    console.log(notes);

    function noteType(note) {
        switch (note.type) {
            case 'text':
                return <TextNote note={note} />
            case 'img':
                return <ImgNote note={note} />
            case 'video':
                return <VideoNote note={note} />
            default:
        }
    }

    if (!notes.length) return <div>No notes Saved</div>

    return (
        <section className="note-list">
            {notes.map(note => <div key={note.id}>{noteType(note)}</div>)}
        </section>
    )
}
