import { useState, useEffect } from "react";
import { VyrobkyItem } from "./vyrobky/VyrobkyItem";
import { CardHeader } from "./CardHeader";

import "../assets/css/dbvalues.css";

export function Vyrobky({ vyrobky, vyrobkySpecs }) {
  const [searchVyrobok, setSearchVyrobok] = useState("");
  const [filteredVyrobky, setFilteredVyrobky] = useState([]);

  //FILTER
  useEffect(() => {
    setFilteredVyrobky(vyrobky);
  }, [vyrobky]);

  const handleInputChange = (e) => {
    const searchInput = e.target.value;
    setSearchVyrobok(searchInput);

    const vyrobokFilter = vyrobky.filter(
      (vyrobok) =>
        vyrobok.cisloVykresu
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        vyrobok.firma.toLowerCase().includes(searchInput.toLowerCase()) ||
        vyrobok.nazov.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredVyrobky(vyrobokFilter);
  };

  return (
    <div className="section-content">
      <CardHeader cardName={"Výrobky"} />
      <section className="search-box mb-3">
        <h3>Vyhľadaj výrobok</h3>
        <input
          type="text"
          value={searchVyrobok}
          placeholder="Napr. Skenerovy drziak KV30-cast X"
          className="search-bar"
          onChange={handleInputChange}
        />
      </section>
      <section className="item-box scroll-box">
        {filteredVyrobky.map((item) => (
          <div key={item.cisloVykresu} className="db-info  mb-3">
            <VyrobkyItem item={item} vyrobkySpecs={vyrobkySpecs} />
          </div>
        ))}
      </section>
    </div>
  );
}
