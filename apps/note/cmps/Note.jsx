import { ColorNote } from "./ColorNote.jsx"

const { useState } = React

export function Note({ note, onDeleteNote, onChange }) {
    const [color, setColor] = useState(note.color)

    function renderNoteContent(note) {
        switch (note.type) {
            case 'text':
                return <p>{note.noteContent}</p>
            case 'img':
                return <img src={note.noteContent} alt="" />
            case 'video':
                return <video src={note.noteContent} controls></video>
            default:
        }
    }

    return (
        <section className="note-card" style={{ backgroundColor: `${color}` }}>
            <h1>{note.noteTitle}</h1>
            {renderNoteContent(note)}
            <button onClick={() => onDeleteNote(note.id)}><i className="fa-solid fa-trash"></i></button>
            <ColorNote color={color} onChange={(color) => {
                setColor(color)
                onChange({
                    ...note,
                    color,
                })
            }} />
            <input type="checkbox"  />
        </section>
    )
}
// value={ } onChange={ }