// src/layouts/LayoutMayordomo.jsx
import React from "react";
import SidebarMayordomo from "../components/SidebarMayordomo";

const LayoutMayordomo = ({ children }) => {
  return (
    <div className="flex">
      <SidebarMayordomo />
      <main className="ml-28 min-h-[100dvh] p-10 w-full">{children}</main>
    </div>
  );
};

export default LayoutMayordomo;
