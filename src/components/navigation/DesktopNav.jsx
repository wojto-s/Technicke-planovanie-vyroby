import { Link } from "react-router-dom";

export function DesktopNav({ active }) {
  function handleClearStorage(e) {
    localStorage.clear();
  }

  return (
    <article className="navigacka-menu d-none d-sm-none d-lg-flex flex-wrap align-content-between justify-content-center">
      <div>
        <h1>TPV</h1>
        <h5>Technické plánovanie výroby</h5>
      </div>
      <nav className="nav flex-column">
        <Link
          to="/"
          className={`nav-link home-nav mb-2 d-flex align-items-center ${
            active === "/" ? "active" : ""
          }`}
        >
          <i className="icofont-ui-calendar me-2 ms-4"></i>Kalendár
        </Link>
        <Link
          to="/historia"
          className={`nav-link historia-nav mb-2 d-flex align-items-center ${
            active === "/historia" ? "active" : ""
          }`}
        >
          <i className="icofont-history me-2 ms-4"></i>
          História
        </Link>
        <Link
          to="#"
          aria-disabled="true"
          className={`nav-link stroje-nav mb-2 d-flex align-items-center ${
            active === "/stroje" ? "active" : ""
          }`}
        >
          <i className="icofont-vehicle-crane me-2 ms-4"></i>
          Stroje
        </Link>
        <Link
          to="/vyrobky"
          className={`nav-link vyrobky-nav mb-2 d-flex align-items-center ${
            active === "/vyrobky" ? "active" : ""
          }`}
        >
          <i className="icofont-box me-2 ms-4"></i>
          Výrobky
        </Link>
        <Link
          to="/nova-vyroba"
          className={`nav-link nova-vyroba-nav mb-2 d-flex align-items-center ${
            active === "/nova-vyroba" ? "active" : ""
          }`}
        >
          <i className="icofont-meeting-add me-2 ms-4"></i>
          Pridaj Výrobu
        </Link>
      </nav>
      <div className="d-grid">
        <button className="btn-custom mb-2" onClick={handleClearStorage}>
          Clear Storage
        </button>
      </div>
    </article>
  );
}
