import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function NavContent() {
  function handleClearStorage(e) {
    localStorage.clear();
  }

  const location = useLocation();
  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(location.pathname);
    document.title = getTitle(location.pathname);
  }, [location.pathname]);

  const getTitle = (path) => {
    switch (path) {
      case "/historia":
        return "TPV | História";
      case "/stroje":
        return "TPV | Stroje";
      case "/vyrobky":
        return "TPV | Výrobky";
      case "/nova-vyroba":
        return "TPV | Nová výroba";
      default:
        return "TPV";
    }
  };

  return (
    <article className="navigacka-menu d-flex flex-wrap align-content-between justify-content-center">
      <div>
        <h1>TPV</h1>
        <h5>Technické plánovanie výroby</h5>
      </div>
      <nav className="nav flex-column">
        <a
          className={`nav-link home-nav mb-2 d-flex align-items-center ${
            active === "/" ? "active" : ""
          }`}
          aria-current="page"
          href="/"
        >
          <i className="icofont-ui-calendar me-2 ms-4"></i>
          Kalendár
        </a>
        <a
          className={`nav-link historia-nav mb-2 d-flex align-items-center ${
            active === "/historia" ? "active" : ""
          }`}
          href="/historia"
        >
          <i className="icofont-history me-2 ms-4"></i>
          História
        </a>
        <a
          className={`nav-link stroje-nav mb-2 d-flex align-items-center ${
            active === "/stroje" ? "active" : ""
          }`}
          href="#"
          aria-disabled="true"
        >
          <i className="icofont-vehicle-crane me-2 ms-4"></i>
          Stroje
        </a>
        <a
          className={`nav-link vyrobky-nav mb-2 d-flex align-items-center ${
            active === "/vyrobky" ? "active" : ""
          }`}
          href="/vyrobky"
        >
          <i className="icofont-box me-2 ms-4"></i>
          Výrobky
        </a>
        <a
          className={`nav-link nova-vyroba-nav mb-2 d-flex align-items-center ${
            active === "/nova-vyroba" ? "active" : ""
          }`}
          href="/nova-vyroba"
        >
          <i className="icofont-meeting-add me-2 ms-4"></i>
          Pridaj Výrobu
        </a>
      </nav>
      <div className="d-grid">
        <button className="btn-custom mb-2" onClick={handleClearStorage}>
          Clear Storage
        </button>
      </div>
    </article>
  );
}
