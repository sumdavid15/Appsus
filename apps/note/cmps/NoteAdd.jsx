import { noteService } from "../services/note.service.js"

const { useState } = React

export function NoteAdd({ onCreate }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [type, setType] = useState('NoteTxt')
    const [color, setColor] = useState('black')
    const [isPinned, setIsPinned] = useState(false)

    function addNote() {
        const note = {
            noteTitle,
            noteContent,
            type,
            color,
            isPinned,
        }
        onCreate(note)
    }

    return (
        <section className="note-input-container">
            <input value={noteTitle} onInput={(e) => setNoteTitle(e.target.value)} />
            <input value={noteContent} onInput={(e) => setNoteContent(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="text">Text</option>
                <option value="img">Image</option>
                <option value="video">Video</option>
            </select>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
            </select>
            <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
            />
            <button onClick={addNote}>Add</button>
        </section>
    )
}
