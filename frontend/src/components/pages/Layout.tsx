import React from "react";
import AddTask from "./AddTask";
import Task from "./Task";

const Layout = () => {
  return (
    <>
      {/* <div className="flex h-screen flex-col gap-10 pt-16 justify-center"> */}
        <AddTask />
        <Task />
    </>
  );
};

export default Layout;
