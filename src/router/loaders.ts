import type { LoaderFunction, LoaderFunctionArgs } from "react-router";

export const FAQPageLoader: LoaderFunction = async () => {
  console.log("FAQPageLoader");
  return true;
};

export const FAQEditorPageLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  console.log("FAQEditorPageLoader", params.id);
  return true;
};
