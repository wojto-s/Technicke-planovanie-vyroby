import { useState } from "react";

export function NewVyrobaInfo({
  setCurrentPocetKusov,
  currentPocetKusov,
  setStartDate,
  date,
  vyrobkySpecs,
  tableIndex,
  currentStartTime,
  setCurrentStartTime,
}) {
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setStartDate(newDate);
  };

  return (
    <section className="new-vyroba-info d-flex justify-content-center flex-column mt-3">
      <article>
        <h5>Dátum: </h5>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="ms-4"
        />
      </article>
      <article className="mt-3">
        <h5>Čas začiatku: </h5>
        <select
          className="ms-2"
          onChange={(e) => setCurrentStartTime(e.target.value)}
          value={currentStartTime}
        >
          {tableIndex.map((index) => (
            <option key={index} value={index}>
              {index}:00
            </option>
          ))}
        </select>
      </article>
      <article className="mt-3">
        <h5>Počet kusov: </h5>
        <input
          type="number"
          onChange={(e) => setCurrentPocetKusov(e.target.value)}
          className="ms-4"
          value={currentPocetKusov}
        />
      </article>
    </section>
  );
}
