import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "../assets/css/navigation.css";

import { MobileNav } from "./navigation/MobileNav";
import { DesktopNav } from "./navigation/DesktopNav";
import { TabletMenu } from "./navigation/TabletMenu";

export function Navigation({ setEditing }) {
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
      <DesktopNav active={active} setEditing={setEditing} />
      <TabletMenu active={active} setEditing={setEditing} />
      <MobileNav active={active} setEditing={setEditing} />
    </section>
  );
}
