import { useState } from "react";

import "../assets/css/calendar.css";

import { VyrobaMenu } from "./calendar/VyrobaMenu";
import { VyrobaCalendar } from "./calendar/VyrobaCalendar";
import { VyrobaInfoAlert } from "./popups/VyrobaInfoAlert";

export function Vyroba({
  tableIndex,
  vyroba,
  setVyroba,
  setEditing,
  currentEdit,
  setCurrentEdit,
}) {
  let [newDate, setNewDate] = useState(new Date());
  const [activeStroj, setActiveStroj] = useState("5os");
  const [isClicked, setClicked] = useState(false);

  return (
    <section className="vyroba">
      <VyrobaMenu date={newDate} setNewDate={setNewDate} />
      <div className="d-md-flex d-lg-none justify-content-center">
        <button
          className={`me-3 ${
            activeStroj === "5os"
              ? "btn-custom btn-custom-active"
              : "btn-custom-non-active"
          }`}
          onClick={() => setActiveStroj("5os")}
        >
          5os
        </button>
        <button
          className={`me-3 ${
            activeStroj === "3os"
              ? "btn-custom btn-custom-active"
              : "btn-custom-non-active"
          }`}
          onClick={() => setActiveStroj("3os")}
        >
          3os
        </button>
        <button
          className={`${
            activeStroj === "4os"
              ? "btn-custom btn-custom-active"
              : "btn-custom-non-active"
          }`}
          onClick={() => setActiveStroj("4os")}
        >
          4os
        </button>
      </div>
      <article className="vyroba-stroje">
        <div className="d-flex calendar">
          <section className="smeny pt-3 ps-3 pe-3">
            <h3>ČAS</h3>
            <ul className="tableCol mt-3 mb-0">
              {tableIndex.map((index) => (
                <li key={index} id={index} className="tableTimeRow">
                  {index}:00
                </li>
              ))}
            </ul>
          </section>
          <div className="stroje d-none d-lg-flex flex-wrap">
            <VyrobaCalendar
              strojId={"5os"}
              tableIndex={tableIndex}
              newDate={newDate}
              vyroba={vyroba}
              setEditing={setEditing}
              setCurrentEdit={setCurrentEdit}
              setClicked={setClicked}
            />
            <VyrobaCalendar
              strojId={"3os"}
              tableIndex={tableIndex}
              newDate={newDate}
              vyroba={vyroba}
              setEditing={setEditing}
              setCurrentEdit={setCurrentEdit}
              setClicked={setClicked}
            />
            <VyrobaCalendar
              strojId={"4os"}
              tableIndex={tableIndex}
              newDate={newDate}
              vyroba={vyroba}
              setEditing={setEditing}
              setCurrentEdit={setCurrentEdit}
              setClicked={setClicked}
            />
          </div>
          <div className="stroje d-md-flex d-lg-none">
            <VyrobaCalendar
              strojId={activeStroj}
              tableIndex={tableIndex}
              newDate={newDate}
              vyroba={vyroba}
              setEditing={setEditing}
              setCurrentEdit={setCurrentEdit}
              setClicked={setClicked}
            />
          </div>
        </div>
      </article>
      {isClicked === true && (
        <VyrobaInfoAlert
          setClicked={setClicked}
          currentEdit={currentEdit}
          setVyroba={setVyroba}
        />
      )}
    </section>
  );
}
