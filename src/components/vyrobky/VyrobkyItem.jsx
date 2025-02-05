import { VyrobkySpec } from "./VyrobkySpec";

export function VyrobkyItem({ item, vyrobkySpecs }) {
  return (
    <>
      <div className="d-flex flex-wrap">
        <p className="me-3">
          Číslo Výkresu: <span>{item.cisloVykresu}</span>
        </p>
        <p className="me-3">
          Firma: <span>{item.firma}</span>
        </p>
        <p className="me-3">
          Názov: <span>{item.nazov}</span>
        </p>
      </div>
      <div className="d-flex flex-wrap">
        <VyrobkySpec
          cisloVykresu={item.cisloVykresu}
          vyrobkySpecs={vyrobkySpecs}
          itemSpecification={"Poloha"}
        />
        <VyrobkySpec
          cisloVykresu={item.cisloVykresu}
          vyrobkySpecs={vyrobkySpecs}
          itemSpecification={"Pracovisko"}
        />
        <VyrobkySpec
          cisloVykresu={item.cisloVykresu}
          vyrobkySpecs={vyrobkySpecs}
          itemSpecification={"Čas"}
        />
        <VyrobkySpec
          cisloVykresu={item.cisloVykresu}
          vyrobkySpecs={vyrobkySpecs}
          itemSpecification={"Upnutie"}
        />
      </div>
    </>
  );
}
