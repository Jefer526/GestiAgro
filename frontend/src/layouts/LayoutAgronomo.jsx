// src/layouts/LayoutAgronomo.jsx
import React from "react";
import SidebarAgronomo from "../components/SidebarAgronomo";

const LayoutAgronomo = ({ children }) => {
  return (
    <div className="flex">
      <SidebarAgronomo />
      <main className="flex-1 p-10 ml-28">{children}</main>
    </div>
  );
};

export default LayoutAgronomo;
