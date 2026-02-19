import { Link } from "react-router-dom";

const Home = () => (
  <section className="container page">
    <div className="hero">
      <div>
        <h1>Fresh cuts. Sharp fades. Confident look.</h1>
        <p>
          Sharp Fade Barbershop delivers modern grooming with classic service.
          Book your next cut in minutes and arrive with confidence.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/booking">
            Book an appointment
          </Link>
          <Link className="btn ghost" to="/contact">
            Find us
          </Link>
        </div>
      </div>
      <div className="hero-card">
        <h3>Today’s highlights</h3>
        <ul>
          <li>Walk-ins welcome before 2 PM</li>
          <li>Free beard trim with haircut</li>
          <li>Student discount on weekdays</li>
        </ul>
      </div>
    </div>

    <div className="section">
      <h2>Popular services</h2>
      <div className="card-grid">
        <div className="card">
          <h3>Signature Fade</h3>
          <p>Precision fade with a clean lineup and wash.</p>
        </div>
        <div className="card">
          <h3>Beard Sculpt</h3>
          <p>Shape, trim, and hot towel finish.</p>
        </div>
        <div className="card">
          <h3>Full Groom</h3>
          <p>Haircut, beard, and styling consultation.</p>
        </div>
      </div>
    </div>

    <div className="section split">
      <div>
        <h2>Why clients choose us</h2>
        <p>
          From classic cuts to modern fades, our barbers focus on detail, clean
          lines, and a relaxed experience. We value your time and keep the shop
          running on schedule.
        </p>
      </div>
      <div className="info-list">
        <div>
          <h4>Experienced barbers</h4>
          <p>10+ years of combined grooming expertise.</p>
        </div>
        <div>
          <h4>Easy booking</h4>
          <p>Reserve a slot online and skip the wait.</p>
        </div>
        <div>
          <h4>Premium products</h4>
          <p>Quality tools and products for healthy hair.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Home;
