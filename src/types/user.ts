// 先定义用户相关的所有TypeScript类型
export interface IUserInfo {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  membership?: "basic" | "premium" | "ultimate"; // 新增：会员等级，可选
  createdAt: string;
}

// 其他接口保持不变
export interface ILoginParams {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IRegisterParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
