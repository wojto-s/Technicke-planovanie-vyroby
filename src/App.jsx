import { useState, useEffect } from "react";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Vyroba } from "./components/Vyroba";
import { Historia } from "./components/Historia";
import { Vyrobky } from "./components/Vyrobky";
import { NewVyroba } from "./components/NewVyroba";
import * as XLSX from "xlsx";

function App() {
  // PRACOVNA DOBA
  const [tableIndex, setTableIndex] = useState([]);
  useEffect(() => {
    const index = [];
    for (let i = 6; i <= 22; i++) {
      index.push(i);
    }
    setTableIndex(index);
  }, []);

  //AKTUALNE VYROBY
  const [vyroba, setVyroba] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });
  useEffect(() => {
    if (vyroba.length > 0) {
      localStorage.setItem("ITEMS", JSON.stringify(vyroba));
      //exportVyroba(vyroba);
    }
  }, [vyroba]);

  //PRIDANIE VYROBY
  function addVyroba(
    cisloVykresu,
    nazovVyrobku,
    poloha,
    pracovisko,
    upnutie,
    pocetKusov,
    workPeriods,
    duration,
    vyrobokBG
  ) {
    const newData = {
      id: crypto.randomUUID(),
      cisloVykresu,
      nazovVyrobku,
      poloha,
      pracovisko,
      upnutie,
      pocetKusov,
      workPeriods,
      duration,
      vyrobokBG,
    };
    setVyroba((currentVyroba) => [...currentVyroba, newData]);
  }
  /*
  function exportVyroba(data) {
    window.electron.saveJson(data);
  }*/

  //Všetky výrobky
  const [vyrobky, setVyrobky] = useState([]);
  useEffect(() => {
    fetch("./vyrobky.xlsx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setVyrobky(jsonData);
      })
      .catch((error) => console.error("Error loading Excel file:", error));
  }, []);

  const [vyrobkySpecs, setVyrobkySpecs] = useState([]);
  useEffect(() => {
    fetch("./vyrobkySpecs.xlsx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setVyrobkySpecs(jsonData);
      })
      .catch((error) => console.error("Error loading Excel file:", error));
  }, []);
  //console.log(vyroba);
  const [isEditing, setEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});

  //ROUTY
  return (
    <div className="d-flex">
      <Navigation setEditing={setEditing} />
      <div className="col-sm-12 col-md-11 col-lg-10">
        <Routes>
          <Route
            path="/"
            element={
              <Vyroba
                tableIndex={tableIndex}
                vyroba={vyroba}
                setEditing={setEditing}
                setCurrentEdit={setCurrentEdit}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Vyroba
                tableIndex={tableIndex}
                vyroba={vyroba}
                vyrobky={vyrobky}
                setEditing={setEditing}
                setCurrentEdit={setCurrentEdit}
              />
            }
          />
          <Route
            path="/historia"
            element={
              <Historia
                vyroba={vyroba}
                setVyroba={setVyroba}
                setEditing={setEditing}
                setCurrentEdit={setCurrentEdit}
              />
            }
          />
          <Route
            path="/vyrobky"
            element={<Vyrobky vyrobky={vyrobky} vyrobkySpecs={vyrobkySpecs} />}
          />
          <Route
            path="/nova-vyroba"
            element={
              <NewVyroba
                addVyroba={addVyroba}
                tableIndex={tableIndex}
                vyroba={vyroba}
                setVyroba={setVyroba}
                vyrobky={vyrobky}
                vyrobkySpecs={vyrobkySpecs}
                isEditing={isEditing}
                currentEdit={currentEdit}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
