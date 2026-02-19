import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navigation = () => {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="container nav-wrapper">
        <div className="logo">
          <span>Sharp Fade</span>
          <small>Barbershop</small>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/booking" className={({ isActive }) => (isActive ? "active" : "")}>
            Book
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
          {token ? (
            <button className="btn ghost nav-button" type="button" onClick={handleLogout}>
              Logout {user?.name ? `(${user.name})` : ""}
            </button>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
