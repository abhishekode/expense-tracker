import SignIn from "@/pages/Authentication/SignIn";
import BlogList from "@/pages/Blogs";
import CreateNewBlog from "@/pages/Blogs/component/Create";
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
  { path: "/blogs", element: <BlogList /> },
  { path: "/blogs/:slug", element: <CreateNewBlog /> },

];
