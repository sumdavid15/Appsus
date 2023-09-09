const { useState, useEffect } = React

export function MailSidebar({ onSetFilter, filterBy, handleModal }) {

  const [statusFilter, setStatusFilter] = useState(filterBy.status)
  const [starredFilter, setStarredFilter] = useState(filterBy.isStarred)
  const [selected, setSelected] = useState("inbox")
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const newFilterBy = {
      ...filterBy,
      status: statusFilter,
      isStarred: starredFilter,
    }
    onSetFilter(newFilterBy)
  }, [statusFilter])

  useEffect(() => {
    const newFilterBy = {
      ...filterBy,
      status: statusFilter,
      isStarred: starredFilter,
    }
    onSetFilter(newFilterBy)
  }, [starredFilter])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768)
    })
    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth <= 768)
      })
    }
  }, [])


  function handleChange(ev) {
    if (ev.target.name === "status") {
      setStatusFilter(ev.target.value)
      setStarredFilter(null)
      setSelected(ev.target.value)
    }
    if (ev.target.name === "starred") {
      setStarredFilter(ev.target.value)
      setStatusFilter("inbox")
      setSelected("starred")
    }
  }

  return (
    <section className="mail-sidebar">
      <ul className="sidebar-container">
        <li className="add-btn" onClick={handleModal}>
          <i className="fa-solid fa-plus"></i>
          <span>New</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "inbox" } })
          }
          className={selected === "inbox" ? "active" : ""}
        >
          {selected === "inbox" ? (
            <i className="fa-regular fa-envelope-open"></i>
          ) : (
            <i className="fa-regular fa-envelope"></i>
          )}
          <span>Inbox</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "starred", value: true } })
          }
          className={selected === "starred" ? "active" : ""}
        >
          {selected === "starred" ? (
            <i className="fa-solid fa-star"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
          <span>Starred</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "sent" } })
          }
          className={selected === "sent" ? "active" : ""}
        >
          {selected === "sent" ? (
            <i className="fa-solid fa-paper-plane"></i>
          ) : (
            <i className="fa-regular fa-paper-plane"></i>
          )}

          <span>Sent</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "draft" } })
          }
          className={selected === "draft" ? "active" : ""}
        >
          {selected === "draft" ? (
            <i className="fa-solid fa-pen-to-square"></i>
          ) : (
            <i className="fa-regular fa-pen-to-square"></i>
          )}
          <span>Drafts</span>
        </li>
        <li
          onClick={() =>
            handleChange({ target: { name: "status", value: "trash" } })
          }
          className={selected === "trash" ? "active" : ""}
        >
          {selected === "trash" ? (
            <i className="fa-solid fa-trash-can"></i>
          ) : (
            <i className="fa-regular fa-trash-can"></i>
          )}
          <span>Trash</span>
        </li>
        {!isMobile && (
          <React.Fragment>
                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>
          </React.Fragment>           
        )}
      </ul>
    </section>
  )
}