import type { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { queryFunctions } from "../api/helpers/query-functions";

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
