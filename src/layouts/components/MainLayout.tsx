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
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* 导航栏 */}
      <nav
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 20,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
          }}
        >
          智创千面
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link
            to="/generate"
            style={{
              color: '#666',
              fontSize: 15,
              fontWeight: 500,
              padding: '8px 0',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
          >
            生成
          </Link>
          <Link
            to="/history"
            style={{
              color: '#666',
              fontSize: 15,
              fontWeight: 500,
              padding: '8px 0',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
          >
            历史
          </Link>
          <Link
            to="/templates"
            style={{
              color: '#666',
              fontSize: 15,
              fontWeight: 500,
              padding: '8px 0',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
          >
            模板市场
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <span style={{ color: '#666', fontSize: 14 }}>
                你好，{userInfo?.username || userInfo?.email}
              </span>
              <button
                onClick={() => navigate('/profile')}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#666',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.color = '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#666';
                }}
              >
                个人中心
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  background: '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#333';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                退出登录
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#666',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.color = '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#666';
                }}
              >
                登录
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '10px 20px',
                  background: '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#333';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                注册
              </button>
            </>
          )}
        </div>
      </nav>
      {/* 页面内容 */}
      <main style={{ padding: '64px 48px', maxWidth: 1400, margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
