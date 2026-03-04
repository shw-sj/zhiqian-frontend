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
      console.error(err);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 440,
        padding: '64px 48px',
        borderRadius: 32,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}
        >
          欢迎回来
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: 15, lineHeight: 1.6 }}>
          登录你的智创千面账号
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 10,
              fontSize: 14,
              fontWeight: 500,
              color: '#1a1a1a',
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
              padding: '16px 20px',
              borderRadius: 16,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: 15,
              transition: 'all 0.2s ease',
              outline: 'none',
              background: '#fafafa',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
              e.target.style.background = '#fff';
              e.target.style.boxShadow = '0 0 0 4px rgba(0, 0, 0, 0.04)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              e.target.style.background = '#fafafa';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 10,
              fontSize: 14,
              fontWeight: 500,
              color: '#1a1a1a',
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
              padding: '16px 20px',
              borderRadius: 16,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: 15,
              transition: 'all 0.2s ease',
              outline: 'none',
              background: '#fafafa',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
              e.target.style.background = '#fff';
              e.target.style.boxShadow = '0 0 0 4px rgba(0, 0, 0, 0.04)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              e.target.style.background = '#fafafa';
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
              gap: 10,
              color: '#666',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ cursor: 'pointer', width: 16, height: 16 }}
            />
            记住我
          </label>
          <Link
            to="/forgot-password"
            style={{
              color: '#666',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
          >
            忘记密码？
          </Link>
        </div>

        {error && (
          <div
            style={{
              padding: '14px 18px',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: 16,
              fontSize: 14,
              border: '1px solid rgba(220, 38, 38, 0.1)',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            padding: '16px 0',
            borderRadius: 16,
            border: 'none',
            background: loading ? '#ccc' : '#1a1a1a',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: loading ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#333';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
          }}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>

      <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: '#666' }}>
        还没有账号？{' '}
        <Link
          to="/register"
          style={{
            color: '#1a1a1a',
            fontWeight: 600,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#333')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#1a1a1a')}
        >
          立即注册
        </Link>
      </div>
    </div>
  );
};

export default Login;
