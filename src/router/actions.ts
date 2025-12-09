import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { isFetchError, queryFunctions } from "../api/query-functions";
import { useAuth } from "../stores/useAuth";

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;

  if (!login || !password) {
    return { error: "Login and password are required" };
  }

  const authStore = useAuth.getState() as {
    login: (login: string, password: string) => Promise<void>;
  };
  try {
    await authStore.login(login, password);
    return redirect("/");
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Login failed" };
  }
}

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;

  if (!login || !password || !repeatPassword) {
    return { error: "All fields are required" };
  }

  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }

  const authStore = useAuth.getState() as {
    register: (login: string, password: string) => Promise<void>;
  };
  try {
    await authStore.register(login, password);
    return redirect("/login");
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Registration failed" };
  }
}

export async function accountAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "changeUsername") {
    const username = formData.get("username") as string;

    if (!username) {
      return { error: "Username is required", intent: "changeUsername" };
    }

    try {
      await queryFunctions.changeMyUsername(username);
      return { success: true, intent: "changeUsername" };
    } catch (error: unknown) {
      if (isFetchError(error) && error.status === 401) {
        return redirect("/login");
      }
      return {
        error: error instanceof Error ? error.message : "Failed to change username",
        intent: "changeUsername",
      };
    }
  }

  if (intent === "changePassword") {
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!newPassword || !confirmPassword) {
      return { error: "Both password fields are required", intent: "changePassword" };
    }

    if (newPassword !== confirmPassword) {
      return { error: "Passwords do not match", intent: "changePassword" };
    }

    try {
      // Note: The API might require oldPassword, but based on user's description,
      // we're only sending newPassword. Adjust if needed.
      await queryFunctions.changePassword("", newPassword);
      return { success: true, intent: "changePassword" };
    } catch (error: unknown) {
      if (isFetchError(error) && error.status === 401) {
        return redirect("/login");
      }
      return {
        error: error instanceof Error ? error.message : "Failed to change password",
        intent: "changePassword",
      };
    }
  }

  return { error: "Invalid action", intent: "" };
}
