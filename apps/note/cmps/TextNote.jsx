export function TextNote({ note }) {
    return (
        <section className="note-card" style={{ backgroundColor: `${note.color}` }}>
            <h1>{note.noteTitle}</h1>
            <p>{note.noteContent}</p>
        </section>
    )
}