import type {
  MeResponse,
  UserResponse,
  UserStatsResponse,
  UsersResponse,
} from "../types/api/api.types";
import { createFetchRequest, isFetchError } from "./helpers/create-fetch-request";

export { isFetchError };

export const queryFunctions = {
  getAnswers: async () => {
    const { data } = await createFetchRequest("/api/answers");
    return data;
  },

  getSnippets: async () => {
    const { data } = await createFetchRequest("/api/snippets?page=1&limit=1500&sortBy=id:ASC");
    return data;
  },

  getSnippet: async (id: string) => {
    const { data } = await createFetchRequest(`/api/snippets/${id}`);
    return data;
  },

  markSnippet: async (id: string, type: "like" | "dislike") => {
    const { data } = await createFetchRequest(`/api/snippets/${id}/mark`, {
      method: "POST",
      body: JSON.stringify({ mark: type }),
    });
    return data;
  },
  addComment: async (id: string, comment: string) => {
    const { data } = await createFetchRequest("/api//comments", {
      method: "POST",
      body: JSON.stringify({ content: comment, snippetId: Number(id) }),
    });
    return data;
  },

  createSnippet: async (language: string, code: string) => {
    const { data } = await createFetchRequest("/api/snippets", {
      method: "POST",
      body: JSON.stringify({ language, code }),
    });
    return data;
  },
  login: async (login: string, password: string) => {
    const { data } = await createFetchRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: login, password }),
    });
    return data;
  },
  logout: async () => {
    const { data } = await createFetchRequest("/api/auth/logout", {
      method: "POST",
    });
    return data;
  },

  register: async (login: string, password: string) => {
    const { data } = await createFetchRequest("/api/register", {
      method: "POST",
      body: JSON.stringify({ username: login, password }),
    });
    return data;
  },

  getMe: async (): Promise<MeResponse> => {
    const { data } = await createFetchRequest<MeResponse>("/api/me");
    return data;
  },

  getUserStats: async (id: string): Promise<UserStatsResponse> => {
    const { data } = await createFetchRequest<UserStatsResponse>(`/api/users/${id}/statistic`);
    return data;
  },

  getUsers: async (): Promise<UsersResponse> => {
    const { data } = await createFetchRequest<UsersResponse>(
      "/api/users?page=1&limit=150&sortBy=id:ASC"
    );
    return data;
  },

  getUser: async (id: string): Promise<UserResponse> => {
    const { data } = await createFetchRequest<UserResponse>(`/api/users/${id}`);
    return data;
  },

  changeMyUsername: async (username: string) => {
    const { data } = await createFetchRequest("/api/me", {
      method: "PATCH",
      body: JSON.stringify({ username }),
    });
    return data;
  },

  deleteMe: async () => {
    const { data } = await createFetchRequest("/api/me", {
      method: "DELETE",
    });
    return data;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const { data } = await createFetchRequest("/api/me/password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return data;
  },
};
