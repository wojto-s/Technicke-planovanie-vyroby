import { useNavigate } from "react-router-dom";

export function VyrobaInfoPopUp({ setClicked, currentEdit }) {
  const handlePopupClose = () => {
    setClicked(false);
  };

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/nova-vyroba");
    setClicked(false);
  };

  const endElem = currentEdit.workPeriods.length - 1;

  return (
    <section className="popup">
      <article className="popup-content popupAnimationShow">
        <p className="mb-3">Výroba číslo: {currentEdit.id}</p>
        <h4>{currentEdit.cisloVykresu}</h4>
        <h5>{currentEdit.nazovVyrobku}</h5>
        <p className="mt-4">
          Poloha: <span className="fw-bold">{currentEdit.poloha}</span>
        </p>
        <p>
          Pracovisko: <span className="fw-bold">{currentEdit.pracovisko}</span>
        </p>
        <p>
          Upnutie: <span className="fw-bold">{currentEdit.upnutie}</span>
        </p>
        <p>
          Počet kusov:{" "}
          <span className="fw-bold">{currentEdit.pocetKusov} ks</span>
        </p>
        <p>
          Začiatok výroby:{" "}
          <span className="fw-bold">
            {currentEdit.workPeriods[0].day} |{" "}
            {currentEdit.workPeriods[0].startTime}
          </span>
        </p>
        <p>
          Predpokladaný koniec výroby:{" "}
          <span className="fw-bold">
            {currentEdit.workPeriods[endElem].day} |{" "}
            {currentEdit.workPeriods[endElem].endTime}
          </span>
        </p>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn-custom me-4" onClick={handleEditClick}>
            Edit
          </button>
          <button className="btn-custom" onClick={handlePopupClose}>
            Close
          </button>
        </div>
      </article>
    </section>
  );
}
