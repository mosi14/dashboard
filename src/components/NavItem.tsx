import React from "react";
import { NavLink } from "react-router";

const NavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.JSX.Element;
  label: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition ${
          isActive ? "bg-gray-700" : "hover:bg-gray-800"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
};

export default NavItem;
