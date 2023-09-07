// MAIL LIST
// RENDER MAILPREVIEW FOR EACH MAIL

import { MailPreview } from "./MailPreview.jsx"
import { MailSortBy } from "./MailSortBy.jsx"

export function MailList({ mails, onMailClicked, onSetSortBy, sortBy }) {

  return (
    <section className="mail-list-container">
      {mails.length !== 0 && <MailSortBy onSetSortBy={onSetSortBy} sortBy={sortBy} />}
      
      <ul className={`clean-list mail-list ${mails.length === 0 ? 'empty' : ''}`}>
        {mails.length === 0 && 
          <div className="empty-mail-list">
            <h1>Nothing to see here..</h1>
            <span>Try to add a <a href="#/mail" className="link">new mail</a></span>
          </div>
        }
        {mails.map((mail) => (
          <MailPreview
            key={mail.id}
            mail={mail}
            onMailClicked={onMailClicked}
          />
        ))}
      </ul>
    </section>
  )
}
