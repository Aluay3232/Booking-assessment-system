const mapSrc =
  "https://www.google.com/maps?q=No%2018A,%20Off%20Angsoka%20Road,%20Jalan%20Bedara,%20Bukit%20Bintang,%2050200%20Kuala%20Lumpur,%20Wilayah%20Persekutuan%20Kuala%20Lumpur&output=embed";

const Contact = () => (
  <section className="container page">
    <div className="page-header">
      <h1>Visit the shop</h1>
      <p>We are in central Kuala Lumpur.</p>
    </div>

    <div className="split">
      <div className="card contact-card">
        <h2>Contact details</h2>
        <p>
          <strong>Address:</strong> No 18A, Off Angsoka Road, Jalan Bedara, Bukit Bintang, 50200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur
        </p>
        <p>
          <strong>Phone:</strong> +60 12-345 6789
        </p>
        <p>
          <strong>Email:</strong> hello@sharpfade.com
        </p>
        <div className="hours">
          <h3>Opening hours</h3>
          <p>Sunday - Thursday: 9:00 AM - 8:00 PM</p>
          <p>Friday - Saturday: 10:00 AM - 9:00 PM</p>
        </div>
      </div>

      <div className="map-card">
        <iframe
          className="map-iframe"
          title="Sharp Fade Barbershop Location"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

export default Contact;
