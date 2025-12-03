import type { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { isFetchError, queryFunctions } from "../api/query-functions";

export const FAQPageLoader: LoaderFunction = async () => {
  console.log("FAQPageLoader");
  return true;
};

export const FAQEditorPageLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  console.log("FAQEditorPageLoader", params.id);
  return true;
};

export const AnswersLoader: LoaderFunction = async () => {
  return queryFunctions.getAnswers();
};

export const SnippetsLoader: LoaderFunction = async () => {
  return queryFunctions.getSnippets();
};

export const PostPageLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Error("Post ID is required");
  }
  return queryFunctions.getSnippet(params.id);
};

export const ContentPageLoader: LoaderFunction = async () => {
  try {
    await queryFunctions.getMe();
    return true;
  } catch (error) {
    if (isFetchError(error) && error.status === 401) {
      return redirect("/login");
    }
    throw error;
  }
};

export const AuthPageLoader: LoaderFunction = async () => {
  try {
    await queryFunctions.getMe();
    return redirect("/");
  } catch (error) {
    if (isFetchError(error) && error.status === 401) {
      return true;
    }
    throw error;
  }
};
