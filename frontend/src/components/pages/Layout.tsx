import { Outlet } from "react-router";
import Navbar from "./Navbar";
import AddTask from "./AddTask";
import { useDispatch } from "react-redux";

const Layout = () => {

  return (
    <>
      <Navbar />
      <AddTask />
      <Outlet /> {/* This will render the component for the current route */}
    </>
  );
};

export default Layout;
