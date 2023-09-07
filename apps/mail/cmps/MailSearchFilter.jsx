// mail filter by searchbar
// getting <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />

const { useState, useEffect } = React

export function MailSearchFilter({ onSetFilter, filterBy }) {
    const [searchBy, setSearchBy] = useState(filterBy.txt)

    useEffect(() => {
        const newFilterBy = { ...filterBy, txt: searchBy }
        onSetFilter(newFilterBy)
    }, [searchBy])

    function handleChange(ev) {
        setSearchBy(ev.target.value)
    }

    return (
        <section className="mail-search-filter">
            <input
                type="text"
                placeholder="Search mail"
                value={searchBy}
                onChange={handleChange}
            />
        </section>
    )
}
