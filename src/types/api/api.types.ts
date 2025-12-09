import type { UserStatistics } from "../auth/auth.types";
import type { User } from "../snippets.types";

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  links?: {
    current: string;
    last: string;
    next: string;
  };
  meta?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    sortBy: [string, "ASC" | "DESC"][];
  };
}

export interface UserStatsResponse {
  data: {
    statistic: UserStatistics;
  };
}

export interface UserResponse {
  data: User;
}

export interface UsersResponse {
  data: User[];
}

export interface MeResponse {
  data: {
    id: string;
    username: string;
    role: string;
  };
}
