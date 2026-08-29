"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";
import { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string; address?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
  isAdmin: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("anmool_token");
    if (token) {
      api.getMe()
        .then((data) => setUser(data.user))
        .catch(() => localStorage.removeItem("anmool_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    localStorage.setItem("anmool_token", data.token);
    setUser(data.user);
  };

  const register = async (body: { name: string; email: string; password: string; phone?: string; address?: string }) => {
    const data = await api.register(body);
    localStorage.setItem("anmool_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("anmool_token");
    setUser(null);
  };

  const updateUser = (u: User) => setUser(u);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
