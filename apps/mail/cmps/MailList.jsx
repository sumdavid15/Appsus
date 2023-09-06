// MAIL LIST
// RENDER MAILPREVIEW FOR EACH MAIL

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onMailClicked }) {

  return (
    <section className="mail-list-container">
        {mails.length === 0 && <h1>No Mails</h1>}
      <ul className="clean-list mail-list">
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
