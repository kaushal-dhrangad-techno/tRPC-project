import  { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
          <li className="bg-red-500 px-2 py-1 rounded">
            <a href="/">All Task</a>
          </li>
          <li className="bg-red-500 px-2 py-1 rounded">
            <a href="active">Active</a>
          </li>
          <li className="bg-red-500 px-2 py-1 rounded">
            <a href="completed">Completed</a>
          </li>
        </ul>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden flex w-full flex-col items-center">
        {/* Toggle button */}
        <button 
          onClick={toggleMenu} 
          className="self-end mr-4 mt-2  p-2 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile menu */}
        {isOpen && (
          <ul className="flex flex-col justify-center items-center gap-4 py-3 mt-2 bg-gray-300 w-5/6 mx-auto rounded-lg">
            <li className=" px-4 py-2 rounded w-3/4 text-center">
              <a href="/">All Task</a>
            </li>
            <li className=" px-4 py-2 rounded w-3/4 text-center">
              <a href="active">Active</a>
            </li>
            <li className=" px-4 py-2 rounded w-3/4 text-center">
              <a href="completed">Completed</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

