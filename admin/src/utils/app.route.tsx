import SignIn from "@/pages/Authentication/SignIn";
import CategoryList from "@/pages/Category";
import Dashboard from "@/pages/Dashboard";
import ExpenseList from "@/pages/Expense";

import NotFound from "@/pages/NotFound";


export const publicRoutes = [
  { path: "/auth/login", element: <SignIn /> },
  { path: "*", element: <NotFound /> },

];

export const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/expense", element: <ExpenseList /> },
  { path: "/category", element: <CategoryList /> },

];
