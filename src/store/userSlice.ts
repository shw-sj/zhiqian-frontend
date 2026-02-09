import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../api/user';
import type { IUserInfo } from '../types/user';

// 异步thunk - 登录
export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    const response = await userApi.login(params);
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  }
);

// 异步thunk - 获取用户信息
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    const response = await userApi.getProfile();
    return response.data;
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
      });
  },
});

// 导出actions
export const { logout, clearError } = userSlice.actions;

// 导出reducer（默认导出，供store使用）
export default userSlice.reducer;