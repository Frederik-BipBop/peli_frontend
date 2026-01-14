import { Link } from "react-router";
import facade from "../apiFacade.js";

export default function Nav() {
  const isLoggedIn = facade.loggedIn();

  function handleLogout() {
    facade.logout();
    window.location.assign("/login");
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

          {!isLoggedIn ? (
            <Link to="/login">Login</Link>
          ) : (
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
