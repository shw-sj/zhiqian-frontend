import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../store';
import { login, clearError } from '../../../store/userSlice';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password, remember })).unwrap();
      navigate('/');
    } catch (err) {
      // 已在 slice 中写入 error
      console.error(err);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        padding: '40px 32px',
        borderRadius: 20,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        background: '#fff',
        border: '1px solid #e5e7eb',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
          欢迎回来
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 15 }}>
          登录你的智创千面账号
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 500,
              color: '#374151',
            }}
          >
            邮箱
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              if (error) dispatch(clearError());
              setEmail(e.target.value);
            }}
            required
            placeholder="请输入邮箱"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid #d1d5db',
              fontSize: 15,
              transition: 'all 0.2s',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 500,
              color: '#374151',
            }}
          >
            密码
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              if (error) dispatch(clearError());
              setPassword(e.target.value);
            }}
            required
            placeholder="请输入密码"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid #d1d5db',
              fontSize: 15,
              transition: 'all 0.2s',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 14,
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#6b7280',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            记住我
          </label>
          <Link
            to="/forgot-password"
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#3b82f6')}
          >
            忘记密码？
          </Link>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: 10,
              fontSize: 14,
              border: '1px solid #fecaca',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4,
            padding: '14px 0',
            borderRadius: 10,
            border: 'none',
            background: loading ? '#9ca3af' : '#3b82f6',
            color: '#fff',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }
          }}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>

      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
        还没有账号？{' '}
        <Link
          to="/register"
          style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#3b82f6')}
        >
          立即注册
        </Link>
      </div>
    </div>
  );
};

export default Login;
