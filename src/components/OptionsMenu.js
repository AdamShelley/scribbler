import React, { useState } from "react";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";

const OptionsMenu = ({ children }) => {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
      }}
    >
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
      >
        {children}
        <MenuItem>Save</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Archive</MenuItem>
      </ControlledMenu>
    </div>
  );
};

export default OptionsMenu;
