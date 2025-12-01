import type { RouteObject } from "react-router";
import AuthorizationPagesLayout from "../layouts/AuthorizationPagesLayout.tsx";
import ContentPagesLayout from "../layouts/ContentPagesLayout.tsx";
import Login from "../pages/Authorization/Login.tsx";
import Register from "../pages/Authorization/Register.tsx";
import Account from "../pages/Content/Account.tsx";
import FAQ from "../pages/Content/FAQ.tsx";
import FAQCreation from "../pages/Content/FAQCreation.tsx";
import FAQEditor from "../pages/Content/FAQEditor.tsx";
import Home from "../pages/Content/Home.tsx";
import MyPosts from "../pages/Content/MyPosts.tsx";
import Post from "../pages/Content/Post.tsx";
import PostCreation from "../pages/Content/PostCreation.tsx";
import PostEditor from "../pages/Content/PostEditor.tsx";
import User from "../pages/Content/User.tsx";
import Users from "../pages/Content/Users.tsx";
import { FAQEditorPageLoader, FAQPageLoader } from "./loaders.ts";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ContentPagesLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "faq",
        element: <FAQ />,
        loader: FAQPageLoader,
      },
      {
        path: "faq/create",
        element: <FAQCreation />,
      },
      {
        path: "faq/edit/:id",
        element: <FAQEditor />,
        loader: FAQEditorPageLoader,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "posts",
        element: <MyPosts />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
      {
        path: "post/create",
        element: <PostCreation />,
      },
      {
        path: "post/edit/:id",
        element: <PostEditor />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "user/:id",
        element: <User />,
      },
    ],
  },
  {
    element: <AuthorizationPagesLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
