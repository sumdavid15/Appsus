// MAIL LIST
// RENDER MAILPREVIEW FOR EACH MAIL

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails }) {
  return (
    <section className="mail-list">
        <ul className="clean-list mail-list">
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
        </ul>
    </section>
  )
}