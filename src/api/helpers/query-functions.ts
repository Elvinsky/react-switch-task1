import { createFetchRequest } from "./create-fetch-request";

export const queryFunctions = {
  getAnswers: async () => await createFetchRequest("api/answers"),
};
