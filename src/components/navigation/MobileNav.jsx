export function MobileNav({ active }) {
  return (
    <article className="mobile-nav d-block d-md-none">
      <nav className="nav justify-content-between">
        <a href="/" className={`nav-link ${active === "/" ? "active" : ""}`}>
          <i className="icofont-ui-calendar"></i>
        </a>
        <a
          href="/historia"
          className={`nav-link ${active === "/historia" ? "active" : ""}`}
        >
          <i className="icofont-history"></i>
        </a>
        <a
          href="#"
          className={`nav-link ${active === "/stroje" ? "active" : ""}`}
        >
          <i className="icofont-vehicle-crane"></i>
        </a>
        <a
          href="/vyrobky"
          className={`nav-link ${active === "/vyrobky" ? "active" : ""}`}
        >
          <i className="icofont-box"></i>
        </a>
        <a
          href="/nova-vyroba"
          className={`nav-link ${active === "/nova-vyroba" ? "active" : ""}`}
        >
          <i className="icofont-meeting-add "></i>
        </a>
      </nav>
    </article>
  );
}
