import { ColorPicker } from "./ColorPicker.jsx"
import { TodoList } from "./Todo.jsx"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

const { useEffect } = React
const { useState } = React

export function NoteAdd({ onCreate, getParams }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [type, setType] = useState('text')
    const [color, setColor] = useState('white')
    const [isPinned, setIsPinned] = useState(false)
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const [title, content] = getParams()
        if (title || content) {
            setNoteTitle(title)
            setNoteContent(content)
        }
    }, [])

    function addNote() {
        if (!noteTitle && !noteContent && type !== 'todo') return
        const note = {
            noteTitle,
            noteContent,
            type,
            color,
            isPinned,
            todos,
            label: []
        }
        onCreate(note)
        clearInput()
        setTodos([])
        showSuccessMsg('Note Added')
        console.log(note);
    }

    function clearInput() {
        setNoteTitle('')
        setNoteContent('')
        setType('text')
        setColor('white')
        setIsPinned(false)
    }

    function _placeholderType(type) {
        if (type === 'text') return 'Type text'
        if (type === 'img') return 'Enter img url'
        if (type === 'video') return 'Enter video url'
    }

    const dynClass = isPinned ? 'isPinned' : ''

    return (
        <section className="note-input-container" style={{ backgroundColor: `${color}` }}>
            <form onSubmit={addNote}>
                <textarea style={{ backgroundColor: `${color}`, resize: 'none' }} value={noteTitle} onInput={(e) => setNoteTitle(e.target.value)} placeholder='Title' />
                {type !== 'todo' && < textarea style={{ backgroundColor: `${color}`, resize: 'none' }} value={noteContent} onInput={(e) => setNoteContent(e.target.value)} placeholder={_placeholderType(type)} />}
                {type === 'todo' && < TodoList todos={todos} onChange={setTodos} />}
                <section className='add-note-action-container'>
                    <div className="add-note-type-btn">
                        <div title="Text type note" onClick={() => setType('text')}><i className="fa-solid fa-font"></i></div>
                        <div title="Img type note" onClick={() => setType('img')}><i className="fa-regular fa-image"></i></div>
                        <div title="Video type note" onClick={() => setType('video')}><i className="fa-solid fa-video"></i></div>
                        <div title="Todo type note" onClick={() => {
                            setType('todo')
                        }
                        }><i className="fa-regular fa-rectangle-list"></i></div>
                    </div>
                    <div title='Pin note' className={`pinned ${dynClass}`}
                        onClick={(e) => setIsPinned(!isPinned)}>
                        <i className="fa-solid fa-thumbtack"></i>
                    </div>
                    <div>
                        <ColorPicker color={color} onChange={(color) => setColor(color)} />
                    </div>
                    <button title="Add note" className="addnote-btn">Add</button>
                </section>
            </form >
        </section >
    )
}
