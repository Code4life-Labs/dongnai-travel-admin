import React from "react";
import { Outlet, useRoutes, Navigate } from "react-router-dom";

// Import components
import Signin from "src/pages/auth/components/sign-in";
import Signup from "src/pages/auth/components/sign-up";

// Import hooks
import { useAuth } from "src/hooks/use-auth";

// Import layouts
import DashboardLayout from "src/layouts/dashboard";

// Import pages
import AuthPage from "src/pages/auth";
import PlacesPage from "src/pages/places";
import BlogsPage from "src/pages/blogs";
import UsersPage from "src/pages/users";

// Import utils
import { CookieUtils } from "src/utils/cookies";

// Import types
import type { RouteObject } from "react-router-dom";

export const AuthenticatedRoutesMetadata = new Map([
  ["/", "Task Manager"],
  ["/places", "Places"],
  ["/users", "Users"],
  ["/blogs", "Blogs"],
  ["/banners", "Banners"],
  ["/reports", "Reports"],
]);

const unAuthenticatedRoutes: Array<RouteObject> = [
  {
    path: "/",
    element: <AuthPage />,
    children: [
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/",
        element: <Navigate to="/sign-in" replace />,
      },
    ],
  },
];

const authenticatedRoutes: Array<RouteObject> = [
  {
    path: "/",
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        path: "/blogs",
        element: <BlogsPage />,
      },
      {
        path: "/places",
        element: <PlacesPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/banners",
        element: <div className="w-full flex-1">Banners Page</div>,
      },
      {
        path: "/reports",
        element: <div className="w-full flex-1">Reports Page</div>,
      },
      {
        path: "/",
        element: <Navigate to="/places" replace />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/sign-up",
    element: <Navigate to="/" replace />,
  },
];

export default function RootRoutes() {
  const { isAuthenticated, signin } = useAuth();

  React.useEffect(() => {
    const token = CookieUtils.readCookie(CookieUtils.TOKEN_NAME + "tkn");
    if (token) {
      signin();
    }
  }, []);

  if (import.meta.env.VITE_MODE === "dev")
    return useRoutes(authenticatedRoutes);

  return isAuthenticated
    ? useRoutes(authenticatedRoutes)
    : useRoutes(unAuthenticatedRoutes);
}
