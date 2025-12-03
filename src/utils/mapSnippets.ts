import type { SnippetData, SnippetMarks } from "../types/snippets.types";

export const snippetMapper = {
  getLikes: (snippet: SnippetData) =>
    snippet.marks.filter((mark: SnippetMarks) => mark.type === "like").length,
  getDislikes: (snippet: SnippetData) =>
    snippet.marks.filter((mark: SnippetMarks) => mark.type === "dislike").length,
  getCommentsAmount: (snippet: SnippetData) => snippet.comments.length,
};
