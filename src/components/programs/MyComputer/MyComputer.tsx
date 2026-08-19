import { useState } from "react";
import Filesystem from "../../../tools/filesystem";
import Icon from "./Icon";
import type { ProgramWindowProps } from "../../../types";

function MyComputer({ filesystem }: ProgramWindowProps) {
  const pathContent = Filesystem.getPathContent(filesystem, "/home");
  const content =
    pathContent.pathExists && pathContent.isDirectory
      ? pathContent.content
      : {};
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div
      id="myComputerMainDiv"
      onClick={(e) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.id === "myComputerMainDiv"
        )
          setClicked(null);
      }}
      style={{
        backgroundColor: "white",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Object.entries(content).map(([name, node]) => (
        <Icon
          key={name}
          onClick={() => {
            if (name === clicked) {
              return setClicked(null);
            }
            setClicked(name);
          }}
          clicked={name === clicked}
          type={node.type}
          name={name}
        />
      ))}
    </div>
  );
}

export default MyComputer;
