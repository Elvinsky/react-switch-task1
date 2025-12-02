import { create } from "zustand";
import { queryFunctions } from "../api/query-functions";
import { router } from "../router";

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
  logout: async () => {
    set({ isAuthLoading: true });
    try {
      await queryFunctions.logout();
      set({ isAuthenticated: false });
    } catch (error) {
      console.error(error);
      set({ authError: error });
    } finally {
      set({ isAuthLoading: false });
      router.navigate("/login");
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
