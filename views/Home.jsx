const { Link, NavLink, useLocation } = ReactRouterDOM


export function Home() {

    function scrollToFeatures() {
        document.getElementById("feature-text").scrollIntoView({behavior: "smooth"});
    }
    

  return (
    <section className="home-container">
      <section className="home">
        <img src="img/hero2.jpeg" className="hero-img" />

        <div className="hero-text">
          <h1>Appsus</h1>
          <h2>Experience our amazing friendly designed tools for free!</h2>
          <button className="hero-btn" onClick={scrollToFeatures}>
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
          <Link to="/mail">
          <button id="feature-btn" className="hero-btn">
            <span className="hero-btn-text">Jump in!</span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
          </button>
            </Link>
        </div>
        <div className="feature">
          <img src="img/keeps.png" alt="" />
          <h3>Notes</h3>
          <p>
            Quickly capture what's on your mind. Add notes and photos to Appsus
            Notes
          </p>
          <Link to="/note">
          <button id="feature-btn" className="hero-btn">
            <span className="hero-btn-text">Jump in!</span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
            <span className="hero-blob"></span>
          </button>
            </Link>
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
      <h2 id="feature-text">Our Team</h2>
      <div className="cards-container">
        {/* DAVID */}
      <div className="card">
          <div className="card__content">
            <div>
            <img src="img/avatar.png" alt="" />
            </div>
            <div className="card-info">
                <h1>David Tadevosian</h1>
            21 years old from Kadima, Israel. Always trying to learn new things! Studying web development in Coding-Academy.
            </div>
            <div className="card-links">
                <i className="fab fa-github"></i>
                <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
        {/* DANIEL */}
        <div className="card">
          <div className="card__content">
            <div>
            <img src="img/avatar.png" alt="" />
            </div>
            <div className="card-info">
                <h1>Daniel Levy</h1>
            25 years old from Jerusalem, Israel. Always trying to learn new things! Studying web development in Coding-Academy.
            </div>
            <div className="card-links">
                <i className="fab fa-github"></i>
                <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>
    </section>
  )
}
