import DesktopIcon from "./DesktopIcon";
import type { DesktopProgram } from "../types";

type DesktopProps = {
  programs: DesktopProgram[];
  handleIconClick: (id: number) => void;
  clickedIcon: number | null;
  hideAllVisibleAndUnclickIcons: (source: string) => void;
};

function Desktop({
  programs,
  handleIconClick,
  clickedIcon,
  hideAllVisibleAndUnclickIcons,
}: DesktopProps) {
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
