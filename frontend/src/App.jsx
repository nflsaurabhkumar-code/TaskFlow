import { Navigate, Route, Routes } from "react-router-dom";
import { useGetMeQuery } from "./services/authApi";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useGetMeQuery();
  if (isLoading)
    return <div className="center-screen">Loading TaskFlow...</div>;
  if (!data?.data?.user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
