import request from './index';
import type { IUserInfo, ILoginParams, IRegisterParams, IApiResponse } from '../types/user';

export const userApi = {
  // 注意：request 已经返回 IApiResponse，所以这里直接指定返回类型即可
  login: (params: ILoginParams) => 
    request.post<any, IApiResponse<{ token: string; user: IUserInfo }>>('/auth/login', params),
  
  register: (params: IRegisterParams) => 
    request.post<any, IApiResponse<{ token: string; user: IUserInfo }>>('/auth/register', params),
  
  forgotPassword: (email: string) => 
    request.post<any, IApiResponse<void>>('/auth/forgot-password', { email }),
  
  getProfile: () => 
    request.get<any, IApiResponse<IUserInfo>>('/user/profile'),
  
  updateProfile: (data: Partial<IUserInfo>) => 
    request.put<any, IApiResponse<IUserInfo>>('/user/profile', data),
};