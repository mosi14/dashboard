import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaHome, FaUser, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import NavItem from "./NavItem";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Sidebar - Desktop */}

      <aside className="h-screen w-64 bg-gray-900 text-white p-5 flex flex-col">
        {/* LOGO */}

        <div className="text-2xl font-bold text-center mb-8">My Dashboard</div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-4">
          <NavItem to="/home" icon={<FaHome />} label="Home" />
          <NavItem to="/profile" icon={<FaUser />} label="Profile" />
          <NavItem to="/products" icon={<FaBox />} label="Products" />
          <NavItem to="/settings" icon={<FaCog />} label="Settings" />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 p-3 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-20">
        <FaBars
          size={24}
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>

      {/* Sidebar - Mobile Slide-in */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween" }}
            className="fixed top-0 left-0 w-64 h-full bg-gray-100 dark:bg-gray-800 p-4 z-30"
          >
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <nav className="space-y-2">
              <Link
                to="/profile"
                onClick={() => setSidebarOpen(false)}
                className="block hover:underline"
              >
                Profile
              </Link>
              <Link
                to="/products"
                onClick={() => setSidebarOpen(false)}
                className="block hover:underline"
              >
                Products
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">My Dashboard</h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
