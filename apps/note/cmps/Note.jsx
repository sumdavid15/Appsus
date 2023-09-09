import { ColorPicker } from "./ColorPicker.jsx"
import { TodoList } from "./Todo.jsx"
import { NoteAddTag } from "./NoteAddTag.jsx"
import { utilService } from "../../../services/util.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

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

    const isTrash = note.isArchive

    function renderNoteContent(note) {

        switch (note.type) {
            case 'text':
                return (<React.Fragment>
                    <h1 ref={titleRef} contentEditable={`${!isTrash}`} onInput={_editText}></h1>
                    <p ref={contentRef} contentEditable={`${!isTrash}`} onInput={_editContent}></p>
                </React.Fragment>)
            case 'img':
                return <React.Fragment>
                    <img src={note.noteContent} alt="" />
                    <h1 ref={titleRef} contentEditable={`${!isTrash}`} onInput={_editText}></h1>
                </React.Fragment>
            case 'video':
                return <React.Fragment>
                    <iframe allow="fullscreen"
                        src={`https://www.youtube.com/embed/${getVideoId()}`}>
                    </iframe>
                    <h1 ref={titleRef} contentEditable={`${!isTrash}`} onInput={_editText}></h1>
                </React.Fragment>
            case 'todo':
                return <React.Fragment>
                    <h1 ref={titleRef} contentEditable={`${!isTrash}`} onInput={_editText}></h1>
                    <TodoList isTrash={isTrash} todos={note.todos} onChange={(todos) => onChange({
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
        showSuccessMsg('Note Duplicated')
    }

    function deleteLabel(tag) {
        if (note.isArchive) return showErrorMsg("Can't be edited in the trash")
        const labelIndex = note.label.findIndex(label => label === tag)
        note.label.splice(labelIndex, 1)
        onChange({ ...note })
        showSuccessMsg('Label deleted')
    }

    const dynClass = isPinned ? 'isPinned' : ''

    return (
        <section className='note-card' style={{ backgroundColor: `${color}` }}>
            {renderNoteContent(note)}

            {note.label &&
                <div className="note-label-container">
                    {note.label.map(label => {
                        const id = utilService.makeId()
                        return <button title="Label" className="note-label" style={{ padding: '5px 10px' }} key={id}>
                            {label}
                            <div className="label-delete-btn" title="Delete label" onClick={() => deleteLabel(label)}><i className="fa-solid fa-delete-left"></i></div>
                        </button>
                    })}
                </div>}

            {!note.isArchive && <section className='note-action-section'>
                <div className="note-action-button-container">
                    <div title="Pin Note" className={`pinned ${dynClass}`} onClick={() => {
                        setIsPinned(!isPinned)
                        showSuccessMsg(`Note ${!isPinned ? 'pinned' : 'unpinned'}`)
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
                        <div title="Send mail" className="mail-btn" onClick={() => {
                            navigate(`/mail/add/${note.noteTitle}&&${note.noteContent}`)
                        }}>
                            <i className="fa-regular fa-envelope"></i>
                        </div>
                    )}
                    <NoteAddTag onChange={onChange} note={note} />
                    <div className="delete-btn" title='Delete Note' onClick={() => {
                        onDeleteNote(note)
                    }}><i className="fa-solid fa-trash"></i></div>
                </div>
            </section>
            }
            {
                note.isArchive && <section className="note-action-button-container">
                    <div className="restore-note-btn" title="Restore note" onClick={() => {
                        showSuccessMsg('Note restored')
                        onChange({
                            ...note,
                            isArchive: false,
                        })
                    }}>
                        <i className="fa-solid fa-rotate-left"></i>
                    </div>
                    <div className="delete-btn" title='Delete Note' onClick={() => {
                        onDeleteNote(note)
                    }}><i className="fa-solid fa-trash"></i></div>
                </section>
            }

        </section >
    )
}

