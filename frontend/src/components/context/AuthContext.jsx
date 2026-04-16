import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchMe();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setLoading(false);
    }
  }, [token]);

  const fetchMe = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Auth error:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
