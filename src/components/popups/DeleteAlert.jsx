import { useNavigate } from "react-router-dom";

export function DeleteAlert({ setClicked, setVyroba, stagedForDeletion }) {
  //const navigate = useNavigate();

  const handleDelete = () => {
    setVyroba((prevVyroba) =>
      prevVyroba.filter((vyr) => vyr.id !== stagedForDeletion)
    );
    setClicked(false);
  };
  const handleClose = () => {
    setClicked(false);
  };

  return (
    <section className="popup">
      <article className="popup-content popupAnimationShow">
        <h4 className="mt-5">Prajete si zmazať výrobu?</h4>
        <h6 className="mb-5">ID výroby: {stagedForDeletion}</h6>
        <button className="btn-custom me-3" onClick={() => handleDelete()}>
          Zmazať
        </button>
        <button className="btn-custom" onClick={() => handleClose()}>
          Zavrieť
        </button>
      </article>
    </section>
  );
}
