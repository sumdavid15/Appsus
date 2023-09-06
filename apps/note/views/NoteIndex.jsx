import { NoteAdd } from "../cmps/NoteAdd.jsx";

export function NoteIndex() {

    function createNote(note) {
        console.log(note);
    }

    return (
        <NoteAdd onCreate={createNote} />
    )

}
