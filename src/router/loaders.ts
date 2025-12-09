import type { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { isFetchError, queryFunctions } from "../api/query-functions";
import type {
  MeResponse,
  UserResponse,
  UserStatsResponse,
  UsersResponse,
} from "../types/api/api.types";
import type { UserStatistics } from "../types/auth/auth.types";
import type { User } from "../types/snippets.types";

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

interface AccountPageLoaderData {
  user: MeResponse["data"];
  statistics: UserStatistics;
}

export const AccountPageLoader: LoaderFunction = async (): Promise<
  AccountPageLoaderData | Response
> => {
  try {
    const me: MeResponse = await queryFunctions.getMe();
    const stats: UserStatsResponse = await queryFunctions.getUserStats(me.data.id);
    return {
      user: me.data,
      statistics: stats.data.statistic,
    };
  } catch (error) {
    if (isFetchError(error) && error.status === 401) {
      return redirect("/login");
    }
    throw error;
  }
};

export const UsersPageLoader: LoaderFunction = async (): Promise<UsersResponse | Response> => {
  try {
    const users: UsersResponse = await queryFunctions.getUsers();
    return users;
  } catch (error) {
    if (isFetchError(error) && error.status === 401) {
      return redirect("/login");
    }
    throw error;
  }
};

interface UserPageLoaderData {
  user: User;
  statistics: UserStatistics;
}

export const UserPageLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs): Promise<UserPageLoaderData | Response> => {
  try {
    if (!params.id) {
      throw new Error("User ID is required");
    }
    const user: UserResponse = await queryFunctions.getUser(params.id);
    const stats: UserStatsResponse = await queryFunctions.getUserStats(params.id);
    return {
      user: user.data,
      statistics: stats.data.statistic,
    };
  } catch (error) {
    if (isFetchError(error) && error.status === 401) {
      return redirect("/login");
    }
    throw error;
  }
};
