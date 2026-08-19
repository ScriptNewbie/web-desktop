import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FilesystemNode } from "../../../tools/filesystem";
import type { MouseEventHandler } from "react";

type IconProps = {
  type: FilesystemNode["type"];
  name: string;
  clicked: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};

function Icon({ type, name, clicked, onClick }: IconProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
        backgroundColor: clicked ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        style={{ fontSize: 48 }}
        color={type === "directory" ? "orange" : "grey"}
        icon={type === "directory" ? faFolder : faFile}
      />
      {name}
    </div>
  );
}

export default Icon;
