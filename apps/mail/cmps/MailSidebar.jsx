import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailSidebar({ onSetFilter, filterBy, handleModal, mailList }) {
  const [statusFilter, setStatusFilter] = useState(filterBy.status)
  const [starredFilter, setStarredFilter] = useState(filterBy.isStarred)
  const [selected, setSelected] = useState("inbox")
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.action === "add") {
      handleModal()
    }
    if (params.action === "draft") {
      setStatusFilter("draft")
      setSelected("draft")
    }
    if (params.action === "sent") {
      setStatusFilter("sent")
      setSelected("sent")
    }
    if (params.action === "trash") {
      setStatusFilter("trash")
      setSelected("trash")
    }
    if (params.action === "starred") {
      setStarredFilter(true)
      setSelected("starred")
    }
  }, [params.action])

  useEffect(() => {
    const newFilterBy = {
      ...filterBy,
      status: statusFilter,
      isStarred: starredFilter,
    }
    onSetFilter(newFilterBy)
  }, [statusFilter])

  useEffect(() => {
    const newFilterBy = {
      ...filterBy,
      status: statusFilter,
      isStarred: starredFilter,
    }
    onSetFilter(newFilterBy)
  }, [starredFilter])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768)
    })
    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth <= 768)
      })
    }
  }, [])

  function handleChange(ev) {
    if (ev.target.name === "status") {
      setStatusFilter(ev.target.value)
      setStarredFilter(null)
      setSelected(ev.target.value)
    }
    if (ev.target.name === "starred") {
      setStarredFilter(ev.target.value)
      setStatusFilter("inbox")
      setSelected("starred")
    }

    if (ev.target.name === "starred") {
      navigate(`/mail/${ev.target.name}`)
    } else navigate(`/mail/${ev.target.value}`)
  }

  function getCount(filter) {
    const user = mailService.getLoggedInUser()
    const userEmail = user.email
    const emails = mailService.getAllMails()
    if (filter === "inbox") {
      return emails.filter((email) =>
        email.status === "inbox" && !email.removedAt ? email : null).length
    }
    if (filter === "starred") {
      return emails.filter((email) => email.isStarred).length
    }
    if (filter === "sent") {
      return emails.filter((email) =>
       email.from === userEmail && email.status !== 'draft').length
    }
    if (filter === "draft") {
      return emails.filter((email) => email.status === "draft").length
    }
    if (filter === "trash") {
      return emails.filter((email) => email.removedAt).length
    }
    return 0
  }
  

  return (
    <section className="mail-sidebar">
      <ul className="sidebar-container">
        <li className="add-btn" onClick={() => navigate("/mail/add")}>
          <i className="fa-solid fa-plus"></i>
          <span>New</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "inbox" } })
          }
          className={selected === "inbox" ? "active" : ""}
        >
          {selected === "inbox" ? (
            <i className="fa-regular fa-envelope-open">
              <p className="mail-count">{getCount("inbox")}</p>
            </i>
          ) : (
            <i className="fa-regular fa-envelope">
              <p className="mail-count">{getCount("inbox")}</p>
            </i>
          )}
          <span>Inbox</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "starred", value: true } })
          }
          className={selected === "starred" ? "active" : ""}
        >
          {selected === "starred" ? (
            <i className="fa-solid fa-star">
              <p className="mail-count">{getCount("starred")}</p>
            </i>
          ) : (
            <i className="fa-regular fa-star">
              <p className="mail-count">{getCount("starred")}</p>
            </i>
          )}
          <span>Starred
          </span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "sent" } })
          }
          className={selected === "sent" ? "active" : ""}
        >
          {selected === "sent" ? (
            <i className="fa-solid fa-paper-plane">
              <p className="mail-count">{getCount("sent")}</p>
            </i>
          ) : (
            <i className="fa-regular fa-paper-plane">
              <p className="mail-count">{getCount("sent")}</p>
            </i>
          )}
          <span>Sent</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "draft" } })
          }
          className={selected === "draft" ? "active" : ""}
        >
          {selected === "draft" ? (
            <i className="fa-solid fa-pen-to-square">
              <p className="mail-count">{getCount("draft")}</p>
            </i>
          ) : (
            <i className="fa-regular fa-pen-to-square">
              <p className="mail-count">{getCount("draft")}</p>
            </i>
          )}
          <span>Drafts</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "trash" } })
          }
          className={selected === "trash" ? "active" : ""}
        >
          {selected === "trash" ? (
            <i className="fa-solid fa-trash-can">
              <p className="mail-count">{getCount("trash")}</p>
            </i>
          ) : (
            <i className="fa-regular fa-trash-can">
              <p className="mail-count">{getCount("trash")}</p>
            </i>
          )}
          <span>Trash</span>
        </li>
        {!isMobile && (
          <React.Fragment>
            <li className="hiddenBar"></li>
            <li className="hiddenBar"></li>
            <li className="hiddenBar"></li>
            <li className="hiddenBar"></li>
            <li className="hiddenBar"></li>
          </React.Fragment>
        )}
      </ul>
    </section>
  )
}
