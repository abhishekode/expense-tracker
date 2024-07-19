import SignIn from "@/pages/Authentication/SignIn";
import Dashboard from "@/pages/Dashboard";

import NotFound from "@/pages/NotFound";


export const publicRoutes = [
  { path: "/auth/login", element: <SignIn /> },
  { path: "*", element: <NotFound /> },

];

export const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },

];
