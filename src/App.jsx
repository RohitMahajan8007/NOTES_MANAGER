import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";
import Trash from "./pages/Trash";
import Reminders from "./pages/Reminders";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent = () => {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="archive" element={<Archive />} />
        <Route path="trash" element={<Trash />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <AppContent />
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
