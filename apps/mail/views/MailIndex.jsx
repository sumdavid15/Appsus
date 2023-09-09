// Mail App Like GMAIL

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailSearchFilter } from "../cmps/MailSearchFilter.jsx"
import { MailSidebar } from "../cmps/MailSidebar.jsx"
import { MailAddModal } from "../cmps/MailAddModal.jsx"
import { MailSortBy } from "../cmps/MailSortBy.jsx"
import { showErrorMsg, showSuccessMsg , showUserMsg } from "../../../services/event-bus.service.js"


const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function MailIndex({ onSetFilter, filterBy }) {
  const [mails, setMails] = useState([])
  const [sortBy, setSortBy] = useState(mailService.getDefaultSortBy())
  const [showModal, setShowModal] = useState(false)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    mailService
      .query(filterBy, sortBy)
      .then((mails) => {
        setMails(mails)
      })
      .catch((err) => {
        console.log("MailIndex: err in query", err)
        showErrorMsg("Cannot load mails")
      })
  }, [filterBy, sortBy])

  function onSetSortBy(sortBy) {
    setSortBy((prevSort) => ({ ...prevSort, ...sortBy }))
  }

  function onRemoveMail(mail) {
    console.log("ON REMOVE MAIL", mail)
    mailService.remove(mail.id).then(() => {
      mailService.query(filterBy, sortBy).then((mails) => {
        setMails(mails)
        console.log('here');
        showSuccessMsg("Mail removed successfully")
      })
    })
  }

  function onMailClicked(mail, prop) {
    if (prop === "isRead") {
      mail.isRead = true
    }
    if (prop === "isStarred") {
      mail.isStarred = !mail.isStarred
      showSuccessMsg(`Mail ${mail.isStarred ? "starred" : "unstarred"} successfully`)
    }
    if (prop === "saveAsNote") {
      navigate(`/note/${mail.subject}&&${mail.body}`)
    }
    mailService.save(mail).then(() => {
      mailService.query(filterBy, sortBy).then((mails) => {
        setMails(mails)
      })
    })
    if (prop === "delete") {
      if (mail.removedAt !== null) {
        onRemoveMail(mail)
      } else {
        mail.removedAt = Date.now()
      }
    }
  }

  function handleModal(mail, prop) {
    setShowModal(!showModal)
    if (prop === "add") {
      mailService.save(mail).then(() => {
        mailService.query(filterBy, sortBy).then((mails) => {
          setMails(mails)
          showSuccessMsg("Mail sent successfully")
        })
      })
    }
    if (prop === "draft") {
      if (mail.to === "" || mail.subject === "" || mail.body === "") return
      mail.sentAt = null
      mailService.save(mail).then(() => {
        mailService.query(filterBy, sortBy).then((mails) => {
          setMails(mails)
          showUserMsg("Mail saved as draft")
        })
      })
    }
  }

  return (
    <section className="mail-index">
      <MailAddModal handleModal={handleModal} showModal={showModal} />

      {/* <h1>Mail Index</h1> */}
      {/* <br /> */}

      <section className="mail-container">
        <MailSidebar
          onSetFilter={onSetFilter}
          filterBy={filterBy}
          handleModal={handleModal}
          mailList={mails}
        />
        <MailList
          mails={mails}
          onMailClicked={onMailClicked}
          onSetSortBy={onSetSortBy}
          sortBy={sortBy}
        />
      </section>
    </section>
  )
}
