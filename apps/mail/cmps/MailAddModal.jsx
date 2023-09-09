import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailAddModal({ handleModal, showModal }) {
  const [mail, setMail] = useState(mailService.getEmptyEmail())
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()
  const params = useParams()

  useEffect (() => {
    const descParams = params.desc
    if (params.desc) {
    const [title, content] = descParams.split('&&')
    setTitle(title)
    setContent(content)
    }
  },[])

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
    navigate('/mail')
    setTitle('')
    setContent('')
  }

  function onChange(ev, draft = false) {
    const NewMail = { ...mail }
    NewMail[ev.target.name] = ev.target.value
    const prop = ev.target.name
    setMail(NewMail)

    if (prop === 'subject') setTitle(ev.target.value)

    if (prop === 'body') setContent(ev.target.value)

    if (draft) {
      NewMail.status = "draft"
      handleModal(NewMail, "draft")
      navigate('/mail')
      setTitle('')
      setContent('')
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
                    value={title}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="body"
                    onChange={onChange}
                    required
                    placeholder="Type your message"
                    value={content}
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
