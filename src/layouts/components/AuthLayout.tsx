import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        padding: '32px 24px',
      }}
    >
      {/* 返回首页按钮 */}
      <button
        style={{
          position: 'fixed',
          top: 24,
          left: 24,
          padding: '8px 16px',
          borderRadius: 999,
          border: '1px solid rgba(0,0,0,0.08)',
          background: '#ffffff',
          fontSize: 13,
          color: '#333',
          boxShadow: '0 2px 6px rgba(15,23,42,0.06)',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        返回首页
      </button>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
