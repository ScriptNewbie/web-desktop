import React from "react";
import Window from "./Window";

function WindowsContainer({
  running,
  changeOnTopRunning,
  closeRunning,
  programProps,
  onTop,
}) {
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
          onTop={item.pid === onTop.pid}
          programProps={programProps}
          Component={item.component}
        ></Window>
      ))}
    </div>
  );
}

export default WindowsContainer;
