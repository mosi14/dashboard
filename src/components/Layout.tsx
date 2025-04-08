import React, { useState } from "react";
import {  useNavigate } from "react-router";
import {
  FaHome,
  FaUser,
  FaBox,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import NavItem from "./NavItem";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
      {/* Sidebar - For Desktop  */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white p-5">
        <div className="text-2xl font-bold text-center mb-8">My Dashboard</div>
        <nav className="flex flex-col gap-4">
          <NavItem to="/home" icon={<FaHome />} label="Home" />
          <NavItem to="/profile" icon={<FaUser />} label="Profile" />
          <NavItem to="/products" icon={<FaBox />} label="Products" />
          <NavItem to="/settings" icon={<FaCog />} label="Settings" />
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 p-3 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Sidebar - For Mobile  */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50">
        <h2 className="text-xl font-bold">My Dashboard</h2>
        <FaBars
          size={24}
          onClick={() => setSidebarOpen(true)}
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
            className="fixed top-0 left-0 w-64 h-full bg-gray-100 dark:bg-gray-800 p-4 z-50 shadow-lg"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <FaTimes
                size={24}
                onClick={() => setSidebarOpen(false)}
                className="cursor-pointer"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              <NavItem to="/home" icon={<FaHome />} label="Home" onClick={() => setSidebarOpen(false)} />
              <NavItem to="/profile" icon={<FaUser />} label="Profile" onClick={() => setSidebarOpen(false)} />
              <NavItem to="/products" icon={<FaBox />} label="Products" onClick={() => setSidebarOpen(false)} />
              <NavItem to="/settings" icon={<FaCog />} label="Settings" onClick={() => setSidebarOpen(false)} />

              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 text-red-500 hover:bg-red-600 hover:text-white p-3 rounded-lg transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* End of Mobile Display */}


      <main className="flex-1 p-4 mt-16 md:mt-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
