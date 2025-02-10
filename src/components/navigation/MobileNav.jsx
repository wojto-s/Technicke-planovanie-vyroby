import { Link } from "react-router-dom";

export function MobileNav({ active }) {
  return (
    <article className="mobile-nav d-block d-md-none">
      <nav className="nav justify-content-between">
        <Link to="/" className={`nav-link ${active === "/" ? "active" : ""}`}>
          <i className="icofont-ui-calendar"></i>
        </Link>
        <Link
          to="/historia"
          className={`nav-link ${active === "/historia" ? "active" : ""}`}
        >
          <i className="icofont-history"></i>
        </Link>
        <Link
          to="#"
          className={`nav-link ${active === "/stroje" ? "active" : ""}`}
        >
          <i className="icofont-vehicle-crane"></i>
        </Link>
        <Link
          to="/vyrobky"
          className={`nav-link ${active === "/vyrobky" ? "active" : ""}`}
        >
          <i className="icofont-box"></i>
        </Link>
        <Link
          to="/nova-vyroba"
          className={`nav-link ${active === "/nova-vyroba" ? "active" : ""}`}
        >
          <i className="icofont-meeting-add "></i>
        </Link>
      </nav>
    </article>
  );
}
