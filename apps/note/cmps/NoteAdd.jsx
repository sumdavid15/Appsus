import { ColorPicker } from "./ColorPicker.jsx"
import { TodoList } from "./Todo.jsx"

const { useState } = React

export function NoteAdd({ onCreate }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [type, setType] = useState('text')
    const [color, setColor] = useState('white')
    const [isPinned, setIsPinned] = useState(false)
    const [todos, setTodos] = useState([]);

    function addNote() {
        const note = {
            noteTitle,
            noteContent,
            type,
            color,
            isPinned,
            todos,
        }
        onCreate(note)
        clearInput()
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
    return (
        <section className="note-input-container" style={{ backgroundColor: `${color}` }}>
            <form onSubmit={addNote}>
                <textarea style={{ backgroundColor: `${color}`, resize: 'none' }} value={noteTitle} onInput={(e) => setNoteTitle(e.target.value)} placeholder='Title' required />
                {type !== 'todo' && < textarea style={{ backgroundColor: `${color}`, resize: 'none' }} value={noteContent} onInput={(e) => setNoteContent(e.target.value)} placeholder={_placeholderType(type)} required />}
                {type === 'todo' && < TodoList todos={todos} onChange={setTodos} />}
                <section className='add-note-action-container'>
                    <div className="add-note-type-btn">
                        <div onClick={() => setType('text')}><i className="fa-solid fa-font"></i></div>
                        <div onClick={() => setType('img')}><i className="fa-regular fa-image"></i></div>
                        <div onClick={() => setType('video')}><i className="fa-solid fa-video"></i></div>
                        <div onClick={() => {
                            setType('todo')
                        }
                        }><i className="fa-regular fa-rectangle-list"></i></div>
                    </div>
                    <div>
                        <ColorPicker color={color} onChange={(color) => setColor(color)} />
                        <input title='Pin note' className='pinned'
                            type="checkbox"
                            checked={isPinned}
                            onChange={(e) => setIsPinned(e.target.checked)}
                        />
                    </div>
                    <button className="addnote-btn">Add</button>
                </section>
            </form >
        </section >
    )
}
// return (
//     <section className="note-input-container" style={{ backgroundColor: `${color}` }}>
//         <form onSubmit={addNote}>
//             <input value={noteTitle} onInput={(e) => setNoteTitle(e.target.value)} placeholder='Title' required />
//             <input value={noteContent} onInput={(e) => setNoteContent(e.target.value)} placeholder={_placeholderType(type)} required />
//             <select value={type} onChange={(e) => setType(e.target.value)}>
//                 <option value="text">Text</option>
//                 <option value="img">Image</option>
//                 <option value="video">Video</option>
//                 <option value="todo">Todo</option>
//             </select>
//             <ColorPicker color={color} onChange={(color) => setColor(color)} />
//             <input
//                 type="checkbox"
//                 checked={isPinned}
//                 onChange={(e) => setIsPinned(e.target.checked)}
//             />
//             <button>Add</button>
//         </form>
//     </section>
// )


// return (
//     <section className="note-input-container" style={{ backgroundColor: `${color}` }}>
//         <input value={noteTitle} onInput={(e) => setNoteTitle(e.target.value)} placeholder='Title' required />
//         <section className="add-note-type-btn">
//             <div onClick={() => setType('text')}><i className="fa-solid fa-font"></i></div>
//             <div onClick={() => setType('img')}><i className="fa-regular fa-image"></i></div>
//             <div onClick={() => setType('video')}><i className="fa-solid fa-video"></i></div>
//             <div onClick={() => setType('todo')}><i className="fa-regular fa-rectangle-list"></i></div>
//         </section>
//     </section>
// )