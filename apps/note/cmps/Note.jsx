import { ColorPicker } from "./ColorPicker.jsx"
import { TodoList } from "./Todo.jsx"
import { NoteAddTag } from "./NoteAddTag.jsx"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function Note({ note, onDeleteNote, onChange }) {
    const [color, setColor] = useState(note.color)
    const [isPinned, setIsPinned] = useState(note.isPinned)

    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const navigate = useNavigate()

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

    const dynClass = isPinned ? 'isPinned' : ''

    return (
        <section className='note-card' style={{ backgroundColor: `${color}` }}>
            {renderNoteContent(note)}

            {note.label &&
                <div className="note-label-container">
                    {note.label.map(label => <button onClick={() => { console.log(`${label}`) }} key={utilService.makeId()} className="note-label">{label}</button>)}
                </div>}

            {!note.isArchive && <section className='note-action-section'>
                <div className="note-action-button-container">
                    <div title="Pin Note" className={`pinned ${dynClass}`} onClick={() => {
                        setIsPinned(!isPinned)
                        return onChange({
                            ...note,
                            isPinned: !isPinned
                        })
                    }}><i className="fa-solid fa-thumbtack"></i></div>
                    <ColorPicker color={color} onChange={(color) => {
                        setColor(color)
                        onChange({
                            ...note,
                            color,
                        })
                    }} />
                    <div className="duplicate-btn" title='Duplicate Note' onClick={duplicate}><i className="fa-solid fa-copy"></i></div>
                    {note.type !== 'todo' && (
                        <div onClick={() => {
                            navigate(`/mail/add/${note.noteTitle}&&${note.noteContent}`)
                            console.log(note.noteTitle);
                            console.log(note.noteContent);
                        }}>
                            <i className="fa-regular fa-envelope"></i>
                        </div>
                    )}
                    <div className="delete-btn" title='Delete Note' onClick={() => {
                        onDeleteNote(note)
                    }}><i className="fa-solid fa-trash"></i></div>
                    <NoteAddTag onChange={onChange} note={note} />
                </div>
            </section>
            }
            {
                note.isArchive && <section className="note-action-button-container">
                    <div title="Restore note" onClick={() => {
                        onChange({
                            ...note,
                            isArchive: false,
                        })
                    }}>
                        <i className="fa-solid fa-rotate-left"></i>
                    </div>
                    <div className="delete-btn" title='Delete Note' onClick={() => {
                        // onChange({
                        //     ...note, isArchive: true,
                        // })
                        onDeleteNote(note)
                    }}><i className="fa-solid fa-trash"></i></div>
                </section>
            }

        </section >
    )
}

