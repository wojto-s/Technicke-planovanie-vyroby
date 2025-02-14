import { Link } from "react-router-dom";

export function DesktopNav({ active, setEditing }) {
  function handleClearStorage(e) {
    localStorage.clear();
  }

  const handleSetPridat = () => {
    setEditing(false);
  };

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
          <span>
            <i className="fa-solid fa-calendar-days"></i>
          </span>
          Kalendár
        </Link>
        <Link
          to="/historia"
          className={`nav-link historia-nav mb-2 d-flex align-items-center ${
            active === "/historia" ? "active" : ""
          }`}
        >
          <span>
            <i className="fa-solid fa-clock-rotate-left"></i>
          </span>
          História
        </Link>
        <Link
          to="#"
          aria-disabled="true"
          className={`nav-link stroje-nav mb-2 d-flex align-items-center ${
            active === "/stroje" ? "active" : ""
          }`}
        >
          <span>
            <i className="fa-solid fa-wrench"></i>
          </span>
          Stroje
        </Link>
        <Link
          to="/vyrobky"
          className={`nav-link vyrobky-nav mb-2 d-flex align-items-center ${
            active === "/vyrobky" ? "active" : ""
          }`}
        >
          <span>
            <i className="fa-solid fa-box"></i>
          </span>
          Výrobky
        </Link>
        <Link
          to="/nova-vyroba"
          className={`nav-link nova-vyroba-nav mb-2 d-flex align-items-center ${
            active === "/nova-vyroba" ? "active" : ""
          }`}
          onClick={handleSetPridat}
        >
          <span>
            <i className="fa-solid fa-plus"></i>
          </span>
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
