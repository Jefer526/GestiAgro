// src/layouts/LayoutAgronomo.jsx
import React from "react";
import SidebarAgronomo from "../components/SidebarAgronomo";

const LayoutAgronomo = ({ children }) => {
  return (
    <div className="flex">
      <SidebarAgronomo />
      <main className="ml-28 min-h-[100dvh] p-10 w-full">{children}</main>
    </div>
  );
};


export default LayoutAgronomo;
