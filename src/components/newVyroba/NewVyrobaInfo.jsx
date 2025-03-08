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
        <input type="date" value={date} onChange={handleDateChange} />
      </article>
      <article className="mt-3">
        <h5>Čas začiatku: </h5>
        <select
          onChange={(e) => setCurrentStartTime(e.target.value)}
          value={currentStartTime}
        >
          {tableIndex.map((index) => {
            const temp = Number(index);
            if (temp === Math.floor(temp)) {
              return (
                <option key={index} value={index}>
                  {index}:00
                </option>
              );
            } else {
              const splited = parseInt(index);
              return (
                <option key={index} value={index}>
                  {splited}:30
                </option>
              );
            }
          })}
        </select>
      </article>
      <article className="mt-3">
        <h5>Počet kusov: </h5>
        <input
          type="number"
          min="0"
          onChange={(e) => setCurrentPocetKusov(e.target.value)}
          value={currentPocetKusov}
        />
      </article>
    </section>
  );
}
