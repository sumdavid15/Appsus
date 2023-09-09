const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { mailService } from "./apps/mail/services/mail.service.js"
import { MailAddModal } from "./apps/mail/cmps/MailAddModal.jsx"
import { NoteAdd } from "./apps/note/cmps/NoteAdd.jsx"


export function App() {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilterBy())
    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <Router>
            <section className="app">
                <AppHeader
                    onSetFilter={onSetFilter} filterBy={filterBy}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex
                        onSetFilter={onSetFilter} filterBy={filterBy}
                    />} />
                    <Route path="mail/:action" element={<MailIndex
                        onSetFilter={onSetFilter} filterBy={filterBy} />} />
                    <Route path="mail/:action/:desc" element={<MailIndex
                        onSetFilter={onSetFilter} filterBy={filterBy} />} />
                    <Route path="/note/:desc" element={<NoteIndex />} />
                    {/* <Route path="/book" element={<BookIndex />} /> */}
                    <Route path="/note" element={<NoteIndex />} />
                </Routes>
            </section>
        </Router>
    )
}