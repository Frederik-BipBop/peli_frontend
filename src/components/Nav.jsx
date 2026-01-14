import { Link, useNavigate } from "react-router";
import facade from "../apiFacade.js";

export default function Nav() {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    facade.logout();
    navigate("/login");
  }

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="logo">PELI</div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/games">Games</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/jsx">JSX vs Vanilla</Link>

          {!facade.loggedIn() ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
