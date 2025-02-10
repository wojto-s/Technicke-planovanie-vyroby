import { Link } from "react-router-dom";

export function MobileNav({ active, setEditing }) {
  const handleSetPridat = () => {
    setEditing(false);
  };

  return (
    <article className="mobile-nav d-block d-md-none">
      <nav className="nav justify-content-between">
        <Link to="/" className={`nav-link ${active === "/" ? "active" : ""}`}>
          <i className="fa-solid fa-calendar-days"></i>
        </Link>
        <Link
          to="/historia"
          className={`nav-link ${active === "/historia" ? "active" : ""}`}
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
        </Link>
        <Link
          to="#"
          className={`nav-link ${active === "/stroje" ? "active" : ""}`}
        >
          <i className="fa-solid fa-wrench"></i>
        </Link>
        <Link
          to="/vyrobky"
          className={`nav-link ${active === "/vyrobky" ? "active" : ""}`}
        >
          <i class="fa-solid fa-box"></i>
        </Link>
        <Link
          to="/nova-vyroba"
          className={`nav-link ${active === "/nova-vyroba" ? "active" : ""}`}
          onClick={handleSetPridat}
        >
          <i className="fa-solid fa-plus"></i>
        </Link>
      </nav>
    </article>
  );
}
