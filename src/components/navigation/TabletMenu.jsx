import { Link } from "react-router-dom";
import { useRef } from "react";

export function TabletMenu({ active, setEditing }) {
  const handleSetPridat = () => {
    setEditing(false);
  };

  const navRef = useRef(null);
  const togglerRef = useRef(null);
  const togglerExpRef = useRef(null);

  const handleNavExpand = () => {
    if (navRef.current) navRef.current.classList.toggle("nav-collapsed");
    if (togglerRef.current) togglerRef.current.classList.toggle("toggler-hide");
    if (togglerExpRef.current)
      togglerExpRef.current.classList.toggle("toggler-hide");
  };

  return (
    <article className="tablet-menu d-none d-sm-none d-md-block d-lg-none align-content-between justify-content-center">
      <div className="nav-toggler">
        <span
          onClick={handleNavExpand}
          ref={togglerRef}
          className="nav-toggler-btn"
        >
          <i className="fa-solid fa-bars"></i>
        </span>
        <div
          ref={togglerExpRef}
          className="d-flex justify-content-between align-items-center toggler-hide"
        >
          <h1 className="nav-logo mb-0">TPV</h1>
          <span
            onClick={handleNavExpand}
            className="nav-toggler-btn nav-toggler-close"
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
      </div>
      <nav ref={navRef} className="nav flex-column nav-collapsed mt-4">
        <Link to="/" className="nav-link d-flex align-items-center">
          <div className={`d-flex ${active === "/" ? "active" : ""}`}>
            <span>
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <span className="nav-label">Kalendár</span>
          </div>
        </Link>
        <Link to="/historia" className="nav-link d-flex align-items-center">
          <div className={`d-flex ${active === "/historia" ? "active" : ""}`}>
            <span>
              <i className="fa-solid fa-clock-rotate-left"></i>
            </span>
            <span className="nav-label">História</span>
          </div>
        </Link>
        <Link
          to="#"
          aria-disabled="true"
          className="nav-link d-flex align-items-center"
        >
          <div className={`d-flex ${active === "#" ? "active" : ""}`}>
            <span>
              <i className="fa-solid fa-wrench"></i>
            </span>
            <span className="nav-label">Stroje</span>
          </div>
        </Link>
        <Link to="/vyrobky" className="nav-link d-flex align-items-center">
          <div className={`d-flex ${active === "/vyrobky" ? "active" : ""}`}>
            <span>
              <i className="fa-solid fa-box"></i>
            </span>
            <span className="nav-label">Výrobky</span>
          </div>
        </Link>
        <Link
          to="/nova-vyroba"
          className="nav-link nova-vyroba-nav mb-2 d-flex align-items-center"
          onClick={handleSetPridat}
        >
          <div
            className={`d-flex ${active === "/nova-vyroba" ? "active" : ""}`}
          >
            <span>
              <i className="fa-solid fa-plus"></i>
            </span>
            <span className="nav-label">Pridaj Výrobu</span>
          </div>
        </Link>
      </nav>
      <div className="d-grid"></div>
    </article>
  );
}
