// src/layouts/LayoutAdmin.jsx
import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="min-h-[100dvh] bg-gray-50 flex">
      <SidebarAdmin />
      <main className="ml-28 min-h-[100dvh] p-10 w-full">{children}</main>
    </div>
  );
};

export default LayoutAdmin;
