import React, { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // 👈 Profile icon fallback

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-base-200 shadow-md fixed w-full z-10 top-0 left-0 px-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Website Name */}
          <Link to="/" className="text-2xl font-bold text-purple-700">
            Jasmine
          </Link>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex space-x-6 lg:flex lg:items-center lg:gap-2">
            <Link to="/" className="text-black hover:text-purple-700">
              Home
            </Link>
            <a href="#events" className="text-black hover:text-purple-700">
              Events
            </a>
            {!user ? (
              <Link to="/login" className="text-black hover:text-red-500">
                <button className="btn bg-[#4c00b0] text-white">Login</button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Link to={"/profile"}>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="user"
                        className="size-10 rounded-full border-2 border-gray-300"
                      />
                    ) : (
                      <FaUserCircle className="text-4xl text-gray-500" />
                    )}
                  </Link>
                  <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                    {user.displayName || "User"}
                  </div>
                </div>
                <button
                  className="text-gray-200 btn bg-[#4c00b0] hover:text-red-500"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav Links (Mobile) */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow">
          <Link to="/" className="block text-gray-700 hover:text-purple-700">
            Home
          </Link>
          <Link
            to="/events"
            className="block text-gray-700 hover:text-purple-700"
          >
            Events
          </Link>
          <Link to="/logout" className="block text-gray-700 hover:text-red-500">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
