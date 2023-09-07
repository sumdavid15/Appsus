const { useState, useEffect } = React

// const { useState, useEffect } = React

// export function MailSearchFilter({ onSetFilter, filterBy }) {
//     const [searchBy, setSearchBy] = useState(filterBy.txt)

//     useEffect(() => {
//         const newFilterBy = { ...filterBy, txt: searchBy }
//         console.log('newFilterBy', newFilterBy);
//         onSetFilter(newFilterBy)
//     }, [searchBy])

//     function handleChange(ev) {
//         setSearchBy(ev.target.value)
//     }

//     return (
//         <section className="mail-search-filter">
//             <input
//                 type="text"
//                 placeholder="Search mail"
//                 value={searchBy}
//                 onChange={handleChange}
//             />
//         </section>
//     )
// }

export function MailSidebar({ onSetFilter, filterBy, handleModal }) {
  // criteria = {
  //     status: 'inbox',
  //     txt: '',
  //     isRead: false,
  //     isStarred: false,
  //     labels: []
  // }

  const [statusFilter, setStatusFilter] = useState(filterBy.status)
  const [starredFilter, setStarredFilter] = useState(filterBy.isStarred)
  const [selected, setSelected] = useState("inbox")

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

  function handleChange(ev) {
    if (ev.target.name === "status") {
        console.log('ev.target.value', ev.target.value);
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
          className={selected === "drafts" ? "active" : ""}
        >
          {selected === "drafts" ? (
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
      </ul>
    </section>
  )
}

/* <section className="mail-sidebar">
<br />
<ul className="sidebar-container">
  <li
    onClick={() => onSetFilter({ folder: "inbox" })}
    className={filterBy.folder === "inbox" ? "active" : ""}
  >
    <i className="fa-solid fa-inbox"></i>
    Inbox
  </li>
  <li
    onClick={() => onSetFilter({ folder: "starred" })}
    className={filterBy.folder === "starred" ? "active" : ""}
  >
    <i className="fa-solid fa-star"></i>
    Starred
  </li>
  <li
    onClick={() => onSetFilter({ folder: "sent" })}
    className={filterBy.folder === "sent" ? "active" : ""}
  >
    <i className="fa-solid fa-paper-plane"></i>
    Sent
  </li>
  <li
    onClick={() => onSetFilter({ folder: "drafts" })}
    className={filterBy.folder === "drafts" ? "active" : ""}
  >
    <i className="fa-solid fa-file-edit"></i>
    Drafts
  </li>
  <li
    onClick={() => onSetFilter({ folder: "trash" })}
    className={filterBy.folder === "trash" ? "active" : ""}
  >
    <i className="fa-solid fa-trash"></i>
    Trash
  </li>
</ul>
</section> */
