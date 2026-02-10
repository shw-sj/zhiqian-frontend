import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
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
      <Outlet />
    </div>
  );
};

export default AuthLayout;
