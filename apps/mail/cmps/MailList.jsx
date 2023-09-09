// MAIL LIST
// RENDER MAILPREVIEW FOR EACH MAIL

import { MailPreview } from "./MailPreview.jsx"
import { MailSortBy } from "./MailSortBy.jsx"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailList({ mails, onMailClicked, onSetSortBy, sortBy }) {
  const [isDetailsShown, setIsDetailsShown] = useState(false)
  const [selectedMail, setSelectedMail] = useState(null)

  useEffect(() => {
    console.log(mails);
  }, [isDetailsShown])

  function onToggleDetails(mail) {
    setIsDetailsShown(!isDetailsShown)
    if (mail === null) setSelectedMail(null)
    else setSelectedMail(mail)
  }

  return (
    <section className="mail-list-container">
      {mails.length !== 0 && (
        <MailSortBy
          onSetSortBy={onSetSortBy}
          sortBy={sortBy}
          onToggleDetails={onToggleDetails}
        />
      )}

      <ul
        className={`clean-list mail-list ${mails.length === 0 ? "empty" : ""}`}
      >
        {mails.length === 0 && (
          <div className="empty-mail-list">
            <h1>Nothing to see here..</h1>
            <span>
              Try to add a{" "}
              <Link to="/mail/add" className="link">
                new mail
              </Link>
            </span>
          </div>
        )}
        {isDetailsShown && (
          <MailDetails mail={selectedMail} onToggleDetails={onToggleDetails} />
        )}
        {!isDetailsShown &&
          mails.map((mail) => (
            <MailPreview
              key={mail.id}
              mail={mail}
              onMailClicked={onMailClicked}
              onToggleDetails={onToggleDetails}
              mailsList={mails}
            />
          ))}
      </ul>
    </section>
  )
}
