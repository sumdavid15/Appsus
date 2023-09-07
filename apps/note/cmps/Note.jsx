import { ColorPicker } from "./ColorPicker.jsx"
import { TodoList } from "./Todo.jsx"

const { useState } = React

export function Note({ note, onDeleteNote, onChange }) {
    const [color, setColor] = useState(note.color)
    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [title, setTitle] = useState(note.noteTitle)

    // const degRef = useRef(utilService.getRandomIntInclusive(-2, 2))

    function renderNoteContent(note) {
        switch (note.type) {
            case 'text':
                return <p contenteditable='true'>{note.noteContent}</p>
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
        <section className='note-card' style={{ backgroundColor: `${color}` }}>
            <h1 contenteditable='true'>{note.noteTitle}</h1>

            {renderNoteContent(note)}

            <section className='note-action-section'>
                <div className="note-action-button-container">
                    <ColorPicker color={color} onChange={(color) => {
                        setColor(color)
                        onChange({
                            ...note,
                            color,
                        })
                    }} />
                    <div title='Delete Note' onClick={() => onDeleteNote(note.id)}><i className="fa-solid fa-trash"></i></div>
                    <input className='pinned' type="checkbox" checked={isPinned} onChange={() => {
                        setIsPinned(!isPinned)
                        return onChange({
                            ...note,
                            isPinned: !isPinned
                        })
                    }} />
                    <div title='Duplicate Note' onClick={duplicate}><i className="fa-solid fa-copy"></i></div>
                </div>
            </section>

        </section >
    )
}

        /* <textarea type="text" value={title} onChange={(ev=>setTitle(ev.target.value))} /> */
                    /* <div title='Edit Note' onClick={() => setIsEdit(true)}><i className="fa-solid fa-pen-to-square"></i></div> */
