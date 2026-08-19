import type { DesktopProgram } from "../../types";

type MenuEntryProps = {
  program: DesktopProgram;
  menuClicked: (id: number) => void;
};

function MenuEntry({ program, menuClicked }: MenuEntryProps) {
  const { id, name, icon } = program;
  return (
    <div
      id="menuEntry"
      onClick={() => {
        menuClicked(id);
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          backgroundImage: "url(" + icon + ")",
          backgroundSize: "cover",
        }}
      ></div>
      <div style={{ color: "white", marginLeft: "20px", fontSize: "1.5rem" }}>
        {name}
      </div>
    </div>
  );
}

export default MenuEntry;
