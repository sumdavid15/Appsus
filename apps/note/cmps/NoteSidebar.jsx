
export function NoteSidebar() {

    return (
        <section className="mail-sidebar">
        <ul className="sidebar-container">
          <li>
                <i className="fa-regular fa-envelope"></i>
            <span>Inbox</span>
          </li>
          <li>
                <i className="fa-regular fa-trash-can"></i>
            <span>Trash</span>
          </li>
        </ul>

                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>
                      <li className="hiddenBar"></li>     
      </section>
    )
}