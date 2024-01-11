import React from "react";
import DesktopIcon from "./DesktopIcon";

function Desktop({
  programs,
  handleIconClick,
  clickedIcon,
  hideAllVisibleAndUnclickIcons,
}) {
  return (
    <div>
      <div
        id="desktop"
        onClick={() => {
          hideAllVisibleAndUnclickIcons("dektop");
        }}
      ></div>
      <div id="desktopIconSpace">
        {programs.map((item) => (
          <DesktopIcon
            clicked={item.id === clickedIcon}
            handleIconClick={handleIconClick}
            program={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Desktop;
