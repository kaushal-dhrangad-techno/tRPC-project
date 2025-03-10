import AddTask from "./AddTask";
import Task from "./Task";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      {/* <div className="flex h-screen flex-col gap-10 pt-16 justify-center"> */}
      <Navbar />
      <AddTask />
      <Task />
    </>
  );
};

export default Layout;
