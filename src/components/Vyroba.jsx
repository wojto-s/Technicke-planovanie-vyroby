import { useState } from "react";
import { VyrobaMenu } from "./calendar/VyrobaMenu";
import { VyrobaCalendar } from "./calendar/VyrobaCalendar";

export function Vyroba({ tableIndex, vyroba, setEditing, setCurrentEdit }) {
  let [newDate, setNewDate] = useState(new Date());

  return (
    <section className="vyroba">
      <VyrobaMenu date={newDate} setNewDate={setNewDate} />
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
          <div className="stroje d-flex">
            <VyrobaCalendar
              strojId={"5os"}
              tableIndex={tableIndex}
              newDate={newDate}
              vyroba={vyroba}
              setEditing={setEditing}
              setCurrentEdit={setCurrentEdit}
            />
            <VyrobaCalendar
              strojId={"3os"}
              tableIndex={tableIndex}
              newDate={newDate}
              vyroba={vyroba}
              setEditing={setEditing}
              setCurrentEdit={setCurrentEdit}
            />
            <VyrobaCalendar
              strojId={"4os"}
              tableIndex={tableIndex}
              newDate={newDate}
              vyroba={vyroba}
              setEditing={setEditing}
              setCurrentEdit={setCurrentEdit}
            />
          </div>
        </div>
      </article>
    </section>
  );
}
