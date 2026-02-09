import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/userSlice';

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      {/* 导航栏 */}
      <nav
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid #e5e7eb',
          background: '#f9fafb',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 18 }}>智创千面</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to="/generate">生成</Link>
          <Link to="/history">历史</Link>
          <Link to="/templates">模板市场</Link>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <span>你好，{userInfo?.username || userInfo?.email}</span>
              <button onClick={handleLogout}>退出登录</button>
              <button onClick={() => navigate('/profile')}>个人中心</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>登录</button>
              <button onClick={() => navigate('/register')}>注册</button>
            </>
          )}
        </div>
      </nav>
      {/* 页面内容 */}
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;