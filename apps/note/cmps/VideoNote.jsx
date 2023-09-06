export function VideoNote({ note }) {
    return (
        <section className="note-card" style={{ backgroundColor: `${note.color}` }}>
            <h1>{note.noteTitle}</h1>
            <video src={note.noteContent} controls></video>
        </section>
    )
}