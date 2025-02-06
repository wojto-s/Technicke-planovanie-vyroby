import { useState, useEffect } from "react";

export function NewVyrobaParams({
  currentParam,
  setCurrentParam,
  currentCisloVykresu,
  vyrobkySpecs,
  param,
  disabledParams = [],
}) {
  const [availableParam, setAvailableParam] = useState([]);
  useEffect(() => {
    let filtParam = [];
    if (vyrobkySpecs && currentCisloVykresu) {
      vyrobkySpecs.forEach((vSpec) => {
        if (vSpec.cisloVykresu === currentCisloVykresu) {
          if (param === "Poloha") filtParam.push(vSpec.poloha.toString());
          if (param === "Pracovisko") filtParam.push(vSpec.pracovisko);
          if (param === "Upnutie") filtParam.push(vSpec.upnutie);
        }
      });
    }
    setAvailableParam([...new Set(filtParam)]);
  }, [vyrobkySpecs, currentCisloVykresu]);

  const handleParamChange = (e) => {
    setCurrentParam(e.currentTarget.dataset.param);
  };

  return (
    <section className="new-vyroba-params mt-2">
      <h3>{param}</h3>
      <div className="d-flex flex-wrap justify-content-center">
        {availableParam.map((params) => {
          const isDisabled = disabledParams.includes(params);
          return (
            <article
              className={`vyrobok-card m-3 ${
                currentParam === params ? "active-elem" : ""
              } ${isDisabled ? "disabled-elem" : ""}`}
              key={params}
              data-param={params}
              onClick={handleParamChange}
            >
              <h4>
                {param}: {params}
              </h4>
            </article>
          );
        })}
      </div>
    </section>
  );
}
