// note service
import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"

const NOTE_KEY = 'note-list'

export const noteService = {
    saveNote,
}

function saveNote(note) {
    asyncStorageService.post(NOTE_KEY, note)
}
