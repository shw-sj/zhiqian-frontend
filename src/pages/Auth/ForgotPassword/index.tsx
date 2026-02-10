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
      // 模拟发送延迟
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
          找回密码
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 15 }}>
          输入注册时使用的邮箱，我们会发送重置链接
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
              setError(null);
              setSuccess(null);
              setEmail(e.target.value);
            }}
            required
            placeholder="请输入注册邮箱"
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
            background: loading ? '#9ca3af' : '#6366f1',
            color: '#fff',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#4f46e5';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#6366f1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
            }
          }}
        >
          {loading ? '发送中...' : '发送重置链接'}
        </button>
      </form>

      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
        想起密码了？{' '}
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
          返回登录
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
