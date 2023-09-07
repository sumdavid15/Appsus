// Mail App Like GMAIL

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailSearchFilter } from "../cmps/MailSearchFilter.jsx"
import { MailSidebar } from "../cmps/MailSidebar.jsx"
import { MailAddModal } from "../cmps/MailAddModal.jsx"
import { MailSortBy } from "../cmps/MailSortBy.jsx"

const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilterBy())
  const [sortBy, setSortBy] = useState(mailService.getDefaultSortBy())
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log('sortbyEffect', sortBy);
    mailService
      .query(filterBy, sortBy)
      .then((mails) => {
        setMails(mails)
      })
      .catch((err) => {
        console.log("Cannot load mails", err)
      })
  }, [filterBy, sortBy])

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function onSetSortBy(sortBy) {
    setSortBy((prevSort) => ({ ...prevSort, ...sortBy }))
  }

  function onMailClicked(mail, prop) {
    if (prop === "isRead") {
      mail.isRead = true
    }
    if (prop === "isStarred") {
      mail.isStarred = !mail.isStarred
    }
    if (prop === "saveAsNote") {
      console.log('Waiting for david');
    }
    if (prop === "delete") {
      mail.removedAt = Date.now()
      console.log('mail', mail);
    }

    mailService.save(mail).then(() => {
      mailService.query(filterBy, sortBy).then((mails) => {
        setMails(mails)
      })
    })
  }

  function handleModal(mail, prop) {
    setShowModal(!showModal)
    if (prop === "add") {
        mailService.save(mail).then(() => {
            mailService.query(filterBy, sortBy).then((mails) => {
            setMails(mails)
            })
        })
    }
    if (prop === "draft") {
      if(mail.to === '' || mail.subject === '' || mail.body === '') return
        mail.sentAt = null
        mailService.save(mail).then(() => {
            mailService.query(filterBy, sortBy).then((mails) => {
            setMails(mails)
            })
        })
  }
}

  return (
    <section className="mail-index">
      <MailAddModal handleModal={handleModal} showModal={showModal} />
      
      {/* <h1>Mail Index</h1> */}
      {/* <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
      {/* <br /> */}

      <section className="mail-container">
        <MailSidebar
          onSetFilter={onSetFilter}
          filterBy={filterBy}
          handleModal={handleModal}
        />
        <MailList mails={mails} onMailClicked={onMailClicked} onSetSortBy={onSetSortBy} sortBy={sortBy} />
      </section>
    </section>
  )
}
