import MenuEntry from "./MenuEntry";
import type { DesktopProgram } from "../../types";

type MenuProps = {
  menuVisible: boolean;
  programs: DesktopProgram[];
  menuClicked: (id: number) => void;
};

function Menu({ menuVisible, programs, menuClicked }: MenuProps) {
  return (
    <div>
      {menuVisible && (
        <div
          id="menu"
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        >
          {programs.map((item) => (
            <MenuEntry menuClicked={menuClicked} program={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
