// 路由定义 + 权限控制
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import AuthLayout from "../layouts/components/AuthLayout";
import MainLayout from "../layouts/components/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Profile from "../pages/Auth/Profile";
import Home from "../pages/Home";
import ImageGenerator from "../generate/ImageGenerator";
import History from "../pages/History";
// 导入 D 同学的页面
import TemplatesPage from "../pages/Templates";
import TemplateDetail from "../pages/Templates/Detail";
import MembershipPage from "../pages/Membership";

// 路由守卫组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "generate", element: <ImageGenerator /> },
      { path: "history", element: <History /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "templates/:id", element: <TemplateDetail /> },
      {
        path: "membership",
        element: (
          <ProtectedRoute>
            <MembershipPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
