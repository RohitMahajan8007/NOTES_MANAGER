import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (name, email, password, profileImage) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const newUser = { id: uuidv4(), name, email, password, profileImage };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      setUser(validUser);
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const updateProfile = (updates) => {
    if (!user) return { success: false, message: "No user logged in" };

    const updatedUser = { ...user, ...updates };


    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { success: true };
  };

  const value = {
    user,
    register,
    login,
    logout,
    updateProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
