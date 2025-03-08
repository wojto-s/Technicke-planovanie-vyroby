import { NewVyrobaAlert } from "../popups/NewVyrobaAlert";
import { useState } from "react";

export function NewVyrobaPrehlad({
  currentVyrobok,
  vyrobky,
  vyrobkySpecs,
  addVyroba,
  vyroba,
  setVyroba,
  isEditing,
  editID,
}) {
  const calcDuration = (pocetKusov, poloha) => {
    let dlzkaVyroby = 0; //min

    //Najdeme si vyrobny cas pre dany vyrobok
    vyrobkySpecs.forEach((vSpec) => {
      if (poloha == vSpec.poloha) dlzkaVyroby = vSpec.cas;
    });
    let hodiny = (pocetKusov * dlzkaVyroby) / 60;
    if (hodiny < 0.5 && hodiny > 0) hodiny = 0.5;

    function slipFloor(num) {
      let f = Math.floor(num);
      if (num - f < 0.5) {
        return f;
      }
      return f + 0.5;
    }

    const rounded = slipFloor(hodiny);

    return rounded;
  };
  const findNazov = (cisloVykresu) => {
    let nazov;
    vyrobky.forEach((v) => {
      if (v.cisloVykresu === cisloVykresu) {
        nazov = v.nazov;
      }
    });
    return nazov;
  };

  // CISTO NA VYPIS DO KEDY BUDE VYROBA TRVAT
  const endVyroba = (pocetKusov, poloha, startDate, startTime) => {
    if (pocetKusov > 0) {
      const totalHours = calcDuration(pocetKusov, poloha);
      const workPeriods = calculateWorkPeriods(
        startDate,
        totalHours,
        startTime
      );
      const lastElem = workPeriods[workPeriods.length - 1];
      const endVyroba = lastElem.day + " " + lastElem.endTime;
      return endVyroba;
    } else {
      return " Musíš zadať počet kusov";
    }
  };

  const calculateWorkPeriods = (startDate, totalHours, startTime) => {
    const workPeriods = [];
    let remainingHours = totalHours;
    let currentDateTime = new Date(startDate);
    let periodCounter = 0;

    while (remainingHours > 0) {
      let workStart = new Date(currentDateTime);

      // Ak sa nám výroba presunie do ďalšieho dňa, tak nastavujeme aby následujúci deň začínala od 6:00
      if (periodCounter == 0) {
        const startTimeParsed = parseFloat(startTime);
        const hrs = Math.floor(startTimeParsed);
        const min = (startTimeParsed % 1) * 60;
        workStart.setHours(hrs, min, 0, 0);
      } else {
        workStart.setHours(6, 0, 0, 0);
      }

      let workEnd = new Date(workStart);
      workEnd.setHours(22, 0, 0, 0); // Nastaví koniec pracovnej doby na 22:00

      const availableHours = (workEnd - workStart) / (1000 * 60 * 60);
      const workHours = Math.min(remainingHours, availableHours);

      const endTime = new Date(workStart);
      endTime.setMinutes(workStart.getMinutes() + workHours * 60);

      const formatTime = (date) => {
        let hours = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes() === 30 ? "30" : "00";
        return `${hours}:${minutes}`;
      };

      workPeriods.push({
        day: workStart.toISOString().substring(0, 10),
        startTime: formatTime(workStart),
        endTime: formatTime(endTime),
      });

      remainingHours -= workHours;
      currentDateTime = new Date(workEnd);
      currentDateTime.setDate(currentDateTime.getDate() + 1);
      periodCounter++;
    }

    return workPeriods;
  };

  const getBG = (cisloVykresu) => {
    for (let i = 0; i < vyrobky.length; i++) {
      if (cisloVykresu === vyrobky[i].cisloVykresu) return vyrobky[i].bg;
    }
  };

  const [addSucces, setAddSucces] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //PRIDANIE DO DB
  function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);
    if (currentVyrobok.pocetKusov == 0)
      return setErrorMessage(
        "Výroba nebola pridaná pretože si nezadal počet kusov"
      ); // ak nezadáme počet kusov tak sa nič nevykoná a zobrazí sa chybová hláška

    let isConflict = false;

    // Kontrolujeme či sa nám parametre zadané pre novú výrobu nekolidujú s parametrami v DB
    /*
    Najprv kontrolujeme či máme zhodný dátum, potom či nám sedí aj stroj.
    Nakoniec skontrolujeme či nám nejakým spôsobom koliduje časový interval
    Ak sa vo všetkom nájde zhoda tak kód sa ukončí skôr a zápis sa nevykoná 
    */
    const totalHours = calcDuration(
      currentVyrobok.pocetKusov,
      currentVyrobok.poloha
    );
    const workPeriods = calculateWorkPeriods(
      currentVyrobok.startDate,
      totalHours,
      currentVyrobok.startTime
    );

    // Check či sú voľné dátum/stroj/časový interval
    vyroba.forEach((vyrobok) => {
      const endElem = vyrobok.workPeriods.length - 1;
      const checkStartTime = parseInt(
        vyrobok.workPeriods[0].startTime.split(":")[0],
        10
      );
      const checkEndTime = parseInt(
        vyrobok.workPeriods[endElem].endTime.split(":")[0],
        10
      );

      workPeriods.forEach((wp) => {
        // Zisťujeme či sa nám vo WP nachádza dátum ktorý potrebujeme, ak hej dostaneme true a či náhodou ho needitujeme
        const isDayConflict = vyrobok.workPeriods.some(
          (vyrobokWP) => vyrobokWP.day === wp.day
        );
        if (isDayConflict && vyrobok.id !== editID) {
          // Zisťujeme či je voľný stroj
          if (currentVyrobok.pracovisko === vyrobok.pracovisko) {
            // Zisťujeme či je voľný čas
            if (
              (currentVyrobok.startTime >= checkStartTime &&
                currentVyrobok.startTime < checkEndTime) || // nový čas začiatku je v existujúcom intervale
              (currentVyrobok.startTime <= checkStartTime &&
                parseInt(workPeriods[endWork].endTime.split(":")[0], 10) >=
                  checkStartTime) // nový interval prekrýva existujúci
            ) {
              isConflict = true;
            }
          }
        }
      });
    });

    // Zápis novej výroby do DB
    /*
    Ak sa nám z predošlej funckie vráti premenná "isConflict" ako false tak sa vykoná zápis
    Inak sa vypíše hláška že zápis nie je možné vykonať
    */

    if (!isConflict) {
      if (isEditing) {
        setVyroba((prevItems) =>
          prevItems.map((item) =>
            item.id === editID
              ? {
                  ...item,
                  ...currentVyrobok,
                  workPeriods: workPeriods,
                  nazovVyrobku: findNazov(currentVyrobok.cisloVykresu),
                  duration: calcDuration(
                    currentVyrobok.pocetKusov,
                    currentVyrobok.cisloVykresu
                  ),
                  vyrobokBG: getBG(currentVyrobok.cisloVykresu),
                }
              : item
          )
        );
        setAddSucces(true);
        return setErrorMessage("Úprava prebehla úspešne");
      } else {
        addVyroba(
          currentVyrobok.cisloVykresu,
          findNazov(currentVyrobok.cisloVykresu),
          currentVyrobok.poloha,
          currentVyrobok.pracovisko,
          currentVyrobok.upnutie,
          currentVyrobok.pocetKusov,
          workPeriods,
          calcDuration(currentVyrobok.pocetKusov, currentVyrobok.cisloVykresu),
          getBG(currentVyrobok.cisloVykresu)
        );
        setAddSucces(true);
        return setErrorMessage("Výroba úspešne pridaná");
      }
    } else {
      return setErrorMessage(
        "Výroba nebola pridaná / upravená kvôli časovému konfliktu"
      );
    }
  }

  return (
    <section className="new-vyroba-prehlad mt-4 d-flex align-content-between justify-content-center flex-wrap">
      <h3>Prehľad</h3>
      <div>
        <h5 className="mt-5">{currentVyrobok.cisloVykresu}</h5>
        <h5>{findNazov(currentVyrobok.cisloVykresu)}</h5>
        <h6 className="fw-normal mt-4">
          Poloha: <span className="fw-bold">{currentVyrobok.poloha}</span>
        </h6>
        <h6 className="fw-normal">
          Pracovisko:{" "}
          <span className="fw-bold">{currentVyrobok.pracovisko}</span>
        </h6>
        <h6 className="fw-normal">
          Upnutie: <span className="fw-bold">{currentVyrobok.upnutie}</span>
        </h6>
        <h6 className="fw-normal">
          Začiatok výroby:{" "}
          <span className="fw-bold">
            {currentVyrobok.startDate.toISOString().split("T")[0]}{" "}
            {currentVyrobok.startTime}:00
          </span>
        </h6>
        <h6 className="fw-normal">
          Predpokladaný koniec:
          <span className="fw-bold">
            {endVyroba(
              currentVyrobok.pocetKusov,
              currentVyrobok.poloha,
              currentVyrobok.startDate,
              currentVyrobok.startTime
            )}
          </span>
        </h6>
        <h5>
          Výroba bude trvať:{" "}
          {parseInt(
            calcDuration(currentVyrobok.pocetKusov, currentVyrobok.poloha)
          )}
          {calcDuration(currentVyrobok.pocetKusov, currentVyrobok.poloha) ===
          Math.floor(
            calcDuration(currentVyrobok.pocetKusov, currentVyrobok.poloha)
          )
            ? ":00"
            : ":30"}
        </h5>
      </div>
      <form>
        <button className="btn-custom" onClick={handleSubmit}>
          {isEditing === true ? "Uprav výrobu" : "Pridaj výrobu"}
        </button>
      </form>
      {isClicked === true && (
        <NewVyrobaAlert
          setClicked={setClicked}
          errorMessage={errorMessage}
          addSucces={addSucces}
          vyroba={vyroba}
        />
      )}
    </section>
  );
}
