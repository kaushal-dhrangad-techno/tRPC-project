import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router";

const navItems = [
  { title: "All Tasks", url: "/" },
  { title: "Active", url: "/active" },
  { title: "Completed", url: "/completed" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex w-full justify-center items-center fixed top-0 z-50">
      {/* Desktop and tablet navbar */}
      <div className="hidden md:flex w-full items-center justify-center">
        <ul className="flex justify-center items-center gap-6 py-3 mt-2 bg-zinc-200 w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg">
          {navItems.map((item) => (
            <li key={item.url} className=" px-2 py-1 rounded">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive ? "bg-blue-600 px-2 py-2 rounded-md text-white font-bold" : ""
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden flex w-full flex-col items-center">
        {/* Toggle button */}
        <button
          onClick={toggleMenu}
          className="self-end mr-4 mt-2 p-2 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <ul className="flex flex-col justify-center items-center gap-4 py-3 mt-2 bg-gray-300 w-5/6 mx-auto rounded-lg">
            {navItems.map((item) => (
              <li
                key={item.url}
                className="px-4 py-2 rounded w-3/4 text-center"
              >
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-800"
                  }
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
