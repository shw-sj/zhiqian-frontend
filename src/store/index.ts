// 简化版 store 配置
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// 类型导出
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;