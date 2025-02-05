import { CardHeader } from "./CardHeader";
import { useNavigate } from "react-router-dom";

export function Historia({ vyroba, setVyroba, setEditing, setCurrentEdit }) {
  const handleDeleteVyroba = (id) => {
    setVyroba((prevVyroba) => prevVyroba.filter((vyr) => vyr.id !== id));
  };

  const navigate = useNavigate();

  const handleStartEdit = (vyrobok) => {
    setEditing(true);
    setCurrentEdit(vyrobok);
    navigate("/nova-vyroba");
  };

  return (
    <div className="section-content">
      <CardHeader cardName={"História výroby"} />
      <section className="scroll-box">
        {[...vyroba].reverse().map((vyr) => {
          const endElem = vyr.workPeriods.length - 1;
          return (
            <div key={vyr.id} className="db-info  mb-3">
              <div className="d-flex align-items-center mb-2">
                <p className="vyrobaID">
                  ID Výroby: <span>{vyr.id}</span>
                </p>
                <button
                  value={vyr.id}
                  className="nav-link vyrobaID ms-3 btn-edit"
                  onClick={(e) => handleStartEdit(vyr)}
                >
                  Edit
                </button>
                <button
                  value={vyr.id}
                  className="nav-link vyrobaID ms-3 btn-edit"
                  onClick={(e) => handleDeleteVyroba(e.target.value)}
                >
                  Delete
                </button>
              </div>
              <div className="d-flex flex-wrap">
                <p className="me-3">
                  Výrobok: <span>{vyr.nazovVyrobku}</span>
                </p>
                <p className="me-3">
                  Č. Výkresu: <span>{vyr.cisloVykresu}</span>
                </p>
                <p className="me-3">
                  Poloha: <span>{vyr.poloha}</span>
                </p>
                <p className="me-3">
                  Stroj: <span>{vyr.pracovisko}</span>
                </p>
                <p className="me-3">
                  Upnutie: <span>{vyr.upnutie}</span>
                </p>
                <p className="me-3">
                  Počet ks: <span>{vyr.pocetKusov}</span>
                </p>
              </div>
              <div className="d-flex">
                <p className="me-2">
                  Začiatok Výroby:{" "}
                  <span>
                    {vyr.workPeriods[0].day} | {vyr.workPeriods[0].startTime}
                  </span>
                </p>
                <p className="me-2">
                  Koniec výroby:{" "}
                  <span>
                    {vyr.workPeriods[endElem].day} |{" "}
                    {vyr.workPeriods[endElem].endTime}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
