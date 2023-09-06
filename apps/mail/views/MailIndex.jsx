
// Mail App Like GMAIL

import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilterBy())

    useEffect(() => {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
    }, [filterBy])

    return <div>mail app</div>
}

