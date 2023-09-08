export function Home() {
  return (
    <section className="home-container">
      <section className="home">
        <img src="img/hero2.jpeg" className="hero-img" />

        <div className="hero-text">
          <h1>Appsus</h1>
          <h2>Experience our amazing friendly designed tools for free!</h2>
          <button className="hero-btn">
            <span className="hero-btn-text">Get Started!</span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
          </button>
        </div>
      </section>
      <h2 id="feature-text">Appsus Features</h2>
      <div className="feature-container">
        <div className="feature">
          <img src="img/gmail.png" alt="" />
          <h3>Mail</h3>
          <p>Send and receive mails with our encrypted mailing service</p>
          <button id="feature-btn" className="hero-btn">
            <span className="hero-btn-text">Jump in!</span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
          </button>
        </div>
        <div className="feature">
          <img src="img/keeps.png" alt="" />
          <h3>Notes</h3>
          <p>
            Quickly capture what's on your mind. Add notes and photos to Appsus
            Notes
          </p>
          <button id="feature-btn" className="hero-btn">
            <span className="hero-btn-text">Jump in!</span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
          </button>
        </div>
        <div className="feature">
          <img src="img/books.png" alt="" />
          <h3>Books</h3>
          <p>Search the world's most comprehensive index of full-text books</p>
          <button id="feature-btn" className="hero-btn">
            <span className="hero-btn-text">Jump in!</span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
          </button>
        </div>
      </div>
    </section>
  )
}
