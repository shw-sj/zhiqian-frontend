import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../../../api/user';

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
      await userApi.forgotPassword(email);
      setSuccess('重置链接已发送到你的邮箱，如未收到请检查垃圾箱');
    } catch (err: any) {
      setError(err.response?.data?.message || '发送失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: 380,
        padding: 32,
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
        background: '#fff',
      }}
    >
      <h2 style={{ marginBottom: 8 }}>找回密码</h2>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>输入注册时使用的邮箱，我们会发送重置链接</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>邮箱</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        {error && <div style={{ color: '#b91c1c', fontSize: 14 }}>{error}</div>}
        {success && <div style={{ color: '#15803d', fontSize: 14 }}>{success}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4,
            padding: '10px 0',
            borderRadius: 999,
            border: 'none',
            background: '#6366f1',
            color: '#fff',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '发送中...' : '发送重置链接'}
        </button>
      </form>

      <p style={{ marginTop: 16, fontSize: 14, color: '#6b7280' }}>
        想起密码了？ <Link to="/login">返回登录</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;