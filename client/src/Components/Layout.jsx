import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center m-4 my-8">
        <div className="max-w-screen-xl flex flex-wrap w-full justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
