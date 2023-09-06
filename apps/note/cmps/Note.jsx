import { ColorPicker } from "./ColorPicker.jsx"
import { utilService } from "../../../services/util.service.js"
import { TodoList } from "./Todo.jsx"

const { useState, useRef } = React

export function Note({ note, onDeleteNote, onChange }) {
    const [color, setColor] = useState(note.color)
    const [isPinned, setIsPinned] = useState(note.isPinned)
    const degRef = useRef(utilService.getRandomIntInclusive(-4, 4))

    function renderNoteContent(note) {
        switch (note.type) {
            case 'text':
                return <p>{note.noteContent}</p>
            case 'img':
                return <img src={note.noteContent} alt="" />
            case 'video':
                return <video src={note.noteContent} controls></video>
            case 'todo':
                return < TodoList />
            default:
        }
    }

    function duplicate() {
        const { id, ...rest } = note
        onChange({ ...rest })
    }

    return (
        <section className="note-card" style={{ backgroundColor: `${color}`, transform: `rotate(${degRef.current}deg)` }}>
            <h1>{note.noteTitle}</h1>
            {renderNoteContent(note)}
            <ColorPicker color={color} onChange={(color) => {
                setColor(color)
                onChange({
                    ...note,
                    color,
                })
            }} />
            <div onClick={() => onDeleteNote(note.id)}><i className="fa-solid fa-trash"></i></div>
            <input type="checkbox" checked={isPinned} onChange={() => {
                setIsPinned(!isPinned)
                return onChange({
                    ...note,
                    isPinned: !isPinned
                })
            }} />
            <div onClick={duplicate}><i className="fa-solid fa-copy"></i></div>
        </section>
    )
}
