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

const { useState, useEffect } = React

export function MailPreview({ mail, onMailClicked }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {}, [isExpanded])

  useEffect(() => {}, [isStarred])

  function formatTime(time) {
    // formate timestamp to 11/11/23
    const date = new Date(time)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
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
        className={`mail-preview ${mail.isRead ? "read" : ""}`}
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
            <i title="Mark as read" className="fa-solid fa-envelope-open" onClick={(ev) => handleClick(ev, mail, 'isRead')}></i>
            <i title="Save as note" className="fa-solid fa-reply" onClick={(ev) => handleClick(ev, mail, 'saveAsNote')}></i>
            <i title="Delete" className="fa-solid fa-trash" onClick={(ev) => handleClick(ev, mail, 'delete')}></i>
          </span>
        )}
        </li>
      {isExpanded && (
        <div className="mail-expanded">
          <div className="mail-expanded-header">
            <i className="fa-solid fa-expand"></i>
            <span className="mail-expanded-from">{mail.from}</span>
            <span className="mail-expanded-subject">{mail.subject}</span>
          </div>
          <div className="mail-expanded-body">{mail.body}</div>
        </div>
      )}
    </React.Fragment>
  )
}
