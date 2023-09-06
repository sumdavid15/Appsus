// note service
import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"

const NOTE_KEY = 'note-list'

export const noteService = {
    saveNote,
    getNotes,
    deleteNote,
}

function saveNote(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function getNotes() {
    return asyncStorageService.query(NOTE_KEY)
}

function deleteNote(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}