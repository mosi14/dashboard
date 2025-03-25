import { useTheme } from "../context/ThemeContext";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="mt-4 flex items-center gap-4">
        <span>Theme:</span>
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-700 text-white rounded-md"
        >
          {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;