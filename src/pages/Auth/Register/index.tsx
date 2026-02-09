import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../../../api/user';

const Register = () => {
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

    try {
      setLoading(true);
      await userApi.register({ username, email, password, confirmPassword });
      setSuccess('注册成功，请返回登录');
    } catch (err: any) {
      setError(err.response?.data?.message || '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: 420,
        padding: 32,
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
        background: '#fff',
      }}
    >
      <h2 style={{ marginBottom: 8 }}>创建账号</h2>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>加入智创千面，开始你的创作</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
            }}
          />
        </div>

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

        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>确认密码</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            background: '#0ea5e9',
            color: '#fff',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '注册中...' : '注册'}
        </button>
      </form>

      <p style={{ marginTop: 16, fontSize: 14, color: '#6b7280' }}>
        已有账号？ <Link to="/login">去登录</Link>
      </p>
    </div>
  );
};

export default Register;