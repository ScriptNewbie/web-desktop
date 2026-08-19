import Window from "./Window";
import type { MouseEvent } from "react";
import type { ProgramProps, RunningProgram } from "../types";

type WindowsContainerProps = {
  running: RunningProgram[];
  changeOnTopRunning: (pid: number) => void;
  closeRunning: (event: MouseEvent | undefined, pid: number) => void;
  programProps: ProgramProps;
  onTop: RunningProgram | null;
};

function WindowsContainer({
  running,
  changeOnTopRunning,
  closeRunning,
  programProps,
  onTop,
}: WindowsContainerProps) {
  return (
    <div>
      {running.map((item) => (
        <Window
          changeOnTopRunning={changeOnTopRunning}
          pid={item.pid}
          key={item.pid}
          startPosition={100 + item.pid * 20}
          closeRunning={closeRunning}
          name={item.name}
          icon={item.icon}
          startWidth={item.width}
          startHeight={item.height}
          minWidth={item.minWidth}
          minHeight={item.minHeight}
          zIndex={item.zIndex}
          onTop={item.pid === onTop?.pid}
          programProps={programProps}
          Component={item.component}
        ></Window>
      ))}
    </div>
  );
}

export default WindowsContainer;
