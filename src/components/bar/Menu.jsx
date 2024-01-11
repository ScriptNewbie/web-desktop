import React from "react";

import MenuEntry from "./MenuEntry";

function Menu({ menuVisible, programs, menuClicked }) {
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
