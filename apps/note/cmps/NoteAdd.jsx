const { useState } = React

export function NoteAdd({ onCreate }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [type, setType] = useState('text')
    const [color, setColor] = useState('#cfc')
    const [isPinned, setIsPinned] = useState(false)

    function addNote() {
        const note = {
            noteTitle,
            noteContent,
            type,
            color,
            isPinned,
        }
        onCreate(note)
        clearInput()
    }

    function clearInput() {
        setNoteTitle('')
        setNoteContent('')
        setType('text')
        setColor('#cfc')
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
                <input value={noteTitle} onInput={(e) => setNoteTitle(e.target.value)} placeholder='Title' required />
                <input value={noteContent} onInput={(e) => setNoteContent(e.target.value)} placeholder={_placeholderType(type)} required />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="img">Image</option>
                    <option value="video">Video</option>
                </select>
                <select value={color} onChange={(e) => setColor(e.target.value)}>
                    <option value="#cfc">1</option>
                    <option value="#ccf">2</option>
                    <option value="#ffc">3</option>
                    <option value="rgb(173, 216, 230)">4</option>
                </select>
                <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                />
                <button>Add</button>
            </form>
        </section>
    )
}
