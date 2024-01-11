import React from "react";
import Clock from "./Clock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import BarProgramsRunning from "./BarProgramsRunning";

function Bar({
  running,
  toggleMenu,
  changeOnTopRunning,
  toggleCalendar,
  onTop,
}) {
  return (
    <div>
      <div id="bar">
        <div id="start" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faLeaf} />
        </div>
        <BarProgramsRunning
          changeOnTopRunning={changeOnTopRunning}
          running={running}
          onTop={onTop}
        />
        <Clock toggleCalendar={toggleCalendar} />
      </div>
    </div>
  );
}

export default Bar;
