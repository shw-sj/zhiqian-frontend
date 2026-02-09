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
      // 已在 slice 中写入 error，这里无需额外处理
      console.error(err);
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
      <h2 style={{ marginBottom: 8 }}>欢迎回来</h2>
      <p style={{ marginBottom: 24, color: '#6b7280' }}>登录你的智创千面账号</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>邮箱</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              if (error) dispatch(clearError());
              setEmail(e.target.value);
            }}
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
            onChange={(e) => {
              if (error) dispatch(clearError());
              setPassword(e.target.value);
            }}
            required
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 14,
            color: '#6b7280',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            记住我
          </label>
          <Link to="/forgot-password">忘记密码？</Link>
        </div>

        {error && (
          <div style={{ color: '#b91c1c', fontSize: 14 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4,
            padding: '10px 0',
            borderRadius: 999,
            border: 'none',
            background: '#16a34a',
            color: '#fff',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>

      <p style={{ marginTop: 16, fontSize: 14, color: '#6b7280' }}>
        还没有账号？ <Link to="/register">去注册</Link>
      </p>
    </div>
  );
};

export default Login;