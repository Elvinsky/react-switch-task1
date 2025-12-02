import { useState } from "react";
import { Link, useSubmit } from "react-router";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const submit = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);
    submit(formData, { method: "post" });
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center font-semibold text-2xl">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login" className="mb-1 block font-medium text-gray-700 text-sm">
            Login
          </label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={handleChangeLogin}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block font-medium text-gray-700 text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:text-blue-700 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
