import { MailSearchFilter } from "../apps/mail/cmps/MailSearchFilter.jsx"
import { UserMsg } from "./UserMsg.jsx"

const { useState } = React
const { Link, NavLink, useLocation } = ReactRouterDOM

export function AppHeader({ onSetFilter, filterBy }) {
  const location = useLocation()
  const path = location.pathname

  const isMail = path.includes("/mail")
  const isNote = path.includes("/note")
  const [isOpened, setIsOpened] = useState(false)

  function toggleMenu() {
    setIsOpened(!isOpened)
  }

  return (
    <React-fragment>
      <header className="app-header">
        <Link to="/">
          <div className="logo">
            <img src="img/logo.png" alt="" />
            <span>Appsus</span>
          </div>
        </Link>

        {isMail && (
          <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        )}
        {/* {isNote && <h3>Note</h3>} */}
        <nav>
          <button
            className={`menu ${isOpened ? "opened" : ""}`}
            onClick={toggleMenu}
            aria-expanded={isOpened}
            aria-label="Main Menu"
          >
            <svg width="40" height="40" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
          {isOpened && (
            <div className="menu-container">
              <div>
                <NavLink to="/" onClick={toggleMenu}>
                  <section>
                    <img src="img/home.png" alt="" />
                    <span>Home</span>
                  </section>
                </NavLink>
                <NavLink to="/book" onClick={toggleMenu}>
                  <section>
                    <img src="img/books.png" alt="" />
                    <span>Books</span>
                  </section>
                </NavLink>
              </div>
              <div>
                <NavLink to="mail" onClick={toggleMenu}>
                  <section>
                    <img src="img/gmail.png" alt="" />
                    <span>Mail</span>
                  </section>
                </NavLink>
                <NavLink to="/note" onClick={toggleMenu}>
                  <section>
                    <img src="img/keeps.png" alt="" />
                    <span>Note</span>
                  </section>
                </NavLink>
              </div>
            </div>
          )}

          {/* <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink> */}
        </nav>
      </header>
      <UserMsg />
    </React-fragment>
  )
}
