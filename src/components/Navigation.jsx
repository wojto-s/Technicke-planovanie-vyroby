import $ from "jquery";
import { useRef } from "react";
import { NavContent } from "./navigation/NavContent";

export function Navigation() {
  return (
    <section className="navigacka-expandable">
      <NavContent />
    </section>
  );
}
