
export function NoteSidebar({ archive, setArchive }) {

  return (
    <section id="note-side-bar" className="mail-sidebar" style={{
      marginTop: 20
    }}>
      <ul id="note-side-bar-container" className="sidebar-container" >
        <li onClick={() => setArchive(false)} className={!archive ? 'active' : ''}>
          <i className="fa-regular fa-note-sticky"></i>
          <span >Notes</span>
        </li>
        <li onClick={() => setArchive(true)} className={archive ? 'active' : ''}>
          <i className="fa-regular fa-trash-can"></i>
          <span >Trash</span>
        </li>
      </ul>
    </section >
  )
}