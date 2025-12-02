import { createFetchRequest, isFetchError } from "./helpers/create-fetch-request";

interface MeResponse {
  id: string;
  username: string;
  role: string;
}

export { isFetchError };

export const queryFunctions = {
  getAnswers: async () => {
    const { data } = await createFetchRequest("/api/answers");
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

  getMe: async () => {
    const { data } = await createFetchRequest<MeResponse>("/api/me");
    return data;
  },
};
