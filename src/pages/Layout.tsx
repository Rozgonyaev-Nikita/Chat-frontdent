import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="gridSeparator">
      <div className="asidePanel"></div>
      <Outlet />
      <div className="asidePanel"></div>
    </div>
  );
};

export default Layout;
