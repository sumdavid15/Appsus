import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailAddModal({ handleModal, showModal }) {
  const [mail, setMail] = useState(mailService.getEmptyEmail())

  useEffect(() => {
    if (showModal) {
      const handleClick = (ev) => {
        if (ev.target.className === "modal-backdrop") {
          onChange(ev, true)
        }
      }
      document.body.addEventListener("click", handleClick)
      return () => {
        document.body.removeEventListener("click", handleClick)
      }
    }
  }, [mail, showModal])

  function onSubmit(ev) {
    ev.preventDefault()
    const mail = mailService.getEmptyEmail()
    mail.to = ev.target.to.value
    mail.subject = ev.target.subject.value
    mail.body = ev.target.body.value
    handleModal(mail, "add")
  }

  function onChange(ev, draft = false) {
    const NewMail = { ...mail }
    NewMail[ev.target.name] = ev.target.value
    setMail(NewMail)

    if (draft) {
      NewMail.status = "draft"
      handleModal(NewMail, "draft")
    }
  }

  return (
    <React.Fragment>
      {showModal && (
        <div className="modal-backdrop">
          <div className="mail-add-modal">
            <div className="mail-add-modal-content">
              <span className="close" onClick={(ev) => onChange(ev, true)}>
                &times;
              </span>

              <h2>
                New Message {'  '}
                <span>
                  <i className="fa-solid fa-pencil"></i>
                </span>
              </h2>

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    name="from"
                    type="email"
                    placeholder="From.."
                    readOnly
                    disabled
                    value={mailService.getLoggedInUser().email}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="to"
                    onChange={onChange}
                    required
                    placeholder="To"
                  />
                </div>

                <div className="form-group">
                  <input
                    placeholder="Subject"
                    name="subject"
                    type="text"
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="body"
                    onChange={onChange}
                    required
                    placeholder="Type your message"
                  ></textarea>
                </div>

                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
