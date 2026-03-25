import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUserInfo } from '../types/user';

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 生成假token
const generateFakeToken = () => `fake_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// 创建假用户信息
const createFakeUser = (email: string, username?: string): IUserInfo => {
  return {
    id: `user_${Date.now()}`,
    username: username || email.split('@')[0],
    email,
    role: 'user',
    createdAt: new Date().toISOString(),
  };
};

// 异步thunk - 登录（假登录）
export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string; remember?: boolean }) => {
    // 模拟网络延迟
    await delay(800);
    
    // 假登录：只要邮箱和密码不为空就成功
    if (!params.email || !params.password) {
      throw new Error('邮箱和密码不能为空');
    }
    
    const token = generateFakeToken();
    localStorage.setItem('token', token);
    localStorage.setItem('user_email', params.email);
    
    // 尝试从localStorage获取之前保存的用户名
    const savedUsername = localStorage.getItem('user_username');
    const user = createFakeUser(params.email, savedUsername || undefined);
    
    return user;
  }
);

// 异步thunk - 获取用户信息（假数据）
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    await delay(500);
    
    // 从localStorage获取token，如果有就返回假用户信息
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('未登录');
    }
    
    // 尝试从localStorage获取之前保存的邮箱和用户名
    const savedEmail = localStorage.getItem('user_email') || 'user@example.com';
    const savedUsername = localStorage.getItem('user_username');
    return createFakeUser(savedEmail, savedUsername || undefined);
  }
);

// 异步thunk - 更新用户信息（假更新）
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<IUserInfo>) => {
    await delay(600);
    
    // 假更新：直接返回更新后的数据
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('未登录');
    }
    
    const savedEmail = localStorage.getItem('user_email') || 'user@example.com';
    const currentUser = createFakeUser(savedEmail, data.username);
    
    // 更新邮箱和用户名到localStorage
    if (data.email) {
      localStorage.setItem('user_email', data.email);
      currentUser.email = data.email;
    }
    if (data.username) {
      localStorage.setItem('user_username', data.username);
      currentUser.username = data.username;
    }
    
    return { ...currentUser, ...data };
  }
);

// 定义state类型
interface UserState {
  userInfo: IUserInfo | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 退出登录
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
    // 清除错误信息
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 登录请求中
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 登录成功
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isLoggedIn = true;
      })
      // 登录失败
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '登录失败';
      })
      // 获取用户信息成功
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
      })
      // 更新用户信息请求中
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 更新用户信息成功
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      // 更新用户信息失败
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '更新失败';
      });
  },
});

// 导出actions
export const { logout, clearError } = userSlice.actions;

// 导出reducer（默认导出，供store使用）
export default userSlice.reducer;