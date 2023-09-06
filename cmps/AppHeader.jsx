const { Link, NavLink, useLocation } = ReactRouterDOM

export function AppHeader() {
    const location = useLocation()
    const path = location.pathname

    const isMail = path.includes('/mail')
    const isNote = path.includes('/note')


    return <header className="app-header">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <nav>

            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
