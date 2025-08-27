import { create } from "zustand";
import { api } from "../api/api.js";

export const useAuth = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
 
  fetchMe: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.user });
    } catch {}
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
