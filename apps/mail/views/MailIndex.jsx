// Mail App Like GMAIL

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailSearchFilter } from "../cmps/MailSearchFilter.jsx"
import { MailSidebar } from "../cmps/MailSidebar.jsx"
import { MailAddModal } from "../cmps/MailAddModal.jsx"

const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilterBy())
  const [showModal, setShowModal] = useState(false)

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
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function onMailClicked(mail, prop) {
    if (prop === "isRead") {
      mail.isRead = true
    }
    if (prop === "isStarred") {
      mail.isStarred = !mail.isStarred
    }
    mailService.save(mail).then(() => {
      mailService.query(filterBy).then((mails) => {
        setMails(mails)
      })
    })
  }

  function handleModal(mail, prop) {
    setShowModal(!showModal)
    if (prop === "add") {
        console.log('mail', mail);
        mailService.save(mail).then(() => {
            mailService.query(filterBy).then((mails) => {
            setMails(mails)
            })
        })
    }
    if (prop === "draft") {
        mailService.save(mail).then(() => {
            mailService.query(filterBy).then((mails) => {
            setMails(mails)
            })
        })
  }
}

  return (
    <section className="mail-index">
      <MailAddModal handleModal={handleModal} showModal={showModal} />
      <h1>Mail Index</h1>
      <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <br />
      <section className="mail-container">
        <MailSidebar
          onSetFilter={onSetFilter}
          filterBy={filterBy}
          handleModal={handleModal}
        />
        <MailList mails={mails} onMailClicked={onMailClicked} />
      </section>
    </section>
  )
}
