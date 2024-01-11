import React from "react";

function DesktopIcon({ program, handleIconClick, clicked }) {
  const { id, name, icon } = program;
  const style = clicked
    ? {
        backgroundColor: "rgba(0,0,0,0.4)",
      }
    : {};
  return (
    <div
      id="desktopIcon"
      style={style}
      onClick={() => {
        handleIconClick(id);
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          backgroundImage: "url(" + icon + ")",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        style={{
          fontSize: "0.88rem",
          textAlign: "center",
          textShadow: "0 0 3px #FFFFFF, 0 0 5px #FFFFFF",
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default DesktopIcon;
