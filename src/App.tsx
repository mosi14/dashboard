import { Routes, Route } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductsPage from "./pages/Products";
import LoginPage from "./pages/Login";
import Layout from "./components/Layout";
import ProfilePage from "./pages/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <ProductsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
