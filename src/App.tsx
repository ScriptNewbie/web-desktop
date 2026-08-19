import { useState, useEffect, type MouseEvent } from "react";

import Bar from "./components/bar/Bar";
import "./App.css";
import Desktop from "./components/Desktop";
import WindowsContainer from "./components/WindowsContainer";
import Calendar from "./components/bar/Calendar";
import Menu from "./components/bar/Menu";
import programs from "./components/programs";
import { initialFilesystem } from "./tools/filesystem";
import preventTouchScroll from "./tools/preventTouchScroll";
import createRunningProgram from "./classes/runningPrograms";
import type { ProgramProps, RunningProgram } from "./types";

function App() {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filesystem, setFilesystem] = useState(initialFilesystem);
  const [running, setRunning] = useState<RunningProgram[]>([]);
  const [clickedIcon, setClickedIcon] = useState<number | null>(null);

  const programProps: ProgramProps = { filesystem, setFilesystem };

  const onTopRunning = running.reduce<RunningProgram | null>(
    (a, b) => (a && a.zIndex > b.zIndex ? a : b),
    null
  );

  const hideAllVisibleAndUnclickIcons = (source: string) => {
    setClickedIcon(null);
    if (source !== "menu") setMenuVisible(false);
    if (source !== "calendar") setCalendarVisible(false);
  };

  const toggleMenu = () => {
    hideAllVisibleAndUnclickIcons("menu");
    setMenuVisible(!menuVisible);
  };

  const toggleCalendar = () => {
    hideAllVisibleAndUnclickIcons("calendar");
    setCalendarVisible(!calendarVisible);
  };

  const closeRunning = (e: MouseEvent | undefined, id: number) => {
    e?.stopPropagation();
    hideAllVisibleAndUnclickIcons("closeProgram");
    const runningCopy = [...running];
    const current = runningCopy.find((c) => c.pid === id);
    if (!current) return;
    runningCopy.splice(runningCopy.indexOf(current), 1);
    setRunning(runningCopy);
  };

  const changeOnTopRunning = (pid: number) => {
    hideAllVisibleAndUnclickIcons("changeProgram");

    if (pid !== onTopRunning?.pid) {
      const runningCopy = [...running];
      const current = runningCopy.find((c) => c.pid === pid);
      if (!current) return;
      current.zIndex = (onTopRunning?.zIndex || 0) + 1;
      setRunning(runningCopy);
    }
  };

  const startProgram = (id: number) => {
    const program = programs.find((c) => c.id === id);
    if (!program) return;
    hideAllVisibleAndUnclickIcons("startProgram");
    const runningCopy = [...running];
    const current = runningCopy.find((c) => c.id === program.id);

    if (!current || current.allowMultipleInstances) {
      const lastPid = runningCopy[runningCopy.length - 1]?.pid ?? -1;
      const newProgram = createRunningProgram(
        lastPid + 1,
        program,
        (onTopRunning?.zIndex || 0) + 1
      );
      runningCopy.push(newProgram);
      setRunning(runningCopy);

      return;
    }

    if (current.pid === onTopRunning?.pid) {
      const shakeThis = document.getElementsByClassName(
        "window" + current.pid
      )[0];
      if (!shakeThis) return;
      shakeThis.classList.add("shake");
      setTimeout(() => {
        shakeThis.classList.remove("shake");
      }, 200);
      return;
    }

    changeOnTopRunning(current.pid);
  };

  const handleIconClick = (id: number) => {
    hideAllVisibleAndUnclickIcons("icon");
    if (clickedIcon == id) {
      startProgram(id);
      setClickedIcon(null);
      return;
    }
    setClickedIcon(id);
  };

  const menuClicked = (id: number) => {
    startProgram(id);
  };

  useEffect(preventTouchScroll, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Desktop
        programs={programs}
        clickedIcon={clickedIcon}
        handleIconClick={handleIconClick}
        hideAllVisibleAndUnclickIcons={hideAllVisibleAndUnclickIcons}
      />

      <WindowsContainer
        changeOnTopRunning={changeOnTopRunning}
        running={running}
        closeRunning={closeRunning}
        programProps={programProps}
        onTop={onTopRunning}
      />
      <Bar
        programs={programs}
        running={running}
        changeOnTopRunning={changeOnTopRunning}
        toggleCalendar={toggleCalendar}
        toggleMenu={toggleMenu}
        onTop={onTopRunning}
      />
      <Menu
        programs={programs}
        menuVisible={menuVisible}
        menuClicked={menuClicked}
      />
      <Calendar calendarVisible={calendarVisible} />
    </div>
  );
}

export default App;

//coolify redeploy test
