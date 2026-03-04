import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('重置链接已发送到你的邮箱，如未收到请检查垃圾箱');
    } catch (err: any) {
      setError('发送失败，请稍后重试');
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
          找回密码
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: 15, lineHeight: 1.6 }}>
          输入注册时使用的邮箱，我们会发送重置链接
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
              setError(null);
              setSuccess(null);
              setEmail(e.target.value);
            }}
            required
            placeholder="请输入注册邮箱"
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
          {loading ? '发送中...' : '发送重置链接'}
        </button>
      </form>

      <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: '#666' }}>
        想起密码了？{' '}
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
          返回登录
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
