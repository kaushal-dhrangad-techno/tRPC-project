const Navbar = () => {
  return (
    <nav className="flex w-full justify-center items-center fixed">
      <div className="flex  w-full items-center justify-center ">
        <ul className="flex justify-center items-center gap-6 py-3 mt-2 bg-zinc-500 w-1/2 mx-auto rounded-lg ">
          <li className="bg-red-500 px-2 py-1 rounded">
            <a href="/">All Task </a>
          </li>

          <li className="bg-red-500 px-2 py-1 rounded">
            <a href="active">Active </a>
          </li>

          <li className="bg-red-500 px-2 py-1 rounded">
            <a href="completed">Completed </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
