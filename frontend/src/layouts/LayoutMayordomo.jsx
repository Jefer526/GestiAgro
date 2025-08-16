// src/layouts/LayoutMayordomo.jsx
import React from "react";
import SidebarMayordomo from "../components/SidebarMayordomo";

const LayoutMayordomo = ({ children }) => {
  return (
    <div className="min-h-[100dvh] bg-gray-50 flex">
      <SidebarMayordomo />
      <main className="ml-28 min-h-[100dvh] p-10 w-full">{children}</main>
    </div>
  );
};

export default LayoutMayordomo;
