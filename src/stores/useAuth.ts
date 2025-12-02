import { create } from "zustand";
import { queryFunctions } from "../api/query-functions";

export const useAuth = create((set) => ({
  isAuthenticated: false,
  isAuthLoading: false,
  authError: null,
  login: async (login: string, password: string) => {
    set({ isAuthLoading: true });
    try {
      await queryFunctions.login(login, password);
      set({ isAuthenticated: true });
    } catch (error) {
      console.error(error);
      set({ authError: error });
    } finally {
      set({ isAuthLoading: false });
    }
  },
  register: async (login: string, password: string) => {
    set({ isAuthLoading: true });
    try {
      await queryFunctions.register(String(login), String(password));
      set({ isAuthenticated: true });
    } catch (error) {
      console.error(error);
      set({ authError: error });
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));
