import { Link } from "react-router";

export default function Nav() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="logo">PELI</div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/games">Games</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/jsx">JSX vs Vanilla</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
