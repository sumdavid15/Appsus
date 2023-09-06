// mail service
import { utilService } from '../../../services/util.service.js'
import { asyncAs, asyncStorageServiceasyncStorageService } from '../../../services/async-storage.service.js'
import { asyncStorageService } from '../../../services/storage.service.js'
const EMAILS_KEY = 'emailsDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
   }

_createEmails()

// Email structure:
// {
//     id: utilService.makeId(),
//     subject: 'Wassap?',
//     body: 'Pick up!',
//     sentAt: Date.now(),
//     removedAt: null,
//     from: 'getUser().email',
//     to: 'john@gmail',
//    status: 'inbox',
//     isRead: false,
//     isStarred: false,
//     labels: []
// }

// FilterBy criteria:
// criteria = {
//     status: 'inbox',
//     txt: '',
//     isRead: false,
//     isStarred: false,
//     labels: []
// }

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getDefaultFilterBy
}

function query(filterBy = {}) {
    console.log('query');
    return asyncStorageService.query(EMAILS_KEY)
        .then(emails => {
            emails = _filterEmails(emails, filterBy)
            return emails
        })
}

function get(emailId) {
    return asyncStorageService.get(EMAILS_KEY, emailId)
    .then(email => {
        return email
    }
    )
}

function remove(emailId) {
    return asyncStorageService.remove(EMAILS_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return asyncStorageService.put(EMAILS_KEY, email)
    } else {
        return asyncStorageService.post(EMAILS_KEY, email)
    }
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser.email,
        to: '',
        status: 'draft',
        isRead: false,
        isStarred: false,
        labels: []
    }
}

function getDefaultFilterBy() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null,
        isStarred: null,
        labels: []
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
        emails = []
        for (let i = 0; i < 100; i++) {
            emails.push(_createEmail())
        }
        asyncStorageService.store(EMAILS_KEY, emails)
    }
    return emails
}

function _createEmail() {
    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(10),
        body: utilService.makeLorem(100),
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser.email,
        to: 'john@gmail',
        status: 'inbox',
        isRead: false,
        isStarred: false,
        labels: []
    }
}

function _filterEmails(emails, filterBy) {
    console.log(emails, 'emails');
    const { status, txt, isRead, isStarred, labels } = filterBy
    let filteredEmails = emails.filter(email => {
        return email.status === status
    }
    )
    if (txt) {
        filteredEmails = filteredEmails.filter(email => {
            return email.subject.toLowerCase().includes(txt.toLowerCase()) || email.body.toLowerCase().includes(txt.toLowerCase())
        }
        )
    }
    if (isRead !== null) {
        filteredEmails = filteredEmails.filter(email => {
            return email.isRead === isRead
        }
        )
    }
    if (isStarred !== null) {
        filteredEmails = filteredEmails.filter(email => {
            return email.isStarred === isStarred
        }
        )
    }
    if (labels.length) {
        filteredEmails = filteredEmails.filter(email => {
            return email.labels.some(label => {
                return labels.includes(label)
            }
            )
        }
        )
    }
    console.log('filteredEmails', filteredEmails);
    return filteredEmails
}
