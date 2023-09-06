export function ImgNote({ note }) {
    return (
        <section className="note-card" style={{ backgroundColor: `${note.color}` }}>
            <h1>{note.noteTitle}</h1>
            <img src={note.noteContent} alt="" />
        </section>
    )
}