import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  HeartIcon,
  FolderIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { account } from "../appwrite";

const Sidebar = ({ isOpen, closeSidebar, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-48 bg-black/95 text-white text-sm shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 z-20" : "-translate-x-full"}
          md:translate-x-0 md:z-auto`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 focus:outline-none md:hidden"
          onClick={closeSidebar}
        >
          ✕
        </button>

        <ul className="space-y-4 mt-20 p-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center bg-green-600 text-black w-full px-4 py-2 rounded-lg"
                  : "flex items-center w-full px-4 py-2 rounded-lg"
              }
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center bg-green-600 text-black w-full px-4 py-2 rounded-lg"
                  : "flex items-center w-full px-4 py-2 rounded-lg"
              }
            >
              <HeartIcon className="h-5 w-5 mr-3" />
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center bg-green-600 text-black w-full px-4 py-2 rounded-lg"
                  : "flex items-center w-full px-4 py-2 rounded-lg"
              }
            >
              <FolderIcon className="h-5 w-5 mr-3" />
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watch-party"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center bg-green-600 text-black w-full px-4 py-2 rounded-lg"
                  : "flex items-center w-full px-4 py-2 rounded-lg"
              }
            >
              <VideoCameraIcon className="h-5 w-5 mr-3" />
              Watch Party
            </NavLink>
          </li>
        </ul>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
