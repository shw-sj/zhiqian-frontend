export interface Plan {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

export const mockPlans: Plan[] = [
  {
    id: "basic",
    name: "基础版",
    price: 0,
    credits: 10,
    features: ["每月10次生成", "基础风格", "社区支持"],
  },
  {
    id: "pro",
    name: "专业版",
    price: 29,
    credits: 100,
    features: ["每月100次生成", "所有风格", "高清输出", "优先生成"],
    popular: true,
  },
  {
    id: "ultimate",
    name: "旗舰版",
    price: 49,
    credits: 300,
    features: ["每月300次生成", "所有风格", "4K输出", "VIP支持", "商业授权"],
  },
];
