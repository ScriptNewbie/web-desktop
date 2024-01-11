import React, { useState } from "react";
import Filesystem from "../../../tools/filesystem";
import Icon from "./Icon";

function MyComputer({ setFilesystem, filesystem }) {
  const { content } = Filesystem.getPathContent(filesystem, "/home");
  const [clicked, setClicked] = useState(null);
  console.log(clicked);
  return (
    <div
      id="myComputerMainDiv"
      onClick={(e) => {
        if (e.target.id === "myComputerMainDiv") setClicked(null);
      }}
      style={{
        backgroundColor: "white",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Object.keys(content).map((name, index) => (
        <Icon
          key={index}
          onClick={() => {
            if (name === clicked) {
              return setClicked(null);
            }
            setClicked(name);
          }}
          clicked={name === clicked}
          type={content[name].type}
          name={name}
        />
      ))}
    </div>
  );
}

export default MyComputer;
