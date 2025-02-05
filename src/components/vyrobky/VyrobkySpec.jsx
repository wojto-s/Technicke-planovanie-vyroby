export function VyrobkySpec({ cisloVykresu, vyrobkySpecs, itemSpecification }) {
  const checkItem = (currentCisloVykresu, vyrobokSpec, itemSpec) => {
    let items = [];
    let currentItem = "";
    for (let i = 0; i <= vyrobokSpec.length; i++) {
      if (itemSpec === "Poloha") currentItem = vyrobokSpec[i]?.poloha;
      if (itemSpec === "Pracovisko") currentItem = vyrobokSpec[i]?.pracovisko;
      if (itemSpec === "Čas") currentItem = vyrobokSpec[i]?.cas;
      if (itemSpec === "Upnutie") currentItem = vyrobokSpec[i]?.upnutie;

      if (vyrobokSpec[i]?.cisloVykresu === currentCisloVykresu) {
        items.push(currentItem);
      }
    }
    const itemsReduced = [...new Set(items)];
    return itemsReduced.map((item) => <span className="me-1">{item},</span>);
  };

  return (
    <p className="me-3">
      {itemSpecification}:{" "}
      <span>{checkItem(cisloVykresu, vyrobkySpecs, itemSpecification)}</span>
    </p>
  );
}
