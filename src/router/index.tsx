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
      // 其他页面由B/C/D负责，先占位
      { path: "generate", element: <div>生成页（B负责）</div> },
      { path: "history", element: <div>历史页（C负责）</div> },
      { path: "templates", element: <TemplatesPage /> }, // 模板市场
      { path: "templates/:id", element: <TemplateDetail /> }, // 详情页
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
