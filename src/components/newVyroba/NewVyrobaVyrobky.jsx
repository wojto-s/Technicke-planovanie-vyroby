import { useState, useEffect, use } from "react";

export function NewVyrobaVyrobky({
  vyrobky,
  vyrobkySpecs,
  currentCisloVykresu,
  setCurrentCisloVykresu,
  setCurrentPoloha,
}) {
  const handleVyrobokChange = (e) => {
    const currentCisloVykersu = e.currentTarget.dataset.value;
    setCurrentCisloVykresu(currentCisloVykersu);
    setCurrentPoloha("1");
    const vyrobkyPGM = vyrobkySpecs.filter(
      (vSpec) => vSpec.cisloVykresu == currentCisloVykersu
    );
  };

  //FILTER
  const [searchVyrobok, setSearchVyrobok] = useState("");
  const [filteredVyrobky, setFilteredVyrobky] = useState([]);
  useEffect(() => {
    setFilteredVyrobky(vyrobky);
  }, [vyrobky]);

  const handleInputChange = (e) => {
    const searchInput = e.target.value;
    setSearchVyrobok(searchInput);

    const vyrobokFilter = vyrobky.filter(
      (vyrobok) =>
        vyrobok.cisloVykresu
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        vyrobok.firma.toLowerCase().includes(searchInput.toLowerCase()) ||
        vyrobok.nazov.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredVyrobky(vyrobokFilter);
  };

  return (
    <section className="vyrobky">
      <div className="search-box mb-3">
        <h5>Vyhľadaj výrobok</h5>
        <input
          type="text"
          value={searchVyrobok}
          placeholder="Napr. Skenerovy drziak KV30-cast X"
          className="search-bar"
          onChange={handleInputChange}
        />
      </div>
      <div className="scroll-box">
        {filteredVyrobky.map((vyrobok) => (
          <article
            className={`vyrobok-card mb-3 ${
              currentCisloVykresu === vyrobok.cisloVykresu ? "active-elem" : ""
            }`}
            key={vyrobok.cisloVykresu}
            data-value={vyrobok.cisloVykresu}
            onClick={handleVyrobokChange}
          >
            <h4>{vyrobok.cisloVykresu}</h4>
            <h5>{vyrobok.nazov}</h5>
            <p className="mb-0">{vyrobok.firma}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
