import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少为6位');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_username', username);
      
      setSuccess('注册成功！正在跳转...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
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
          创建账号
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: 15, lineHeight: 1.6 }}>
          加入智创千面，开始你的创作之旅
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
            用户名
          </label>
          <input
            value={username}
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value);
            }}
            required
            placeholder="请输入用户名"
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
            邮箱
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setError(null);
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
              setError(null);
              setPassword(e.target.value);
            }}
            required
            placeholder="至少6位字符"
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
            确认密码
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setError(null);
              setConfirmPassword(e.target.value);
            }}
            required
            placeholder="请再次输入密码"
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
        
        {success && (
          <div
            style={{
              padding: '14px 18px',
              background: '#f0fdf4',
              color: '#16a34a',
              borderRadius: 16,
              fontSize: 14,
              border: '1px solid rgba(22, 163, 74, 0.1)',
            }}
          >
            {success}
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
          {loading ? '注册中...' : '注册'}
        </button>
      </form>

      <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: '#666' }}>
        已有账号？{' '}
        <Link
          to="/login"
          style={{
            color: '#1a1a1a',
            fontWeight: 600,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#333')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#1a1a1a')}
        >
          立即登录
        </Link>
      </div>
    </div>
  );
};

export default Register;
