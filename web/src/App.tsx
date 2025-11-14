import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import AdminShell from "./AdminShell";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <Routes>
      {/* Login (Figma login page) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main HR dashboard (Figma admin home) */}
      <Route path="/hr" element={<AdminShell />} />

      {/* User Management page (CRUD users in MongoDB) */}
      <Route path="/hr/users" element={<UsersPage />} />

      {/* Default: send unknown routes to /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
