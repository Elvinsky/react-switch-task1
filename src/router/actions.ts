import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
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
