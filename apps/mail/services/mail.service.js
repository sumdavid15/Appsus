// mail service
import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"
const EMAILS_KEY = "emailsDB"

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
}

const readyEmails = [
  {
    id: utilService.makeId(),
    subject: "Discussing Project Update",
    body: "Let's talk about the latest project update during our meeting this Friday.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "john@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: ["important"],
  },
  {
    id: utilService.makeId(),
    subject: "Party Planning",
    body: "We need to plan for the office party. Please join us on Friday to discuss the details.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "partyplanner@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: ["social"],
  },
  {
    id: utilService.makeId(),
    subject: "Weekly Team Meeting",
    body: "Let's review the progress of our weekly team goals in our Friday meeting.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "teamlead@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: [],
  },
  {
    id: utilService.makeId(),
    subject: "Important Announcement",
    body: "We have an important announcement to make during our Friday meeting. Please be prepared.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "admin@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: true,
    isStarred: false,
    labels: ["important"],
  },
  {
    id: utilService.makeId(),
    subject: "Training Session",
    body: "We have a training session scheduled for this Friday. Don't forget to bring your materials.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "trainer@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: ["training"],
  },
  {
    id: utilService.makeId(),
    subject: "Product Launch Meeting",
    body: "Join us this Friday to discuss the launch plan for our new product.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "productmanager@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: [],
  },
  {
    id: utilService.makeId(),
    subject: "Project Deadline Reminder",
    body: "This Friday, we have a project deadline. Make sure all tasks are completed by then.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "projectmanager@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: ["deadline"],
  },
  {
    id: utilService.makeId(),
    subject: "Team Building Event",
    body: "Join us for a team building event this Friday. It will be a fun and productive day!",
    sentAt: 1674956483000,
    removedAt: null,
    from: "teambuilding@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: ["social"],
  },
  {
    id: utilService.makeId(),
    subject: "New Project Proposal",
    body: "We have a new project proposal to discuss during our Friday meeting. Your input is crucial.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "projectlead@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: true,
    isStarred: true,
    labels: ["important"],
  },
  {
    id: utilService.makeId(),
    subject: "Marketing Campaign Update",
    body: "Get ready for the marketing campaign update in our Friday meeting. It's going to be exciting!",
    sentAt: 1674956483000,
    removedAt: null,
    from: "marketingteam@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: ["marketing"],
  },
  {
    id: utilService.makeId(),
    subject: "Discussing Project Update",
    body: "Let's talk about the latest project update during our meeting this Friday.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "john@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: ["important"],
  },
  {
    id: utilService.makeId(),
    subject: "Party Planning",
    body: "We need to plan for the office party. Please join us on Friday to discuss the details.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "partyplanner@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: ["social"],
  },
  {
    id: utilService.makeId(),
    subject: "Weekly Team Meeting",
    body: "Let's review the progress of our weekly team goals in our Friday meeting.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "teamlead@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: [],
  },
  {
    id: utilService.makeId(),
    subject: "Important Announcement",
    body: "We have an important announcement to make during our Friday meeting. Please be prepared.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "admin@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: true,
    isStarred: false,
    labels: ["important"],
  },
  {
    id: utilService.makeId(),
    subject: "Training Session",
    body: "We have a training session scheduled for this Friday. Don't forget to bring your materials.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "trainer@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: ["training"],
  },
  {
    id: utilService.makeId(),
    subject: "Product Launch Meeting",
    body: "Join us this Friday to discuss the launch plan for our new product.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "productmanager@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: [],
  },
  {
    id: utilService.makeId(),
    subject: "Project Deadline Reminder",
    body: "This Friday, we have a project deadline. Make sure all tasks are completed by then.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "projectmanager@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: true,
    labels: ["deadline"],
  },
  {
    id: utilService.makeId(),
    subject: "Team Building Event",
    body: "Join us for a team building event this Friday. It will be a fun and productive day!",
    sentAt: 1674956483000,
    removedAt: null,
    from: "teambuilding@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: ["social"],
  },
  {
    id: utilService.makeId(),
    subject: "New Project Proposal",
    body: "We have a new project proposal to discuss during our Friday meeting. Your input is crucial.",
    sentAt: 1674956483000,
    removedAt: null,
    from: "projectlead@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: true,
    isStarred: true,
    labels: ["important"],
  },
  {
    id: utilService.makeId(),
    subject: "Marketing Campaign Update",
    body: "Get ready for the marketing campaign update in our Friday meeting. It's going to be exciting!",
    sentAt: 1674956483000,
    removedAt: null,
    from: "marketingteam@email.com",
    to: "user@appsus.com",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: ["marketing"],
  },
]

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
  getDefaultFilterBy,
  getLoggedInUser,
}

function query(filterBy = {}) {
  return asyncStorageService.query(EMAILS_KEY).then((emails) => {
    emails = _filterEmails(emails, filterBy)
    return emails
  })
}

function get(emailId) {
  return asyncStorageService.get(EMAILS_KEY, emailId).then((email) => {
    return email
  })
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
    id: null,
    subject: "",
    body: "",
    sentAt: Date.now(),
    removedAt: null,
    from: loggedinUser.email,
    to: "",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: [],
  }
}

function getLoggedInUser() {
  return loggedinUser
}

function getDefaultFilterBy() {
  return {
    status: "inbox",
    txt: "",
    isRead: null,
    isStarred: null,
    labels: [],
  }
}

function _createEmails() {
  let emails = storageService.loadFromStorage(EMAILS_KEY)
  if (!emails || !emails.length) {
    emails = readyEmails
    storageService.saveToStorage(EMAILS_KEY, emails)
  }
}

function _createEmail() {
  return {
    id: utilService.makeId(),
    subject: utilService.makeLorem(3),
    body: utilService.makeLorem(100),
    sentAt: Date.now(),
    removedAt: null,
    from: loggedinUser.email,
    to: "john@gmail",
    status: "inbox",
    isRead: false,
    isStarred: false,
    labels: [],
  }
}

function _filterEmails(emails, filterBy) {
  const { status, txt, isRead, isStarred, labels } = filterBy
  console.log(status);
  let filteredEmails = emails.filter((email) => {
    return email.status === status
  })

    // filteredEmails = filteredEmails.filter((email) => {
    //     if (email.removedAt) return false
    //     return true
    // })

  if (txt) {
    filteredEmails = filteredEmails.filter((email) => {
      return (
        email.subject.toLowerCase().includes(txt.toLowerCase()) ||
        email.body.toLowerCase().includes(txt.toLowerCase()) ||
        email.from.toLowerCase().includes(txt.toLowerCase()) ||
        email.to.toLowerCase().includes(txt.toLowerCase())
      )
    })
  }
  if (isRead !== null) {
    filteredEmails = filteredEmails.filter((email) => {
      return email.isRead === isRead
    })
  }
  if (isStarred !== null) {
    filteredEmails = filteredEmails.filter((email) => {
      return email.isStarred === isStarred
    })
  }
  if (labels.length) {
    filteredEmails = filteredEmails.filter((email) => {
      return email.labels.some((label) => {
        return labels.includes(label)
      })
    })
  }
  return filteredEmails
}
