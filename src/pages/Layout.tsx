import React from "react";
import { Outlet } from "react-router-dom";
import { ButtonBack } from "../UI";

const Layout = () => {
  return (
    <div>
      <ButtonBack />
      <Outlet />
    </div>
  );
};

export default Layout;
