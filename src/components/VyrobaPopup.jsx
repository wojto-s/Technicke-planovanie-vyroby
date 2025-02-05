import { useEffect, useState } from "react";
import $ from "jquery";
export function VyrobaPopup({ addVyroba, tableIndex, vyroba, currentID }) {
  const [currentPocetKusov, setCurrentPocetKusov] = useState(0);
  const [currentStartTime, setCurrentStartTime] = useState(6);
  const [newStroj, setNewStroj] = useState("1");
  const [startDate, setStartDate] = useState(new Date());

  // Funkcia na vykonanie pridania novej výroby
  function handleSubmit(e) {
    e.preventDefault();
    if (currentPocetKusov === 0) return; // ak nezadáme počet kusov tak sa nič nevykoná

    let isConflict = false;

    // Kontrolujeme či sa nám parametre zadané pre novú výrobu nekolidujú s parametrami v DB
    /*
    Najprv kontrolujeme či máme zhodný dátum, potom či nám sedí aj stroj.
    Nakoniec skontrolujeme či nám nejakým spôsobom koliduje časový interval
    Ak sa vo všetkom nájde zhoda tak kód sa ukončí skôr a zápis sa nevykoná 
    */
    const workPeriods = calculateWorkPeriods(
      startDate,
      totalHours,
      currentStartTime
    );

    for (let i = 0; i < vyroba.length; i++) {
      const endElem = vyroba[i].workPeriods.length - 1;
      const checkStartTime = parseInt(
        vyroba[i].workPeriods[0].startTime.split(":")[0],
        10
      );
      const checkEndTime = parseInt(
        vyroba[i].workPeriods[endElem].endTime.split(":")[0],
        10
      );
      if (
        startDate.toISOString().split("T")[0] === vyroba[i].workPeriods[0].day
      ) {
        if (newStroj === vyroba[i].stroj) {
          if (
            (currentStartTime >= checkStartTime &&
              currentStartTime <= checkEndTime) || // nový čas začiatku je v existujúcom intervale
            (currentStartTime <= checkStartTime &&
              workPeriods.length - 1 > checkStartTime) // nový interval prekrýva existujúci
          ) {
            console.log("chyba!");
            isConflict = true;
            break;
          }
        }
      }
    }

    // Zápis novej výroby do DB
    /*
    Ak sa nám z predošlej funckie vráti premenná "isConflict" ako false tak sa vykoná zápis
    Inak sa vypíše hláška že zápis nie je možné vykonať
    */

    if (!isConflict) {
      addVyroba(
        currentCisloVykresu,
        currentPocetKusov,
        newStroj,
        workPeriods,
        calcDuration(currentPocetKusov, currentCisloVykresu),
        getBG(currentCisloVykresu)
      );
      alert("Výroba úspešne pridaná");
    } else {
      alert("Výroba nebola pridaná kvôli časovému konfliktu");
    }
    // Nakoniec nastavíme kusy a začiatočný čas na defaultné hodnoty
    setCurrentPocetKusov(0);
    setCurrentStartTime(6);
  }

  // Datum vyroby
  const [date, setDate] = useState("");
  useEffect(() => {
    const today = startDate;
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  });

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setStartDate(newDate);
  };

  const vyrobky = [
    {
      nazov: "pohar",
      dlzkaVyroby: 1,
      stroj1: true,
      stroj2: true,
      stroj3: false,
      bg: "greenBG",
    },
    {
      nazov: "stol",
      dlzkaVyroby: 2,
      stroj1: false,
      stroj2: true,
      stroj3: true,
      bg: "purpleBG",
    },
    {
      nazov: "syr",
      dlzkaVyroby: 1.5,
      stroj1: true,
      stroj2: true,
      stroj3: true,
      bg: "yellowBG",
    },
  ];

  // Funkcia na vypočítanie času potrebného na výrobu produktu
  const [currentCisloVykresu, setCurrentCisloVykresu] = useState(
    vyrobky[0].nazov
  );
  /*
  function calcEndTime(currentPocetKusov, currentCisloVykresu, currentStartTime) {
    let dlzkaVyroby = 0; //hrs
    const startTimeParsed = parseInt(currentStartTime);

    //Najdeme si vyrobny cas pre dany vyrobok
    for (let i = 0; i < vyrobky.length; i++) {
      if (currentCisloVykresu === vyrobky[i].nazov) {
        dlzkaVyroby = vyrobky[i].dlzkaVyroby;
      }
    }

    return startTimeParsed + currentPocetKusov * dlzkaVyroby;
  }
  */
  function getBG(currentCisloVykresu) {
    for (let i = 0; i < vyrobky.length; i++) {
      if (currentCisloVykresu === vyrobky[i].nazov) {
        return vyrobky[i].bg;
      }
    }
  }

  function calcDuration(currentPocetKusov, currentCisloVykresu) {
    let dlzkaVyroby = 0; //hrs

    //Najdeme si vyrobny cas pre dany vyrobok
    for (let i = 0; i < vyrobky.length; i++) {
      if (currentCisloVykresu === vyrobky[i].nazov) {
        dlzkaVyroby = vyrobky[i].dlzkaVyroby;
      }
    }

    return currentPocetKusov * dlzkaVyroby;
  }

  // Work periods
  const totalHours = calcDuration(
    currentPocetKusov,
    currentCisloVykresu,
    currentStartTime
  );
  function calculateWorkPeriods(startDate, totalHours, StartTime) {
    const workPeriods = [];
    let remainingHours = totalHours;
    let currentDateTime = new Date(startDate);
    let periodCounter = 0;

    while (remainingHours > 0) {
      let workStart = new Date(currentDateTime);
      // Ak sa nám výroba presunie do ďalšieho dňa, tak nastavujeme aby následujúci deň začínala od 6:00
      if (periodCounter == 0) {
        const startTimeParsed = parseInt(StartTime);
        workStart.setHours(startTimeParsed, 0, 0, 0);
      } else {
        workStart.setHours(6, 0, 0, 0);
      }

      let workEnd = new Date(workStart);
      workEnd.setHours(22, 0, 0, 0); // Nastaví koniec pracovnej doby na 22:00

      const availableHours = (workEnd - workStart) / (1000 * 60 * 60);
      const workHours = Math.min(remainingHours, availableHours);

      const endTime = new Date(workStart);
      endTime.setHours(workStart.getHours() + workHours);

      workPeriods.push({
        day: workStart.toISOString().substring(0, 10),
        startTime: workStart.toTimeString().substring(0, 5),
        endTime: endTime.toTimeString().substring(0, 5),
      });

      remainingHours -= workHours;

      currentDateTime = new Date(workEnd);
      currentDateTime.setDate(currentDateTime.getDate() + 1);
      periodCounter++;
    }

    return workPeriods;
  }

  // Funkcia na zistenie, na akých strojoch sa daný produkt môže vyrábať
  function availableStroj(currentCisloVykresu) {
    let stroje = [];
    for (let i = 0; i < vyrobky.length; i++) {
      if (currentCisloVykresu === vyrobky[i].nazov) {
        if (vyrobky[i].stroj1 === true) stroje.push(1);
        if (vyrobky[i].stroj2 === true) stroje.push(2);
        if (vyrobky[i].stroj3 === true) stroje.push(3);
      }
    }
    return stroje;
  }

  // Funkcia na zavretie popUp okna
  function handlePopupClose(e) {
    $("#myPopup").removeClass("show");
    $(".popup-content").removeClass("popupAnimationShow");
  }

  function isNewVyroba(currentID) {
    //console.log(currentID);
    if (currentID === 0) {
      return "Zadávaš novú výrobu";
    } else {
      return "Upravuješ výrobu s ID: " + currentID;
    }
  }

  return (
    <div id="myPopup" className="popup">
      <div className="popup-content">
        <form onSubmit={handleSubmit} className="addVyrobaForm">
          <div className="d-flex mb-3">
            <div>
              <label className="d-flex col-6 justify-content-between mb-2">
                Názov:
                <select
                  className="ms-4"
                  onChange={(e) => setCurrentCisloVykresu(e.target.value)}
                >
                  {vyrobky.map((vyrobok) => (
                    <option key={vyrobok.nazov} value={vyrobok.nazov}>
                      {vyrobok.nazov}
                    </option>
                  ))}
                </select>
              </label>
              <label className="d-flex justify-content-between">
                Dátum:
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  className="ms-4"
                />
              </label>
              <label className="d-flex justify-content-between">
                Počet Kusov:
                <input
                  type="number"
                  onChange={(e) => setCurrentPocetKusov(e.target.value)}
                  className="ms-4"
                  value={currentPocetKusov}
                />
              </label>
            </div>
            <div className="d-flex col-6 justify-content-center">
              <div>
                <label className="d-block">
                  Začiatok výroby
                  <select
                    className="ms-2"
                    onChange={(e) => setCurrentStartTime(e.target.value)}
                  >
                    {tableIndex.map((index) => (
                      <option key={index} value={index}>
                        {index}:00
                      </option>
                    ))}
                  </select>
                </label>
                <label className="d-flex">
                  dĺžka výroby
                  <p id="vyrobaEnd" className="ms-2">
                    {calcDuration(
                      currentPocetKusov,
                      currentCisloVykresu,
                      currentStartTime
                    )}
                    :00
                  </p>
                </label>
                <label className="d-flex col-6 justify-content-between mb-2">
                  Stroj:
                  <select
                    className="ms-4"
                    onChange={(e) => setNewStroj(e.target.value)}
                  >
                    {availableStroj(currentCisloVykresu).map((stroj) => (
                      <option key={stroj} value={stroj}>
                        {stroj}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <button className="btn-custom" onClick={handleSubmit}>
            Pridaj výrobu
          </button>
        </form>
        <button
          id="closePopup"
          className="btn-custom mt-3"
          onClick={handlePopupClose}
        >
          Close
        </button>
        <p>{isNewVyroba(currentID)}</p>
      </div>
    </div>
  );
}
