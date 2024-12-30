import AuthLayout from "@/layouts/AuthLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter, Navigate } from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true, 
        element: <Navigate to="login" />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
    ],
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

export default router;