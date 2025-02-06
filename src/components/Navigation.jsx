import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MobileNav } from "./navigation/MobileNav";
import { NavContent } from "./navigation/NavContent";

export function Navigation() {
  const location = useLocation();
  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(location.pathname);
    document.title = getTitle(location.pathname);
  }, [location.pathname]);

  const getTitle = (path) => {
    switch (path) {
      case "/historia":
        return "TPV | História";
      case "/stroje":
        return "TPV | Stroje";
      case "/vyrobky":
        return "TPV | Výrobky";
      case "/nova-vyroba":
        return "TPV | Nová výroba";
      default:
        return "TPV";
    }
  };
  return (
    <section className="navigacka">
      <NavContent active={active} />
      <MobileNav active={active} />
    </section>
  );
}
