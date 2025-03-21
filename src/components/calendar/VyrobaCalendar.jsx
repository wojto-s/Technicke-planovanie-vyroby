export function VyrobaCalendar({
  strojId,
  fullHrs,
  newDate,
  vyroba,
  setEditing,
  setCurrentEdit,
  setClicked,
}) {
  const handleShowInfo = (vyrobok) => {
    setClicked(true);
    setEditing(true);
    setCurrentEdit(vyrobok);
  };

  function getVyrobaCaledar(strojID, newDate) {
    // Vyfiltrujeme si produkty (čas, dátum, stroj)
    // Ukladáme do nového poľa, kde máme iba produkty k danému stroju a dátumu
    const vyrobaData = vyroba.filter(
      (vyrobaItem) =>
        vyrobaItem.pracovisko === strojID &&
        vyrobaItem.workPeriods.find(findRelevantPeriod)
    );

    // Výpis produktov do tabuľky
    // Ak je pole prázdne tak vypisujeme prázdne "li"
    if (vyrobaData.length === 0) {
      return <li></li>;
    } else {
      // Ak sa nájde údaj v poli tak pomocou funkcie "map" vypíšeme príslušné produkty
      const result = vyrobaData.map((vyrobaItem) => {
        // Zisťujeme o aký časový úsek sa zrovna jedná
        const relevantPeriod = vyrobaItem.workPeriods.find(findRelevantPeriod);
        const startTime = Number(
          (relevantPeriod.startTime.split(":")[0] +=
            relevantPeriod.startTime.split(":")[1] === "30" ? ".5" : "")
        );
        const endTime = Number(
          (relevantPeriod.endTime.split(":")[0] +=
            relevantPeriod.endTime.split(":")[1] === "30" ? ".5" : "")
        );
        // Ak sa záznam nachádza v správnom časovom úseku, tak si vypočítame rozdiel časov aby sme vedeli určíť výšku a pozíciu
        if (relevantPeriod) {
          let rozdielCasov = endTime - startTime;
          if (rozdielCasov === 16);
          if (rozdielCasov < 4) {
            return (
              <li
                style={{
                  height: `${rozdielCasov * 40}px`,
                  top: `${(startTime - 6) * 40}px`,
                }}
                className={`tableRow ${vyrobaItem.vyrobokBG}`}
                key={vyrobaItem.id}
                onClick={() => handleShowInfo(vyrobaItem)}
              >
                <div className="d-flex">
                  <p className="me-5 mb-0">{vyrobaItem.nazovVyrobku}</p>
                  <p className="mb-0">Počet Ks: {vyrobaItem.pocetKusov}</p>
                </div>
              </li>
            );
          } else {
            return (
              <li
                style={{
                  height: `${rozdielCasov * 40}px`,
                  top: `${(startTime - 6) * 40}px`,
                }}
                className={`tableRow ${vyrobaItem.vyrobokBG}`}
                key={vyrobaItem.id}
                onClick={() => handleShowInfo(vyrobaItem)}
              >
                <div>
                  <p className="mb-0">{vyrobaItem.nazovVyrobku}</p>
                  <p className="mb-0">Poloha: {vyrobaItem.poloha}</p>
                  <p className="mb-0">Upnutie: {vyrobaItem.upnutie}</p>
                  <p className="mb-0">Počet Ks: {vyrobaItem.pocetKusov} ks</p>
                </div>
              </li>
            );
          }
        }
      });
      return result;
    }

    // Funkcia na nájdenie časového intervalu pri výpise
    function findRelevantPeriod(periods) {
      if (periods.day === newDate.toISOString().split("T")[0]) {
        return {
          day: periods.day,
          startTime: periods.startTime,
          endTime: periods.endTime,
        };
      }
    }
  }

  return (
    <div className="col-12 col-lg-4 stroj">
      <h3>
        {strojId !== "TBD" && "stroj"} {strojId}
      </h3>
      <ul className="tableCol mt-3 mb-0">
        {getVyrobaCaledar(strojId, newDate)}
      </ul>
      <ul className="tableColStatic mt-3 mb-0">
        {fullHrs.map((index) => (
          <li key={index} id={index} className="tableRowStatic"></li>
        ))}
      </ul>
    </div>
  );
}
