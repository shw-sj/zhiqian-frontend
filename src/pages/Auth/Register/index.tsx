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
      // 模拟注册延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 保存用户信息到localStorage
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_username', username);
      
      setSuccess('注册成功！正在跳转...');
      
      // 2秒后跳转到登录页
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
          创建账号
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 15 }}>
          加入智创千面，开始你的创作之旅
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
              setError(null);
              setPassword(e.target.value);
            }}
            required
            placeholder="至少6位字符"
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
        
        {success && (
          <div
            style={{
              padding: '12px 16px',
              background: '#f0fdf4',
              color: '#16a34a',
              borderRadius: 10,
              fontSize: 14,
              border: '1px solid #bbf7d0',
            }}
          >
            {success}
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
            background: loading ? '#9ca3af' : '#10b981',
            color: '#fff',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#059669';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#10b981';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }
          }}
        >
          {loading ? '注册中...' : '注册'}
        </button>
      </form>

      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
        已有账号？{' '}
        <Link
          to="/login"
          style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#3b82f6')}
        >
          立即登录
        </Link>
      </div>
    </div>
  );
};

export default Register;
