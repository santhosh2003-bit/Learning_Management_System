import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="parent-container px-4 py-2 flex lg:justify-evenly items-center sticky top-0 md:justify-evenly sm:flex sm:justify-between justify-between bg-gray-200 shadow-md   ">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img
              src="/logo.jpg"
              alt="logo"
              className="w-16 h-16 md:w-24 md:h-24"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-row space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-10 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-10 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
          >
            About us
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-10 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-10 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
          >
            Contact us
          </NavLink>
        </div>

        {/* Register Button (visible on desktop) */}
        <div className="hidden md:block">
          <Link
            to="/auth/login"
            className="bg-black text-white px-4 rounded-md py-3 cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Log In
          </Link>
        </div>

        {/* Hamburger Menu Button (visible on mobile) */}
        <button
          onClick={handleToggle}
          className="md:hidden flex items-center cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
        md:hidden bg-white shadow-lg py-4 px-4 fixed top-20 right-0 w-72 h-72 z-10
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-8 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-8 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
          >
            About us
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-8 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "underline decoration-blue-500 underline-offset-8 font-semibold cursor-pointer"
                : "hover:text-gray-700 cursor-pointer"
            }
            // onClick={() => setIsOpen(false)}
          >
            Contact us
          </NavLink>
          <div className="pt-2">
            <Link
              to="/auth/login"
              className="inline-block bg-black text-white px-4 rounded-md py-2 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
