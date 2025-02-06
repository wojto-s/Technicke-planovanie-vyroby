import { useEffect, useState } from "react";
import { NewVyrobaVyrobky } from "./newVyroba/NewVyrobaVyrobky";
import { NewVyrobaInfo } from "./newVyroba/NewVyrobaInfo";
import { NewVyrobaParams } from "./newVyroba/NewVyrobaParams";
import { NewVyrobaPrehlad } from "./newVyroba/NewVyrobaPrehlad";
import { CardHeader } from "./CardHeader";

export function NewVyroba({
  addVyroba,
  tableIndex,
  vyroba,
  setVyroba,
  vyrobky,
  vyrobkySpecs,
  isEditing,
  currentEdit,
}) {
  const [currentCisloVykresu, setCurrentCisloVykresu] = useState(0);
  useEffect(() => {
    setCurrentCisloVykresu(vyrobkySpecs[0]?.cisloVykresu || null);
  }, [vyrobky[0]?.cisloVykresu]);
  const [currentPocetKusov, setCurrentPocetKusov] = useState(0);
  const [currentPoloha, setCurrentPoloha] = useState("1");
  const [currentStartTime, setCurrentStartTime] = useState("6");

  const [currentStroj, setCurrentStroj] = useState("");
  // Setujem default stroj
  useEffect(() => {
    const strojFilt = vyrobkySpecs
      .filter(
        (vSpecFilt) =>
          vSpecFilt.cisloVykresu === currentCisloVykresu &&
          vSpecFilt.poloha.toString() === currentPoloha
      )
      .map((vSpecFilt) => vSpecFilt.pracovisko);
    setCurrentStroj(strojFilt[0]);
  }, [vyrobkySpecs, currentCisloVykresu, currentPoloha]);

  const [disabledStroje, setDisabledStroje] = useState([]);
  useEffect(() => {
    // Zistím aké všetky stroje sú pre daný výrobok
    let allStroje = vyrobkySpecs
      .filter((vSpecFilt) => vSpecFilt.cisloVykresu === currentCisloVykresu)
      .map((vSpecFilt) => vSpecFilt.pracovisko);
    allStroje = [...new Set(allStroje)];

    // Zistím aké máme stroje pre danú polohu
    let strojOnPoloha = vyrobkySpecs
      .filter(
        (vSpecFilt) =>
          vSpecFilt.cisloVykresu === currentCisloVykresu &&
          vSpecFilt.poloha.toString() === currentPoloha
      )
      .map((vSpecFilt) => vSpecFilt.pracovisko);
    strojOnPoloha = [...new Set(strojOnPoloha)];

    // Vyfiltrujem stroje, ktoré nepotrebujem dám do pola "isDisabled"
    // následne ich uložím do "disabledStroje"
    const isDisabled = allStroje.filter(
      (itemFilt) => !strojOnPoloha.includes(itemFilt)
    );
    setDisabledStroje(isDisabled);
  }, [vyrobkySpecs, currentCisloVykresu, currentPoloha]);

  const [currentUpnutie, setCurrentUpnutie] = useState("");
  // Setujem default upnutie
  useEffect(() => {
    const upnutieFilt = vyrobkySpecs.filter(
      (vSpecFilt) =>
        vSpecFilt.cisloVykresu === currentCisloVykresu &&
        vSpecFilt.poloha.toString() === currentPoloha &&
        vSpecFilt.pracovisko === currentStroj
    );
    setCurrentUpnutie(upnutieFilt[0]?.upnutie || null);
  }, [vyrobkySpecs, currentCisloVykresu, currentPoloha, currentStroj]);

  // Zisťujem, ktoré upnutie nemožem použiť v kombinácii s danou polohou a strojom
  const [disabledUpnutie, setDisabledUpnutie] = useState([]);
  useEffect(() => {
    // Zistím aké všetky upnutie sú pre daný výrobok
    let allUpnutie = vyrobkySpecs
      .filter((vSpecFilt) => vSpecFilt.cisloVykresu === currentCisloVykresu)
      .map((vSpecFilt) => vSpecFilt.upnutie);
    allUpnutie = [...new Set(allUpnutie)];

    // Zistím aké máme upnutie pre danú polohu a stroj
    let upnutieOnPoloha = vyrobkySpecs
      .filter(
        (vSpecFilt) =>
          vSpecFilt.cisloVykresu === currentCisloVykresu &&
          vSpecFilt.poloha.toString() === currentPoloha &&
          vSpecFilt.pracovisko === currentStroj
      )
      .map((vSpecFilt) => vSpecFilt.upnutie);
    upnutieOnPoloha = [...new Set(upnutieOnPoloha)];

    // Vyfiltrujem upnutia, ktoré nepotrebujem dám do pola "isDisabled"
    // následne ich uložím do "disabledUpnutie"
    const isDisabled = allUpnutie.filter(
      (itemFilt) => !upnutieOnPoloha.includes(itemFilt)
    );
    setDisabledUpnutie(isDisabled);
  }, [vyrobkySpecs, currentCisloVykresu, currentPoloha, currentUpnutie]);

  //const [workPeriods, setNewWorkPeriods] = useState([]);

  // Datum vyroby
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const today = startDate;
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  });

  const [cardName, setCardName] = useState("");
  const [editID, setEditID] = useState(0);
  useEffect(() => {
    if (isEditing) {
      setCardName("Edituješ výrobu");
      setCurrentCisloVykresu(currentEdit.cisloVykresu);
      setCurrentPoloha(currentEdit.poloha);
      setCurrentStroj(currentEdit.pracovisko);
      setCurrentUpnutie(currentEdit.upnutie);
      setStartDate(new Date(currentEdit.workPeriods[0].day));
      setCurrentStartTime(parseInt(currentEdit.workPeriods[0].startTime));
      setCurrentPocetKusov(currentEdit.pocetKusov);
      setEditID(currentEdit.id);
    } else {
      setCardName("Pridaj novú výrobu");
    }
  }, [isEditing, currentEdit]);

  const currentVyrobok = {
    cisloVykresu: currentCisloVykresu,
    poloha: currentPoloha,
    pracovisko: currentStroj,
    pocetKusov: currentPocetKusov,
    upnutie: currentUpnutie,
    startTime: currentStartTime,
    startDate: startDate,
  };

  return (
    <section className="section-content ms-3 me-4">
      <CardHeader cardName={cardName} />
      <div className="d-flex flex-wrap">
        <div className="col-12 col-lg-3">
          <NewVyrobaVyrobky
            vyrobky={vyrobky}
            vyrobkySpecs={vyrobkySpecs}
            currentCisloVykresu={currentCisloVykresu}
            setCurrentCisloVykresu={setCurrentCisloVykresu}
            setCurrentPoloha={setCurrentPoloha}
          />
        </div>
        <div className="col-12 col-lg-6">
          <NewVyrobaParams
            currentParam={currentPoloha}
            setCurrentParam={setCurrentPoloha}
            currentCisloVykresu={currentCisloVykresu}
            vyrobkySpecs={vyrobkySpecs}
            param={"Poloha"}
          />
          <NewVyrobaParams
            currentParam={currentStroj}
            setCurrentParam={setCurrentStroj}
            currentCisloVykresu={currentCisloVykresu}
            vyrobkySpecs={vyrobkySpecs}
            param={"Pracovisko"}
            disabledParams={disabledStroje}
          />
          <NewVyrobaParams
            currentParam={currentUpnutie}
            setCurrentParam={setCurrentUpnutie}
            currentCisloVykresu={currentCisloVykresu}
            vyrobkySpecs={vyrobkySpecs}
            param={"Upnutie"}
            disabledParams={disabledUpnutie}
          />
          <NewVyrobaInfo
            setCurrentPocetKusov={setCurrentPocetKusov}
            currentPocetKusov={currentPocetKusov}
            setStartDate={setStartDate}
            date={date}
            vyrobkySpecs={vyrobkySpecs}
            tableIndex={tableIndex}
            currentStartTime={currentStartTime}
            setCurrentStartTime={setCurrentStartTime}
          />
        </div>
        <div className="col-12 col-lg-3">
          <NewVyrobaPrehlad
            currentVyrobok={currentVyrobok}
            vyrobky={vyrobky}
            vyrobkySpecs={vyrobkySpecs}
            addVyroba={addVyroba}
            vyroba={vyroba}
            setVyroba={setVyroba}
            isEditing={isEditing}
            editID={editID}
          />
        </div>
      </div>
    </section>
  );
}
