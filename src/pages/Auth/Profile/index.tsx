import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { fetchProfile, updateProfile } from '../../../store/userSlice';
import type { IUserInfo } from '../../../types/user';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, loading, error } = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<IUserInfo>>({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchProfile());
    } else {
      setFormData({
        username: userInfo.username,
        email: userInfo.email,
      });
    }
  }, [dispatch, userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (err) {
      // 错误已在 Redux 中处理
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userInfo) {
      setFormData({
        username: userInfo.username,
        email: userInfo.email,
      });
    }
  };

  if (loading && !userInfo) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <div style={{ fontSize: 16, color: '#666' }}>加载中...</div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <div style={{ fontSize: 16, color: '#666' }}>暂无用户信息</div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '64px 48px',
        borderRadius: 32,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        background: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
        <div>
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
            个人中心
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: 15, lineHeight: 1.6 }}>
            管理你的账户信息和偏好设置
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: '12px 24px',
              background: '#1a1a1a',
              color: '#fff',
              border: 'none',
              borderRadius: 24,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#333';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}
          >
            编辑资料
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: '14px 18px',
            marginBottom: 32,
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

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                用户名
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                placeholder="请输入用户名"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 16,
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
                  marginBottom: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                邮箱
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="请输入邮箱"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 16,
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
                  marginBottom: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                角色
              </label>
              <div
                style={{
                  padding: '16px 20px',
                  color: '#666',
                  background: '#fafafa',
                  borderRadius: 16,
                  fontSize: 15,
                }}
              >
                {userInfo.role === 'admin' ? '管理员' : '普通用户'}
              </div>
              <div style={{ fontSize: 13, color: '#999', marginTop: 8 }}>
                角色不可修改
              </div>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                注册时间
              </label>
              <div
                style={{
                  padding: '16px 20px',
                  color: '#666',
                  background: '#fafafa',
                  borderRadius: 16,
                  fontSize: 15,
                }}
              >
                {new Date(userInfo.createdAt).toLocaleString()}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: loading ? '#ccc' : '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 16,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  boxShadow: loading ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#333';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#1a1a1a';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? '保存中...' : '保存更改'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: '#fff',
                  color: '#666',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 16,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#fafafa';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                取消
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              padding: '32px',
              background: '#fafafa',
              borderRadius: 20,
              border: '1px solid rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ fontSize: 13, color: '#666', marginBottom: 10, fontWeight: 500 }}>
              用户名
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>
              {userInfo.username}
            </div>
          </div>
          <div
            style={{
              padding: '32px',
              background: '#fafafa',
              borderRadius: 20,
              border: '1px solid rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ fontSize: 13, color: '#666', marginBottom: 10, fontWeight: 500 }}>
              邮箱
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>
              {userInfo.email}
            </div>
          </div>
          <div
            style={{
              padding: '32px',
              background: '#fafafa',
              borderRadius: 20,
              border: '1px solid rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ fontSize: 13, color: '#666', marginBottom: 10, fontWeight: 500 }}>
              角色
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>
              {userInfo.role === 'admin' ? '管理员' : '普通用户'}
            </div>
          </div>
          <div
            style={{
              padding: '32px',
              background: '#fafafa',
              borderRadius: 20,
              border: '1px solid rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ fontSize: 13, color: '#666', marginBottom: 10, fontWeight: 500 }}>
              注册时间
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>
              {new Date(userInfo.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
