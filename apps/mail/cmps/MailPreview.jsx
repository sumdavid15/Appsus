const { useState, useEffect } = React

export function MailPreview({ mail, onMailClicked, onToggleDetails }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // useEffect(() => {}, [isExpanded])

  // useEffect(() => {}, [isStarred])

  function formatTime(time) {
    const now = Date.now()
    const date = new Date(time)
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    }
    const diff = now - time
    const diffInDays = diff / (1000 * 3600 * 24)
    const diffInHours = diff / (1000 * 3600)
    const diffInMinutes = diff / (1000 * 60)
    const diffInSeconds = diff / 1000

    if (diffInDays > 1) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    if (diffInHours > 1) {
      return `${Math.floor(diffInHours)} hours ago`
    }
    if (diffInMinutes > 1) {
      return `${Math.floor(diffInMinutes)} minutes ago`
    }
    if (diffInSeconds > 1) {
      return `Just now`
    }
  }

  function onStarClick(ev, mail) {
    ev.stopPropagation()
    setIsStarred(!isStarred)
    onMailClicked(mail, "isStarred")
  }

  function handleClick(ev, mail, prop) {
    ev.stopPropagation()
    onMailClicked(mail, prop)
  }

  return (
    <React.Fragment>
      <li
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`mail-preview ${mail.isRead ? "read" : "unread"}`}
        onClick={() => {
          setIsExpanded(!isExpanded)
          onMailClicked(mail, "isRead")
        }}
      >
        <span>
          <i
            className={`fa-star ${mail.isStarred ? "fas" : "far"}`}
            onClick={(ev) => onStarClick(ev, mail)}
          ></i>
        </span>
        <div className="main-mail-container">
          <span className="mail-from">{mail.from}</span>
          <span className="mail-subject">{mail.subject}</span>
          <span className="mail-seperator">-</span>
          <span className="mail-body">{mail.body}</span>
        </div>
        {!isHovered ? (
          <span className="mail-time">{formatTime(mail.sentAt)}</span>
        ) : (
          <span className="mail-options">
            <i
              title="Mark as read"
              className="fa-solid fa-envelope-open"
              onClick={(ev) => handleClick(ev, mail, "isRead")}
            ></i>
            <i
              title="Save as note"
              className="fa-solid fa-reply"
              onClick={(ev) => handleClick(ev, mail, "saveAsNote")}
            ></i>
            <i
              title="Delete"
              className="fa-solid fa-trash"
              onClick={(ev) => handleClick(ev, mail, "delete")}
            ></i>
          </span>
        )}
      </li>
      {isExpanded && (
        <div className="mail-expanded">
          <div className="mail-expanded-header">
            <i
              className="fa-solid fa-expand"
              onClick={() => onToggleDetails(mail)}
            ></i>
            <span className="mail-expanded-from">{mail.from}</span>
            <span className="mail-expanded-subject">{mail.subject}</span>
            <div className="mail-expanded-body">{mail.body}</div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
