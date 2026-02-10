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
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 16, color: '#6b7280' }}>加载中...</div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 16, color: '#6b7280' }}>暂无用户信息</div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '40px 32px',
        borderRadius: 20,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        background: '#fff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
            个人中心
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: 15 }}>
            管理你的账户信息和偏好设置
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.2)';
            }}
          >
            编辑资料
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: 24,
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

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
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
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 10,
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
                  fontWeight: 600,
                  color: '#374151',
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
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: 10,
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
                  fontWeight: 600,
                  color: '#374151',
                }}
              >
                角色
              </label>
              <div
                style={{
                  padding: '12px 16px',
                  color: '#6b7280',
                  background: '#f3f4f6',
                  borderRadius: 10,
                  fontSize: 15,
                }}
              >
                {userInfo.role === 'admin' ? '管理员' : '普通用户'}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>
                角色不可修改
              </div>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                }}
              >
                注册时间
              </label>
              <div
                style={{
                  padding: '12px 16px',
                  color: '#6b7280',
                  background: '#f3f4f6',
                  borderRadius: 10,
                  fontSize: 15,
                }}
              >
                {new Date(userInfo.createdAt).toLocaleString()}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: loading ? '#9ca3af' : '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  boxShadow: loading ? 'none' : '0 2px 8px rgba(59, 130, 246, 0.2)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#3b82f6';
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
                  padding: '12px 20px',
                  background: '#fff',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: 10,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#d1d5db';
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
              padding: '20px',
              background: '#f9fafb',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>
              用户名
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>
              {userInfo.username}
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>
              邮箱
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>
              {userInfo.email}
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>
              角色
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>
              {userInfo.role === 'admin' ? '管理员' : '普通用户'}
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>
              注册时间
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>
              {new Date(userInfo.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
