import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { fetchProfile } from '../../../store/userSlice';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchProfile());
    }
  }, [dispatch, userInfo]);

  if (loading && !userInfo) {
    return <div>加载中...</div>;
  }

  if (!userInfo) {
    return <div>暂无用户信息</div>;
  }

  return (
    <div
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: 24,
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        background: '#fff',
      }}
    >
      <h2 style={{ marginBottom: 16 }}>个人中心</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <strong>用户名：</strong>
          {userInfo.username}
        </div>
        <div>
          <strong>邮箱：</strong>
          {userInfo.email}
        </div>
        <div>
          <strong>角色：</strong>
          {userInfo.role === 'admin' ? '管理员' : '普通用户'}
        </div>
        <div>
          <strong>注册时间：</strong>
          {new Date(userInfo.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Profile;