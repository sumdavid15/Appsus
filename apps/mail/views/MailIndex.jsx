// Mail App Like GMAIL

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailSearchFilter } from "../cmps/MailSearchFilter.jsx"

const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilterBy())
    console.log('filterByyy', filterBy);
  useEffect(() => {
    mailService
      .query(filterBy)
      .then((mails) => {
        setMails(mails)
      })
      .catch((err) => {
        console.log("Cannot load mails", err)
      })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!mails) return <div>Loading...</div>

  return (
    <section className="mail-index">
      <h1>Mail Index</h1>
      <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <MailList mails={mails} />
    </section>
  )
}