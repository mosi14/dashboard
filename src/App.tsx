import React from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* TODO: Add /products route here */}
      </Routes>
    </>
  );
}

export default App;
