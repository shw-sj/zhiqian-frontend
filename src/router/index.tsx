// 路由定义 + 权限控制
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import AuthLayout from '../layouts/components/AuthLayout';
import MainLayout from '../layouts/components/MainLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Profile from '../pages/Auth/Profile';
import Home from '../pages/Home';
import GeneratePage from '../generate';
import HistoryPage from '../pages/History';

// 路由守卫组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'generate', element: <GeneratePage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'templates', element: <div>模板市场（D负责）</div> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      {
        path: 'profile',
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