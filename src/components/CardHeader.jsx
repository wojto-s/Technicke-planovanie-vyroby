export function CardHeader({ cardName }) {
  return (
    <section className="card-header d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-uppercase fw-bold mb-0">{cardName}</h1>
    </section>
  );
}
