// note service
import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"

const NOTE_KEY = 'note-list'

_createBooks()

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

function _createBooks() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                "noteTitle": "Grocery List",
                "noteContent": "Milk, eggs, bread, and bananas",
                "type": "text",
                "color": "#ffc",
                "isPinned": false,
                "todos": [],
                "label": [
                    "grocery",
                    "thursday"
                ],
                "createdAt": 1694290245479,
                "id": "yyOup"
            },
            {
                "noteTitle": "Grocery List",
                "noteContent": "Milk, eggs, bread, and bananas.",
                "type": "text",
                "color": "#ffc",
                "isPinned": false,
                "todos": [],
                "label": [
                    "grocery"
                ],
                "createdAt": 1694290245479,
                "id": "l9Tmu",
                "isArchive": true
            },
            {
                "noteTitle": "Meeting Notes",
                "noteContent": "Discuss project timeline and goals",
                "type": "text",
                "color": "white",
                "isPinned": true,
                "todos": [],
                "label": [
                    "meeting"
                ],
                "createdAt": 1694290300219,
                "id": "0YtgK"
            },
            {
                "noteTitle": "",
                "noteContent": "",
                "type": "todo",
                "color": "#ccf",
                "isPinned": true,
                "todos": [
                    {
                        "id": "5IVMfo",
                        "text": "Send emails",
                        "completed": true
                    },
                    {
                        "id": "y6NWKP",
                        "text": "Attend the conference call",
                        "completed": false
                    }
                ],
                "label": [
                    "todo"
                ],
                "createdAt": 1694290361029,
                "id": "bf4f2"
            },
            {
                "noteTitle": "Birthday Gift Ideas",
                "noteContent": "",
                "type": "todo",
                "color": "#ccf",
                "isPinned": false,
                "todos": [
                    {
                        "id": "d2diwt",
                        "text": "Bookstore gift card",
                        "completed": false
                    },
                    {
                        "id": "8iJg3r",
                        "text": "Handmade card",
                        "completed": false
                    }
                ],
                "label": [],
                "createdAt": 1694290416411,
                "id": "zPEEC"
            },
            {
                "noteTitle": "Luna Park 2023",
                "noteContent": "https://untappedcities.com/wp-content/uploads/2023/03/coney-island-luna-park-2023-untapped-new-york1.jpg",
                "type": "img",
                "color": "white",
                "isPinned": true,
                "todos": [],
                "label": [
                    "fun"
                ],
                "createdAt": 1694290475325,
                "id": "Mt4wE"
            },
            {
                "noteTitle": "Travel Plans",
                "noteContent": "Destination: Paris, Date: June 15-20",
                "type": "text",
                "color": "#cfc",
                "isPinned": true,
                "todos": [],
                "label": [],
                "createdAt": 1694290517884,
                "id": "hkixj"
            },
            {
                "noteTitle": "Recipe",
                "noteContent": "Ingredients: Chicken, tomatoes, onions...",
                "type": "text",
                "color": "#add8e6",
                "isPinned": false,
                "todos": [],
                "label": [
                    "coocking"
                ],
                "createdAt": 1694290543391,
                "id": "DCXnj"
            },
            {
                "noteTitle": "Book Recommendations",
                "noteContent": "",
                "type": "todo",
                "color": "white",
                "isPinned": false,
                "todos": [
                    {
                        "id": "Xr6eTn",
                        "text": "The Alchemist' by Paulo Coelho",
                        "completed": true
                    },
                    {
                        "id": "CF1yFo",
                        "text": "Educated' by Tara Westover.",
                        "completed": true
                    }
                ],
                "label": [],
                "createdAt": 1694290586759,
                "id": "qM9jU"
            },
            {
                "noteTitle": "Day 1:",
                "noteContent": "- Arrive in Rome at 10:00 AM.\n- Check-in at the hotel.\n- Visit the Colosseum in the afternoon.\n- Dinner at a local Italian restaurant.",
                "type": "text",
                "color": "#cfc",
                "isPinned": true,
                "todos": [],
                "label": [],
                "createdAt": 1694290664428,
                "id": "g1bHi"
            },
            {
                "noteTitle": "Day 2:",
                "noteContent": "- Explore the Vatican City and St. Peter's Basilica.\n- Lunch at a trattoria near the Vatican.\n- Afternoon visit to the Roman Forum.\n- Evening stroll in Piazza Navona.",
                "type": "text",
                "color": "white",
                "isPinned": true,
                "todos": [],
                "label": [],
                "createdAt": 1694290683537,
                "id": "313Np"
            },
            {
                "noteTitle": "Incredible 80-year-old Man on Punching Bag",
                "noteContent": "https://www.youtube.com/watch?v=7VXxYNMSr8U&list=LL&index=14&ab_channel=IncredibleNation",
                "type": "video",
                "color": "white",
                "isPinned": false,
                "todos": [],
                "label": [],
                "createdAt": 1694290785544,
                "id": "jWkSk"
            },
            {
                "noteTitle": "JavaScript Tutorial ",
                "noteContent": "https://www.youtube.com/watch?v=W6NZfCO5SIk&t=30s&ab_channel=ProgrammingwithMosh",
                "type": "video",
                "color": "#add8e6",
                "isPinned": true,
                "todos": [],
                "label": [],
                "createdAt": 1694290848100,
                "id": "d6opC"
            },
            {
                "noteTitle": "Project Ideas",
                "noteContent": " Exploring new project ideas in web development and considering mobile app development. Exciting times ahead!",
                "type": "text",
                "color": "#ccf",
                "isPinned": false,
                "todos": [],
                "label": [],
                "createdAt": 1694290907261,
                "id": "2Orif"
            },
            {
                "noteTitle": "Home Improvement",
                "noteContent": "Planning to renovate the kitchen. Researching design ideas and gathering quotes from contractors. A big project in the works!",
                "type": "text",
                "color": "#add8e6",
                "isPinned": false,
                "todos": [],
                "label": [],
                "createdAt": 1694290935101,
                "id": "xXvCi"
            }
        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}