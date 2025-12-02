export interface FetchError {
  message: string;
  status: number;
  data: unknown;
}

export interface FetchResponse<T = unknown> {
  data: T;
  response: Response;
}

export const isFetchError = (error: unknown): error is FetchError => {
  return typeof error === "object" && error !== null && "status" in error && "message" in error;
};

export const createFetchRequest = async <T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<FetchResponse<T>> => {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  // Throw error object for non-2xx responses
  if (!response.ok) {
    const error: FetchError = {
      message: data.message || data.error || `Request failed with status ${response.status}`,
      status: response.status,
      data,
    };
    throw error;
  }

  return { data: data as T, response };
};
