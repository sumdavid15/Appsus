const { useState, useEffect } = React

export function MailSortBy({ onSetSortBy, sortBy }) {
  const [sort, setSort] = useState(sortBy)

  useEffect(() => {
    console.log("sort", sort)
    onSetSortBy(sort)
  }, [sort])

  function handleChange(ev) {
    setSort({ ...sort, [ev.target.name]: ev.target.value })
  }

  return (
    <section className="mail-sort-by">
      <div className="sortby-container">
        <h1>Inbox</h1>
        <div className="radio-inputs">
          <label className="radio">
            <input
              type="radio"
              name="sortByType"
              value="date"
              onChange={handleChange}
              checked={sort.sortByType === "date"}
            />
            <span className="name">
              <i className="fa-regular fa-calendar"></i>
              Date
            </span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="sortByType"
              value="title"
              onChange={handleChange}
              checked={sort.sortByType === "title"}
            />
            <span className="name">
              <i className="fa-solid fa-font"></i>
              Title
            </span>
          </label>
        </div>
      </div>
    </section>
  )
}
