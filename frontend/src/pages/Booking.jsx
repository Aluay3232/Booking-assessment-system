import { useEffect, useRef, useState } from "react";
import api from "../api.js";

const emptyForm = {
  customer_name: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dateInputRef = useRef(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/appointments");
      setAppointments(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.customer_name || !form.phone || !form.service || !form.date || !form.time) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/api/appointments/${editingId}`, form);
      } else {
        await api.post("/api/appointments", form);
      }
      resetForm();
      fetchAppointments();
    } catch (err) {
      setError("Unable to save the appointment.");
    }
  };

  const handleEdit = (appointment) => {
    setForm({
      customer_name: appointment.customer_name,
      phone: appointment.phone,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes || "",
    });
    setEditingId(appointment.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      setError("Unable to delete the appointment.");
    }
  };

  const openDatePicker = () => {
    const input = dateInputRef.current || document.getElementById("date");
    if (input && typeof input.showPicker === "function") {
      input.showPicker();
    } else if (input) {
      input.focus();
      input.click();
    }
  };

  return (
    <section className="container page">
      <div className="page-header">
        <h1>Book an appointment</h1>
        <p>Reserve a spot with your preferred service and time.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label htmlFor="customer_name">Full name *</label>
            <input
              id="customer_name"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Ahmed Hassan"
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+20 100 000 000"
              required
            />
          </div>
          <div>
            <label htmlFor="service">Service *</label>
            <input
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              placeholder="Signature Fade"
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date *</label>
            <div className="date-input">
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                onKeyDown={(event) => event.preventDefault()}
                onPaste={(event) => event.preventDefault()}
                ref={dateInputRef}
                required
              />
              <button
                className="date-button"
                type="button"
                onClick={openDatePicker}
                aria-label="Open calendar"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1.5A2.5 2.5 0 0 1 22 6.5v13A2.5 2.5 0 0 1 19.5 22h-15A2.5 2.5 0 0 1 2 19.5v-13A2.5 2.5 0 0 1 4.5 4H6V3a1 1 0 0 1 1-1Zm11 7H6v9.5c0 .276.224.5.5.5h11a.5.5 0 0 0 .5-.5V9ZM6 7h12V6.5a.5.5 0 0 0-.5-.5H18v1a1 1 0 1 1-2 0V6H8v1a1 1 0 1 1-2 0V6h-.5a.5.5 0 0 0-.5.5V7Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="time">Time *</label>
            <input
              id="time"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add preferences or notes"
            rows="3"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button className="btn primary" type="submit">
            {editingId ? "Update appointment" : "Create appointment"}
          </button>
          {editingId && (
            <button className="btn ghost" type="button" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="section">
        <div className="section-header">
          <h2>Upcoming appointments</h2>
          <button className="btn ghost" type="button" onClick={fetchAppointments}>
            Refresh
          </button>
        </div>
        {loading ? (
          <p>Loading appointments...</p>
        ) : (
          <div className="card-grid">
            {appointments.length === 0 && <p>No appointments scheduled yet.</p>}
            {appointments.map((appointment) => (
              <div className="card appointment-card" key={appointment.id}>
                <div>
                  <h3>{appointment.customer_name}</h3>
                  <p>
                    {appointment.service} · {appointment.date} at {appointment.time}
                  </p>
                  {appointment.notes && <p className="muted">{appointment.notes}</p>}
                </div>
                <div className="card-actions">
                  <button
                    className="btn ghost"
                    type="button"
                    onClick={() => handleEdit(appointment)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn danger"
                    type="button"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default Booking;
