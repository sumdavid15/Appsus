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

  useEffect(() => {
    console.log("isExpanded", isExpanded)
  }, [isExpanded])

    useEffect(() => {
        console.log('isStarred', isStarred);
    }, [isStarred])

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
    console.log("star clicked", mail.id);
    onMailClicked(mail, "isStarred")
    setIsStarred(!isStarred)
  }

// if no mails, show no mails


  return (
    <React.Fragment>
      {/* <li className="mail-preview" onClick={() => onMailClick(mail.id)}> */}
      <li
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
        <span className="mail-sent-at">{formatTime(mail.sentAt)}</span>
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

{
  /* <span>
                <i className="fa-solid fa-star"></i>
            </span>
            <div className="main-mail-container">
                <span className="mail-from">{mail.from}</span>
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-seperator">-</span>
                <span className="mail-body">{mail.body}</span>
            </div>
            <span className="mail-sent-at">{formatTime(mail.sentAt)}</span>
        </li> */
}
