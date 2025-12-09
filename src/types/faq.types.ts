import type { User } from "./snippets.types";

export interface FAQ {
  id: string;
  title: string;
  description: string;
  code?: string;
  user: User;
  viewsCount?: number;
}

export interface FAQResponse {
  data: FAQ;
}

export interface FAQsResponse {
  data: FAQ[];
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

export interface FAQComponentProps {
  faq: FAQ;
  onClick: (faq: FAQ) => void;
}
