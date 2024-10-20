import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/upload">upload</NavLink>
        </li>
        <li>
          <NavLink to="/download">download</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
