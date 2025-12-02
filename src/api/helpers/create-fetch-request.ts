const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const createFetchRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "";

  const fullUrl = baseUrl ? `${baseUrl}${url}` : url;

  const accessToken = getCookie("access_token");

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(fullUrl, fetchOptions);
  const data = await response.json();
  return data;
};
