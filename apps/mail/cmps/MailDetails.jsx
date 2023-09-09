const { useEffect, useState } = React
export function MailDetails({ mail, onToggleDetails }) {
    const [selectedMail, setSelectedMail] = useState(mail)
    // option to add nav between mails

    useEffect(() => {
    }, [selectedMail])

    return (
        <section className="mail-details-container">
        <div id="mail-details" className="mail-expanded">
          <div className="mail-expanded-header">
            <i className="fa-solid fa-arrow-right" onClick={() => onToggleDetails(null)}></i>
            <i className="fa-regular fa-trash-can" onClick={() => console.log('delete')}></i>
            <span className="mail-expanded-from">{mail.from}</span>
            <span className="mail-expanded-subject">{mail.subject}</span>
          <div className="mail-expanded-body">{mail.body}</div>
          </div>
        </div>
        </section>
    )
}