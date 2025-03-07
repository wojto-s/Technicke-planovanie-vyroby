export function VyrobaMenu({ date, setNewDate }) {
  const today = new Date();
  const todayDateString = today.toDateString();
  const currentDateString = date.toDateString();

  // Najviac o koľko dní môžeme ísť dopredu
  today.setDate(today.getDate() + 7);
  const todayPlus = new Date(today);

  // Funkcia na nasledujúci deň
  function handleAddDay(e) {
    if (date <= todayPlus) {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      setNewDate(nextDate);
    }
  }

  // Funkcia na predošlý deň
  function handleRemoveDay(e) {
    if (currentDateString !== todayDateString) {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() - 1);
      setNewDate(nextDate);
    }
  }

  return (
    <article className="vyroba-menu">
      <div className="vyroba-info d-flex justify-content-between align-items-center">
        <button className="btn-custom" onClick={handleRemoveDay}>
          <span className="btn-change-days">
            <i className="fa-solid fa-caret-left"></i>
          </span>
        </button>
        <p className="fw-bold fs-5 mb-0">{date.toLocaleDateString()}</p>
        <button className="btn-custom" onClick={handleAddDay}>
          <span className="btn-change-days">
            <i className="fa-solid fa-caret-right"></i>
          </span>
        </button>
      </div>
    </article>
  );
}
