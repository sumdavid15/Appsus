import { ColorPicker } from "./ColorPicker.jsx"
import { TodoList } from "./Todo.jsx"

const { useState, useEffect, useRef } = React

export function Note({ note, onDeleteNote, onChange }) {
    const [color, setColor] = useState(note.color)
    const [isPinned, setIsPinned] = useState(note.isPinned)

    const titleRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        if (titleRef.current) titleRef.current.innerText = note.noteTitle;
        if (contentRef.current) contentRef.current.innerText = note.noteContent;
    }, [])

    function getVideoId() {
        const url = note.noteContent
        const pattern = /v=([a-zA-Z0-9_-]+)/
        let match = url.match(pattern)

        if (!match) return ''
        return match[1]
    }


    function renderNoteContent(note) {

        switch (note.type) {
            case 'text':
                return (<React.Fragment>
                    <h1 ref={titleRef} contentEditable='true' onInput={_editText}></h1>
                    <p ref={contentRef} contentEditable='true' onInput={_editContent}></p>
                </React.Fragment>)
            case 'img':
                return <React.Fragment>
                    <img src={note.noteContent} alt="" />
                    <h1 ref={titleRef} contentEditable='true' onInput={_editText}></h1>
                </React.Fragment>
            case 'video':
                return <React.Fragment>
                    <iframe allow="fullscreen"
                        src={`https://www.youtube.com/embed/${getVideoId()}`}>
                    </iframe>
                    <h1 ref={titleRef} contentEditable='true' onInput={_editText}></h1>
                </React.Fragment>
            case 'todo':
                return <React.Fragment>
                    <h1 ref={titleRef} contentEditable='true' onInput={_editText}></h1>
                    <TodoList todos={note.todos} onChange={(todos) => onChange({
                        ...note,
                        todos
                    })} />
                </React.Fragment>
            default:
                return null
        }
    }

    function _editText(ev) {
        onChange({ ...note, noteTitle: ev.target.innerText })
    }

    function _editContent(ev) {
        onChange({ ...note, noteContent: ev.target.innerText })
    }

    function duplicate() {
        const { id, ...rest } = note
        onChange({ ...rest })
    }

    return (
        <section className='note-card' style={{ backgroundColor: `${color}` }}>
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
                    <div className="delete-btn" title='Delete Note' onClick={() => onDeleteNote(note.id)}><i className="fa-solid fa-trash"></i></div>
                    <input className='pinned' type="checkbox" checked={isPinned} onChange={() => {
                        setIsPinned(!isPinned)
                        return onChange({
                            ...note,
                            isPinned: !isPinned
                        })
                    }} />
                    <div className="duplicate-btn" title='Duplicate Note' onClick={duplicate}><i className="fa-solid fa-copy"></i></div>
                </div>
            </section>

        </section >
    )
}

/* <textarea type="text" value={title} onChange={(ev=>setTitle(ev.target.value))} /> */
/* <div title='Edit Note' onClick={() => setIsEdit(true)}><i className="fa-solid fa-pen-to-square"></i></div> */
