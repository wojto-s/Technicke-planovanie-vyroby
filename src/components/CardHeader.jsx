import { NavContent } from "./navigation/NavContent";

export function CardHeader({ cardName }) {
  return (
    <section className="card-header d-flex flex-column align-items-center justify-content-center">
      <a
        className="btn-custom d-block d-sm-block d-md-none"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <i className="icofont-meeting-add"></i>
      </a>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <NavContent />
      </div>
      <h1 className="text-uppercase fw-bold mb-0">{cardName}</h1>
    </section>
  );
}
