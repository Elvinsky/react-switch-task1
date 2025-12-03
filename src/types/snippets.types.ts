export interface SnippetComment {
  content: string;
  id: string;
}

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface SnippetMarks {
  id: string;
  type: "like" | "dislike";
  user: User;
}

export interface SnippetData {
  code: string;
  comments: SnippetComment[];
  id: string;
  language: string;
  marks: SnippetMarks[];
  user: User;
}

export interface SnippetLinks {
  current: string;
  last: string;
  next: string;
}

export interface SnippetMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  sortBy: [string, "ASC" | "DESC"][];
}

export interface Snippet {
  data: SnippetData[];
  links: SnippetLinks;
  meta: SnippetMeta;
}

export interface SnippetComponentProps {
  snippet: SnippetData;
  idDetailedView: boolean;
  onClick: (snippet: SnippetData) => void;
}
