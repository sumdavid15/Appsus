import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailAddModal({ handleModal, showModal }) {
    const [mail, setMail] = useState(mailService.getEmptyEmail())

  function submitoo(ev) {
    ev.preventDefault()
    const mail = mailService.getEmptyEmail()
    mail.to = ev.target.to.value
    mail.subject = ev.target.subject.value
    mail.body = ev.target.body.value
    handleModal(mail, 'add')
  }

  function onChange(ev, draft = false) {
    const NewMail = { ...mail }
    NewMail[ev.target.name] = ev.target.value
    setMail(NewMail)
    if (draft) {
        NewMail.status = 'draft'
        handleModal(NewMail, 'draft')
    }
  }

  return (

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

    <React.Fragment>
      {showModal && (
        <div className="mail-add-modal">
          <div className="mail-add-modal-content">
            <span className="close" onClick={(ev) => onChange(ev, true)}>
              &times;
            </span>
            <p>New message</p>
          </div>
          <form onSubmit={submitoo}>
            <label htmlFor="from">From:</label>
            <input
                type="text"
                id="from"
                name="from"
                value={mailService.getLoggedInUser().email}
                readOnly
            />
            <label htmlFor="to">To:</label>
            <input type="text" id="to" name="to" onChange={onChange} required />
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" onChange={onChange} name="subject" required />
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              placeholder="Write something.."
              onChange={onChange}
              required
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </React.Fragment>
  )
}
