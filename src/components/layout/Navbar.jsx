import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        AlgoRhythm
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/sorting"
          className={({ isActive }) =>
            `navbar-link ${isActive ? "navbar-link--active" : ""}`
          }
        >
          Sorting
        </NavLink>
        <NavLink
          to="/graphs"
          className={({ isActive }) =>
            `navbar-link ${isActive ? "navbar-link--active" : ""}`
          }
        >
          Graphs
        </NavLink>
      </div>
    </nav>
  );
}
