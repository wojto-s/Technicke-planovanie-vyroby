import { useNavigate } from "react-router-dom";

export function NewVyrobaAlertPopUp({
  setClicked,
  errorMessage,
  addSucces,
  vyroba,
  updateVyrobaJSON,
}) {
  const navigate = useNavigate();
  const handlePopupClose = () => {
    if (addSucces) {
      navigate("/");
      updateVyrobaJSON(vyroba);
    }
    setClicked(false);
  };

  console.log(vyroba);

  const showSuccesIcon = (isSucces) => {
    if (isSucces) {
      return (
        <span className="alert-icon add-succes">
          <i className="fa-solid fa-circle-check"></i>
        </span>
      );
    } else {
      return (
        <span className="alert-icon add-failed">
          <i className="fa-solid fa-circle-xmark"></i>
        </span>
      );
    }
  };

  return (
    <section className="popup">
      <article className="popup-content popupAnimationShow">
        {showSuccesIcon(addSucces)}

        <h4 className="mb-5">{errorMessage}</h4>
        <button className="btn-custom" onClick={handlePopupClose}>
          Close
        </button>
      </article>
    </section>
  );
}
