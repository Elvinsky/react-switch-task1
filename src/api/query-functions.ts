import { QueryKeys } from "../constants/queryKeys";
import type {
  MeResponse,
  UserResponse,
  UserStatsResponse,
  UsersResponse,
} from "../types/api/api.types";
import type { FAQResponse, FAQsResponse } from "../types/faq.types";
import type { Snippet, SnippetData } from "../types/snippets.types";
import { createFetchRequest, isFetchError } from "./helpers/create-fetch-request";
import { queryClient } from "./queryClient";

export { isFetchError };

type QueryKey = readonly unknown[];

export const queryFunctions = {
  getAnswers: async (): Promise<unknown> => {
    const response = await queryClient.fetchQuery<unknown, Error, unknown, QueryKey>({
      queryKey: [QueryKeys.getAnswers],
      queryFn: async () => {
        const { data } = await createFetchRequest("/api/answers");
        return data;
      },
    });
    return response;
  },

  getSnippets: async (): Promise<Snippet> => {
    const response = await queryClient.fetchQuery<Snippet, Error, Snippet, QueryKey>({
      queryKey: [QueryKeys.getSnippets],
      queryFn: async () => {
        const { data } = await createFetchRequest<Snippet>(
          "/api/snippets?page=1&limit=1500&sortBy=id:ASC"
        );
        return data;
      },
    });
    return response;
  },

  getSnippet: async (id: string): Promise<SnippetData> => {
    const response = await queryClient.fetchQuery<SnippetData, Error, SnippetData, QueryKey>({
      queryKey: [QueryKeys.getSnippet, id],
      queryFn: async () => {
        const { data } = await createFetchRequest<SnippetData>(`/api/snippets/${id}`);
        return data;
      },
    });
    return response;
  },

  markSnippet: async (id: string, type: "like" | "dislike"): Promise<unknown> => {
    const { data } = await createFetchRequest(`/api/snippets/${id}/mark`, {
      method: "POST",
      body: JSON.stringify({ mark: type }),
    });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getSnippet, id] });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getSnippets] });
    return data;
  },

  addComment: async (id: string, comment: string): Promise<unknown> => {
    const { data } = await createFetchRequest("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content: comment, snippetId: Number(id) }),
    });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getSnippet, id] });
    return data;
  },

  createSnippet: async (language: string, code: string): Promise<SnippetData> => {
    const { data } = await createFetchRequest<SnippetData>("/api/snippets", {
      method: "POST",
      body: JSON.stringify({ language, code }),
    });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getSnippets] });
    return data;
  },

  login: async (login: string, password: string): Promise<unknown> => {
    const { data } = await createFetchRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: login, password }),
    });
    return data;
  },

  logout: async (): Promise<unknown> => {
    const { data } = await createFetchRequest("/api/auth/logout", {
      method: "POST",
    });
    return data;
  },

  register: async (login: string, password: string): Promise<unknown> => {
    const { data } = await createFetchRequest("/api/register", {
      method: "POST",
      body: JSON.stringify({ username: login, password }),
    });
    return data;
  },

  getMe: async (): Promise<MeResponse> => {
    const response = await queryClient.fetchQuery<MeResponse, Error, MeResponse, QueryKey>({
      queryKey: [QueryKeys.getMe],
      queryFn: async () => {
        const { data } = await createFetchRequest<MeResponse>("/api/me");
        return data;
      },
    });
    return response;
  },

  getUserStats: async (id: string): Promise<UserStatsResponse> => {
    const response = await queryClient.fetchQuery<
      UserStatsResponse,
      Error,
      UserStatsResponse,
      QueryKey
    >({
      queryKey: [QueryKeys.getUserStats, id],
      queryFn: async () => {
        const { data } = await createFetchRequest<UserStatsResponse>(`/api/users/${id}/statistic`);
        return data;
      },
    });
    return response;
  },

  getUsers: async (): Promise<UsersResponse> => {
    const response = await queryClient.fetchQuery<UsersResponse, Error, UsersResponse, QueryKey>({
      queryKey: [QueryKeys.getUsers],
      queryFn: async () => {
        const { data } = await createFetchRequest<UsersResponse>(
          "/api/users?page=1&limit=150&sortBy=id:ASC"
        );
        return data;
      },
    });
    return response;
  },

  getUser: async (id: string): Promise<UserResponse> => {
    const response = await queryClient.fetchQuery<UserResponse, Error, UserResponse, QueryKey>({
      queryKey: [QueryKeys.getUser, id],
      queryFn: async () => {
        const { data } = await createFetchRequest<UserResponse>(`/api/users/${id}`);
        return data;
      },
    });
    return response;
  },

  changeMyUsername: async (username: string): Promise<MeResponse> => {
    const { data } = await createFetchRequest<MeResponse>("/api/me", {
      method: "PATCH",
      body: JSON.stringify({ username }),
    });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getMe] });
    return data;
  },

  deleteMe: async (): Promise<unknown> => {
    const { data } = await createFetchRequest("/api/me", {
      method: "DELETE",
    });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getMe] });
    return data;
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<unknown> => {
    const { data } = await createFetchRequest("/api/me/password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return data;
  },

  getFAQs: async (): Promise<FAQsResponse> => {
    const response = await queryClient.fetchQuery<FAQsResponse, Error, FAQsResponse, QueryKey>({
      queryKey: [QueryKeys.getFAQs],
      queryFn: async () => {
        const { data } = await createFetchRequest<FAQsResponse>(
          "/api/questions?page=1&limit=1500&sortBy=id:ASC"
        );
        return data;
      },
    });
    return response;
  },

  getFAQ: async (id: string): Promise<FAQResponse> => {
    const response = await queryClient.fetchQuery<FAQResponse, Error, FAQResponse, QueryKey>({
      queryKey: [QueryKeys.getFAQ, id],
      queryFn: async () => {
        const { data } = await createFetchRequest<FAQResponse>(`/api/questions/${id}`);
        return data;
      },
    });
    return response;
  },

  createFAQ: async (title: string, description: string, code?: string): Promise<FAQResponse> => {
    const { data } = await createFetchRequest<FAQResponse>("/api/questions", {
      method: "POST",
      body: JSON.stringify({ title, description, code }),
    });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getFAQs] });
    return data;
  },

  updateFAQ: async (
    id: string,
    title: string,
    description: string,
    code?: string
  ): Promise<FAQResponse> => {
    const { data } = await createFetchRequest<FAQResponse>(`/api/questions/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, description, code }),
    });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getFAQ, id] });
    await queryClient.invalidateQueries({ queryKey: [QueryKeys.getFAQs] });
    return data;
  },
};
